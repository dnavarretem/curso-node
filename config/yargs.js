const { describe, alias } = require('yargs');

const argv = require('yargs')
              .options({
                'b': {
                  alias: 'base',
                  type: 'number',
                  demandOption: true,
                  describe: 'Es la base de la tabla de multiplicar'
                },
                'l': {
                  alias: 'list',
                  type: 'boolean',
                  default: false,
                  describe: 'Muestra la tabla en consola'
                },
                'h': {
                  alias: 'hasta',
                  type: 'number',
                  default: 10,
                  describe: 'Limite superior'
                }
              })
              .check( (argv, options) => {
                if (isNaN( argv.b )) {
                  throw 'La base tiene que ser un numero';
                }
                if (argv.h <= 0) {
                  throw 'El limite superior tiene que ser mayor que 0';
                }
                return true
              })
              .argv;

module.exports = argv;              