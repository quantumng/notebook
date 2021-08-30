# Monorepo代码管理实践

在版本控制系统中，monorepo是一种多个项目代码存储在同个仓库的软件开发策略。

其实这种工程实践已有二十多年历史，但Monorepo这个通识概念近几年才得以命名。

前端开发中，应用这种概念的典型案例：[babel](https://github.com/babel/babel)、[vue](https://github.com/vuejs/vue)、[element-plus](https://github.com/element-plus/element-plus)等等；



## monorepo的好处与缺点

好处：

代码重用：相同功能可以共享库，或者关联功能直接在项目中引入关联，可不通过依赖包管理器。

简化包管理：多仓库环境多个项目需要重复下载多次第三方依赖，单仓库所有的依赖都在同一个项目中管理。

（原子提交：Atomic commits -- all or nothing）解决依赖地狱：当一个项目同时作业于多个仓库时，一个工程发版需要同步版本给其他工程。在大项目中，管理适配版本可能造成依赖地狱。在monorepo中这个问题能够杜绝，你可以原子性地改动多个项目。

方便代码重构：由于开发人员可以访问整个项目，重构者可以确保项目的每个部分在重构后继续运行。

跨团队合作：在monorepo中，使用源依赖（从源编译的依赖），团队可以提升其他人作业的项目，这使用得编码所有权更灵活。



缺点：

版本缺失：一些 monorepo 构建时使用同一个版本号，导致每个项目失去实际意义上的版本控制。

项目权限控制：分仓库管理时可以根据需要，授予对应代码仓库的访问权限。monorepo 允许对项目中的所有代码进行读取访问，这可能会带来新的安全问题。（不过在某些版本控制系统中，此限制不是问题。例如，当使用Subversion时，可以下载代码仓库的任何部分（甚至是单个目录），并且可以使用基于路径的授权来限制对代码仓库某些部分的访问）；

占用更多存储：分仓库管理时，默认情况下你只获取检出你需要的项目，使用 monorepo则会默认检出所有项目。这会占用大量的存储空间。虽然所有版本控制系统都有一个机制来进行部分检出，这样做会破坏 monorepo 的一些优点。



## 管理工具简介

多包单仓库管理，大厂们有很多成熟的方案，Google 的 [Bazel](https://bazel.build/), Facebook 的 [Buck](https://buck.build/) 和 Twitter 的 [Pants](https://www.pantsbuild.org/)，但它们并不是专门为支持JS打包而且产生的。前端业界有自己的一套成熟方案，Lerna，一个管理多包的JavaScript项目的工具。

Lerna官网：https://lerna.js.org/



## 管理工具应用

初始化工程

```shell
# 安装lerna
npm install --global lerna

# 初始化仓库
git init lerna-repo && cd lerna-repo

# 初始化工程（默认固定模式）
lerna init

# 初始化工程（独立模式，单独发版）
lerna init --independent
```



添加项目和依赖

```shell
# 添加项目
lerna create pkg-1
lerna create pkg-2

# 添加依赖
lerna add rollup --dev

# 为某个项目添加依赖
lerna add lodash --scope=pkg-1

# 把某个项目添加为另一个项目的依赖
lerna add pkg-1 --scope=pkg-2

# 安装所有依赖
lerna bootstrap
```



构建和发布

```shell
# 构建项目(需要项目里有同样的命令)
lerna run xxx

# 生成版本(需要先commit代码，命令会生成tag)
lerna version

# 发布(会执行生成版本的命令)
lerna publish
```



Node_modules安装在根目录下

`lerna.json`

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

`package.json`

```json
{
  "private": true,
  "devDependencies": {
    "lerna": "^2.2.0"
  },
  "workspaces": ["packages/*"]
}
```



## 参考文献

Wiki - Monorepo : https://en.wikipedia.org/wiki/Monorepo

Github - lerna: https://github.com/lerna/lerna
