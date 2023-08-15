
exports.config = [
  {
    name: "vue3-H5",
    value: {
      gitUrl: "github:MingJiangLong/ubox-h5-template",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn",// 依赖下载命令
    }
  },
  {
    name: "vue3-PC",
    value: {
      gitUrl: "github:MingJiangLong/ubox-h5-template#vue3-pc",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn"// 依赖下载命令
    }
  },
]

exports.frameworkList = [
  {
    name: "vue3",
    value: {
      alias: 'vue',
      url: "MingJiangLong/ubox-h5-template",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn"// 依赖下载命令
    }
  },
  {
    name: "vue2",
    value: {
      alias: 'vue',
      url: "MingJiangLong/ubox-h5-template",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn"// 依赖下载命令
    }
  },
  {
    name: "react",
    value: {
      alias: 'react',
      url: "MingJiangLong/ubox-h5-template",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn"// 依赖下载命令
    }
  },
  {
    name: "angular",
    value: {
      alias: 'angular',
      url: "MingJiangLong/ubox-h5-template",// 模板所在位置
      bootstrap: "yarn dev",// 服务启动命令
      install: "yarn"// 依赖下载命令
    }
  },
]

exports.storeOptions = {
  'vue': [
    {
      name: 'pinia',
      value: {}
    },
    {
      name: 'vuex',
      value: {}
    },
  ],
  'react': [
    {
      name: 'redux'
    }
  ],
  'angular': [],
}
exports.buildUtilOptions = {
  'vue': [
    {
      name: 'webpack',
      value: {}
    },
    {
      name: 'vite',
      value: {}
    },
  ],
  'react': [
    {
      name: 'webpack'
    },
  ],
  'angular': [],
}
