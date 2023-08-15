exports.red = function (message) {

  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.red(message));
    });
  })
}
exports.cyan = function (message) {
  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.cyan(message));
    });
  })
}
exports.blue = function (message) {
  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.blue(message));
    });
  })
}
exports.green = function (message) {
  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.bgGreen(message));
    });
  })
}
exports.bgGreen = function (message) {
  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.bgGreen(message));
    });
  })
}
exports.bgWhite = function (message) {
  return new Promise((s) => {
    import('chalk').then(chalk => {
      s(chalk.default.bgCyan(message));
    });
  })
}