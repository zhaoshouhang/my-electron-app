# electron 练习项目

## 安装 electron

1. 开始按照官网的描述即可,之后安装 electron,可以直接使用[!淘宝镜像](https://npmmirror.com/),安装`cnpm`
2. 使用`cnpm install -D electron` 完成安装

## 启动

使用`npm start` 即可打开窗口

## 打包

1. 打包过程使用的 forge,这个进行安装的时候会使用 npm 安装,如果之前使用的 cnpm 那么大概率会失败
2. 采用的办法就是去掉淘宝的相关镜像, 开启 clash 全局代理和 TUN 服务,使用 npm 重新安装,最后按照说明会打出可以运行的包,打包时使用本地的网络即可,使用代理可能会挂

todo:
在 package.json 包全部拉取下来的时候,需要再测试下只用用 cnpm 是否可以直接 download 然后打包
