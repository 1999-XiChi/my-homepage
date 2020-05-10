const Router = require("koa-router")
import SongListController from "../api/songList"

const router = new Router()

router.get("/songList", SongListController.songList)

module.exports = router