const { leerInput, inquirerMenu, pausarMenu, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('dotenv').config();

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const lugar = await leerInput('Ciudad: ');

        const lugares = await busquedas.ciudad(lugar);
        
        const id = await listarLugares(lugares);

        if (id === '0') continue;
        
        const lugarSel = lugares.find(l => l.id === id);

        // Guardar en db
        busquedas.agregarHistorial(lugarSel.nombre);

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        // console.clear();
        console.log('climaaa', clima)

        console.log('\nInformación de la ciudad\n');
        console.log('Ciudad:', lugarSel.nombre.green);
        console.log('Lat:', lugarSel.lat);
        console.log('Lng:', lugarSel.lng);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('Descripcion:', clima.desc.green)
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((l, i) => {
          const idx = `${i+1}.`.green;
          console.log(`${idx} ${l}`);
        });
        break;
      case 0:
        break;
    }

    if (opt !== 0) await pausarMenu();
  } while (opt !== 0);
}

main();