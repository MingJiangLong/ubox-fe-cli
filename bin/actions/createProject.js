
const inquirer = require('inquirer');
const path = require("path");
const { download } = require("../util/download");
const { updatePackage } = require("../util/updatePackageJson");
const { start } = require("../util/startProject");
const { config, frameworkList, storeOptions, buildUtilOptions } = require("../config");
const { red, cyan } = require('../util/log')
/**
 * 选择自定模板还是内置模板
 * @returns 
 */
async function selectInitType() {
  return await inquirer.prompt([{
    type: "list",
    message: "选择初始化方式",
    name: "initType",
    choices: [
      {
        name: "预置模板",
        value: 1
      },
      {
        name: "自定义",
        value: 2
      },
    ]
  }])
}

/**
 * 模板项目
 * @returns 
 */
async function initTemplateProject() {
  return await inquirer.prompt({
    type: "list",
    message: "请选择一个模板下载进行初始化:",
    name: "templateOptions",
    choices: config
  })
}

/**
 * 是否使用框架
 * @returns 
 */
async function askIsUseFramework() {
  const { isUseFramework } = await inquirer.prompt({
    type: "confirm",
    name: "isUseFramework",
    message: "是否使用前端框架",
    default: true
  })
  return isUseFramework;
}

/**
 * 选择框架
 * @returns 
 */
async function selectFramework() {
  return await inquirer.prompt({
    type: "list",
    message: "请选择前端框架",
    name: "framework",
    choices: frameworkList
  })
}

async function askIsUseStore() {
  const { isUseStore } = await inquirer.prompt({
    type: "confirm",
    name: "isUseStore",
    message: "是否使用全局状态管理",
    default: true
  })
  return isUseStore;
}

async function selectStore(framework) {
  return await inquirer.prompt({
    type: "list",
    message: "请选择状态管理工具",
    name: "storeUtil",
    choices: storeOptions[framework]
  })
}
async function selectBuildUtil(framework) {
  return await inquirer.prompt({
    type: "list",
    message: "请选择打包工具",
    name: "buildUtil",
    choices: buildUtilOptions[framework]
  })
}
/**
 * 自定义项目
 */
async function initCustomProject() {
  const isUseFramework = await askIsUseFramework();
  if (isUseFramework) {
    const { framework } = await selectFramework();
    const { buildUtil } = await selectBuildUtil(framework.alias)
    const isUseStore = await askIsUseStore()
    if (isUseStore) {
      const storeInfo = await selectStore(framework.alias);
    }
  }
}

const INIT_TYPE = {
  /**
   * 自定义
   */
  CUSTOM: 2,

  /**
   * 模板
   */
  TEMPLATE: 1
}

async function createTemplateProject(projectOptions) {
  const projectDir = path.join(process.cwd(), projectOptions.appName); //新键项目的路径
  try {
    await download(projectOptions.gitUrl, projectDir);
    await updatePackage(projectDir, { name: projectOptions.appName, });
    start(projectDir, projectOptions);// 启动项目    
  } catch (error) {
    console.log(error);
  }
}
/**
 * 创建项目
 * @param {string} appName 
 * @param {{template:string}} options 
 */
module.exports = async function createProject(appName, options) {

  if (options?.template) {
    const existTemplate = config.find(item => item.name == options.template);
    if (!existTemplate) return console.log(await red('错误:') + await cyan(`模板${options.template}不存在!\n`));
    let projectOptions = { appName };
    projectOptions = {
      ...projectOptions,
      ...existTemplate,
    }
    return await createTemplateProject(projectOptions)
  }

  let { initType } = await selectInitType()
  if (initType == INIT_TYPE.TEMPLATE) {
    let projectOptions = { appName };
    const { templateOptions } = await initTemplateProject()
    projectOptions = {
      ...projectOptions,
      ...templateOptions,
    };
    return await createTemplateProject(projectOptions)
  }

  if (initType == INIT_TYPE.CUSTOM) {
    return await initCustomProject()
  }
}

