const Tarea = require('./tarea');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object
      .keys(this._listado)
      .forEach(key => listado.push(this._listado[key]))
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(t => this._listado[t.id] = t);
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((t, i) => {
      const idx = `${i + 1}.`.green;
      const { desc, completadoEn } = t;
      const estado = (completadoEn)
        ? `${t.completadoEn}`.green
        : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${estado}`);
    })
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    this.listadoArr
      .filter(t => (completadas) ? t.completadoEn !== null : t.completadoEn === null)
      .forEach((t, i) => {
        const idx = `${i + 1}.`.green;
        const { desc, completadoEn } = t;
        const estado = (completadoEn)
          ? `${t.completadoEn}`.green
          : 'Pendiente'.red;
        console.log(`${idx} ${desc} :: ${estado}`);
      })
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    this.listadoArr.map(t => {
      t.completadoEn = ids.includes(t.id) ? new Date().toISOString() : null;
      return t;
    });
  }
}

module.exports = Tareas;