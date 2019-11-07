# React16.8+Next.js+Koa2开发Github全栈项目

## 模块版本

```json
@aeit/next-css: ^1.0.1,
antd: ^3.13.6,
atob: ^2.1.2,
axios: ^.0.19.0,
babel-plugin-import: ^1.11.0,
cross-env: ^5.2.0,
debug: ^4.1.1,
http-proxy: ^1.17.0,
ioredis: ^4.6.2,
koa: ^2.7.0,
koa-router: ^7.4.0,
koa-session: ^5.10.1,
lru-cache: ^5.1.1,
markdown-it: ^8.4.2,
next:^8.0.3,
nprogress: ^0.2.0,
react:16.8.3,
react-dom: ^.16.8.3,
react-redux: ^6.0.1,
redux: ^4.0.1,
redux-devtools-extension: ^2.13.8,
redux-thunk: ^2.3.0
```

## 创建 nextjs 的项目

- 使用 create-next-app

## 使用 next 作为 koa 中间件

- nextjs 自带服务器，但只处理 ssr
- 服务器还需要处理 HTTP 请求，并根据请求数据返回相应的内容
- 根据域名之类的 HOST 来定位服务器
- nextjs 无法处理服务器数据接口、数据库连接、session 状态

根目录下创建 server.js 文件  

```js
const Koa = require('koa')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler() //  用来处理 http 请求的响应

app.prepare().then(() => {
  const server = new Koa()

  server.use(async () => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
```

## koa

### koa 特点

- 轻量：本身不封装什么功能

### API

- app.use
- ctx 对象
- request、response、req、res 的关系

## Redis

- 内存数据解构存储
- 可持久存储
- 支持多种数据结构

### windows 下安装

官方没有 windows 安装包，下载地址 <https://github.com/MicrosoftArchive/redis/releases>

### 手动启动 redis 服务

```shell
cd ./redis/
./redis-server.exe ./redis.windows.conf
```

### 查看 redis 服务是否启动成功

```shell
redis-cli
```

### redis 基础使用详解

数据库设置密码：打开 `redis.windows.conf` 文件，找到 **requirepass**，然后在这个 key 后面设置值（密码），然后在 redis-cli 连接数据库后使用 `auth <密码>` 登录数据库。  

**setex** 给某一个 key 设置过期时间  

`KEYs *` 查找所有 key  

`DEL <key>`  删除一个key

### Nodejs 连接 redis 数据库

- ioredis
- yarn add ioredis
  
## nextjs 集成 antd

### 问题

- nextjs 不支持 css import，它有自己的 css-in-js 方案。
  - nextjs 框架整体配置文件：next.config.js
  - yarn add @zeit/next-css
  - 在配置文件中写入代码
- 如何分模块加载组件
  - 在按需加载 antd 组件时，引入 antd css 文件采用全局一次性引入，原因是在 babelrc 文件配置单独引用时会产生 <https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250> 问题

3.1

## Hooks

- 让函数组件具有类组件的能力

### state - Hooks

- useState
- useReducer

### effect - Hooks

- useEffect
- useLayoutEffect
  
### Context - Hooks

- useContext

### Ref - Hooks

- useRef

### Hooks 渲染优化

- memo
- useMemo
- useCallback

### 闭包陷阱
