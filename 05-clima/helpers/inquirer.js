const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2.'.green} Historial`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();
  console.log('==================='.green);
  console.log('Seleccione una opción'.white);
  console.log('===================\n'.green);

  const prompt = inquirer.createPromptModule();
  const { opcion } = await prompt(preguntas);
  return opcion;
}

const pausarMenu = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ]
  console.log('\n');
  const prompt = inquirer.createPromptModule();
  await prompt(question);
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Ingrese un valor';
        }
        return true;
      }
    }
  ]

  const prompt = inquirer.createPromptModule();
  const { desc } = await prompt(question);
  return desc;
}

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((l, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: l.id,
      name: `${idx} ${l.nombre}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar'
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar',
      choices: choices
    }
  ]
  const prompt = inquirer.createPromptModule();
  const { id } = await prompt(preguntas);
  
  return id;
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const prompt = inquirer.createPromptModule();
  const { ok } = await prompt(question);
  return ok;
}

const mostrarListadoChecklist = async (lugares = []) => {
  const choices = lugares.map((l, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: l.id,
      name: `${idx} ${l.desc}`,
      checked: (l.completadoEn) ? true : false
    }
  });

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices: choices
    }
  ]
  const prompt = inquirer.createPromptModule();
  const { ids } = await prompt(preguntas);

  return ids;
}

module.exports = {
  inquirerMenu,
  pausarMenu,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist
}

