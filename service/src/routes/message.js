const Router = require("koa-router")
const {b} = require("../api/message")

const router = new Router()

router.get("/b", b)

module.exports = router