const exec = require('child_process').exec;
const { config } = require("../config");
const { startLoading, endLoading } = require("./loading");
const { blue, green, cyan, bgGreen, bgWhite } = require('./log');
/**
 * 安装依赖并启动项目
 */
exports.start = async (path, options) => {
  console.log(await bgWhite('\n>> 开始安装项目依赖\n'));
  await installLib(path, options);
  console.log(await bgGreen('\n>> 项目依赖安装完毕\n'));
  endLoading()
  console.log(await bgWhite('\n>> 开始执行项目启动脚本\n'));
  await startProject(path, options)
};

const installLib = (path, options) => {
  const installCommand = options.install || "npm i"; //安装依赖的命令
  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      installCommand,
      {
        cwd: path,
      },
      (err) => {
        endLoading()
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
  });
};

const startProject = (path, options) => {
  const bootstrapCommand = options.bootstrap || "npm run start"; //启动项目的命令
  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      bootstrapCommand,
      {
        cwd: path,
      },
      (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
    workerProcess.stderr.on('close', function (data) {
      console.log("close", data);
    });
    workerProcess.stderr.on('end', function (data) {
      console.log("end", data);
    });
  });
};

/**
 * 打开浏览器
 */
const openBrowser = (url) => {
  return new Promise((resolve, reject) => {
    exec(`start ${url}`, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};