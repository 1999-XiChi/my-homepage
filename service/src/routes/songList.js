const Router = require("koa-router")
const {a} = require("../api/songList")

const router = new Router()

router.get("/a", a)

module.exports = router