import Router from "koa-router"
import messageController from "../controller/message"

const router = new Router()

router.get("/message", messageController.message)
router.post("/message/add", messageController.add)
router.post("/message/delete", messageController.delete)

router.post("/message/reply", messageController.reply)
router.post("/message/like", messageController.like)
router.post("/message/unlike", messageController.unlike)

export default router