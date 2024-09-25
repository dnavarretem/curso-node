const colors = require('colors');
const fs = require('fs');

const crearArchivo = async (base = 5, hasta, list) => {
  try {
    let salida = '', consola = '';

    for (let i = 1; i <= hasta; i++) {
      salida += `${base} x ${i} = ${base * i}\n`
      consola += `${base} ${'x'.green} ${i} ${'='.green} ${base * i}\n`
    }

    if (list) {
      console.log('============'.green);
      console.log('Tabla del'.green, colors.blue(base));
      console.log('============'.green);

      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

    return `table-${base}.txt`;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  crearArchivo
};