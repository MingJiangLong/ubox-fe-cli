const downloadGitRepo = require('download-git-repo');

const { startLoading, endLoading } = require("./loading");
const fsExtra = require("fs-extra");
const { green, blue, cyan, bgGreen, bgWhite } = require('./log');
let count = 0; //计算下载次数
/**
 * 
 * @param {string} url 
 * @param {string} projectDir 
 */
exports.download = (url, projectDir) => {

  return new Promise(async (resolve, reject) => {
    await fsExtra.emptyDir(projectDir);
    console.log(await bgWhite('\n>> 开始安装模板\n'));
    (async function execute() {
      count++;
      if (count >= 5) {
        count = 0;
        return reject();
      }
      startLoading("下载模板中...\n");
      downloadGitRepo(`${url}`, projectDir, async function (err) {
        endLoading();
        if (err) {
          console.log("\n下载失败,3s后下载重试...\n");
          await sleep();
          execute();
        } else {
          console.log(await bgGreen('\n>> 模板安装完成\n'));
          resolve(null);
          count = 0;
        }
      })
    })();
  });
};

/**
 * 睡眠
 */
const sleep = (time = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time)
  })
}