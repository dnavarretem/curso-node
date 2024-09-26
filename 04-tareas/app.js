require('colors');
const {
  inquirerMenu,
  pausarMenu,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDb, leerDb } = require('./helpers/guardarArchivo')

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDb = leerDb();

  if (tareasDb) {
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    // Imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        console.log(ids);
        tareas.toggleCompletadas(ids)
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirmar('Esta seguro?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
        break;
    }


    guardarDb(tareas.listadoArr);

    if (opt !== '0') await pausarMenu();
  } while (opt !== '0');


};

main();