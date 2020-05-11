import SongList from "../model/songList"

class SongListController{
  constructor(){

  }
  
  async songList(ctx, next) {
    try {
      const result = await SongList.find()
      ctx.body = {
        statusCode: 200,
        success: "成功获取",
        msg: result
      }
    } catch (err) {
      console.log("获取失败：", err);
      ctx.body = {
        statusCode: 400,
        type: "GET_SONGLIST_FAILED",
        message: "获取失败"
      }
    }
    next()
  }
  async add(ctx, next) {
    const param = ctx.request.body;
    const data = new SongList(param)
    try {
      const result = await data.save()
      ctx.body = {
        statusCode: 200,
        success: "成功收藏",
        message: result
      }
    } catch (err) {
      console.log("提交失败", err);
      ctx.body = {
        statusCode: 400,
        type: "ADD_SONGLIST_FAILED",
        message: "提交收藏"
      }
    }
    next()
  }
  async delete(ctx, next) {
    try {
      const {id} = ctx.request.body;
      const result = await SongList.deleteOne({_id: id})
      if(result.n === 1){
        ctx.body = {
          statusCode: 200,
          success: "成功删除",
          message: {
            ...result
          }
        }
      }else{
        ctx.body = {
          statusCode: 400,
          type: "DELETE_SONGLIST_ERROR",
          message: result
        }
      }
    } catch (err) {
      console.log("删除失败", err);
      ctx.body = {
        statusCode: 400,
        type: "DELETE_SONGLIST_FAILED",
        message: "删除失败"
      }
    }
    next()
  }
}

export default new SongListController();