module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/step-definitions/*.ts',
      'src/support/*.ts'
    ],
    format: ['progress']
  }
};