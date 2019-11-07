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