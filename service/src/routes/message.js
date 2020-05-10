import Router from "koa-router"
import messageController from "../api/message"

const router = new Router()

router.get("/message", messageController.message)
router.post("/message/add", messageController.add)
router.delete("/message/delete", messageController.delete)

module.exports = router