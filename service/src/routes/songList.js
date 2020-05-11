import Router from "koa-router"
import SongListController from "../controller/songList"

const router = new Router()

router.get("/songlist", SongListController.songList)
router.post("/songlist/add", SongListController.add)
router.post("/songlist/delete", SongListController.delete)

export default router