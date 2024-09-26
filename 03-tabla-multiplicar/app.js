const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');

require('colors');

console.clear();


// console.log(argv);
// console.log('base: yargs', argv.base);
const {base, hasta, list} = argv;

crearArchivo(base, hasta, list)
  .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
  .catch(err => console.log(err));


