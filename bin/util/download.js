const downloadGitRepo = require('download-git-repo');

const { startLoading, endLoading } = require("./loading");
const { config } = require("../config");
const fsExtra = require("fs-extra");

let count = 0; //计算下载次数

/**
 * 
 * @param {string} templateName 
 * @param {string} projectDir 
 */
exports.download = (templateName, projectDir) => {

  return new Promise(async (resolve, reject) => {

    const { url } = config[templateName]; // 模板的下载地址

    // 如果目录非空删除目录内容。如果目录不存在,就创建一个
    await fsExtra.emptyDir(projectDir);

    (function execute() {
      count++;
      if (count >= 5) {
        count = 0;
        reject();
        return;
      }
      startLoading(); //加载中
      downloadGitRepo(`${url}`, projectDir, async function (err) {
        endLoading(); // 关闭加载中
        if (err) {
          console.log(err);
          //出现下载错误,延时3秒重新下载3次
          console.log("\n下载失败,3s后下载重试...\n");
          await sleep();
          execute();
        } else {
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