
const inquirer = require('inquirer');
const path = require("path");
const { download } = require("../util/download");
const { updatePackage } = require("../util/updatePackageJson");
const { start } = require("../util/startProject");
const { config } = require("../config");
/**
 * 创建项目
 * @param {string} appName 
 * @param {{template:string}} options 
 */
module.exports = async function createProject(appName, options) {
  const prompList = [];
  if (!options.template) {
    prompList.push({
      type: "list",
      message: "请选择一个模板下载进行初始化:",
      name: "template_name",
      choices: Object.keys(config)
    })
  }
  const { template_name, description } = await inquirer.prompt(prompList);
  let templateName = template_name;
  if (options.template) {
    templateName = options.template;
  }
  const projectDir = path.join(process.cwd(), appName); //新键项目的路径
  try {
    await download(templateName, projectDir);
    await updatePackage(projectDir, { name: appName, description: `友宝H5项目:${appName}`, template: templateName });
    start(projectDir, templateName);// 启动项目    
  } catch (error) {
    console.log(error);
  }
}

