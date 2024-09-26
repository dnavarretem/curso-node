const fs = require('fs');
const axios = require('axios').default;

class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    // TODO: leer db si existe
    this.leerDb();
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  async ciudad(lugar = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
      });
      const resp = await instance.get();

      return resp.data.features.map(l => ({
        id: l.id,
        nombre: l.place_name,
        lng: l.center[0],
        lat: l.center[1]
      }))
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  get paramsWeather() {
    return {
      'appid': process.env.OPENWEAHTER_KEY,
      'lang': 'es',
      'units': 'metric'
    }
  }

  get historialCapitalizado() {
    return this.historial.map(l => {
      let palabras = l.split(' ');
      palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
      return palabras.join(' ');
    });
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'http://api.openweathermap.org/data/2.5/weather',
        params: { ...this.paramsWeather, lat, lon }
      });
      const resp = await instance.get();
      console.log('response', resp.data)
      const description = resp.data.weather[0].description;
      const { temp_min, temp_max, temp } = resp.data.main;
      return {
        desc: description,
        min: temp_min,
        max: temp_max,
        temp
      }
    } catch (err) {
      console.log(err);
    }
  }

  agregarHistorial(lugar = '') {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0,5);

    this.historial.unshift(lugar);
    this.guardarDb();
  }

  guardarDb() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDb() {
    // debe existir...
    if (!fs.existsSync(this.dbPath)) return null;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    
    this.historial = data.historial;
  }


}

module.exports = Busquedas