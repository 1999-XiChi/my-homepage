const Router = require("koa-router")
const combineRoutes = require("koa-combine-routers")
const message = require("./message")
const songList = require("./songList")

const router = new Router()
const start = router.get("/", ctx=>{
  ctx.body = "HELLO WORLD! HERA ARE THE APIS OF XICHI'S HOMEPAGE!"
})

module.exports = combineRoutes(
  start,
  message,
  songList
)