import Router from "koa-router"
import combineRoutes from "koa-combine-routers"
import message from "./message"
import songList from "./songList"

const router = new Router()
const start = router.get("/", ctx=>{
  ctx.body = "HELLO WORLD! HERA ARE THE APIS OF XICHI'S HOMEPAGE!"
})

export default combineRoutes(
  start,
  message,
  songList
)