import Message from "../model/message"

class MessageController {
  constructor() {

  }
  async message(ctx, next) {
    try{
      const result = await Message.find()
      ctx.body = {
        statusCode: 200,
        success: "成功获取",
        msg: result
      }
    } catch (err){
      console.log("获取失败：", err);
      ctx.body = {
        statusCode: 400,
        type: "GET_MESSAGE_FAILLED",
        message: "获取失败"
      }
    }
    next()
  }
  async add(ctx, next) {
    const param = ctx.request.body;
    const data = new Message(param)
    try {
      const result = await data.save()
      ctx.body = {
        statusCode: 200,
        success: "成功提交",
        message: {
          ...param
        }
      }
    } catch (err) {
      console.log("提交失败", err);
      ctx.body = {
        statusCode: 400,
        type: "ADD_MESSAGE_FAILLED",
        message: "提交失败"
      }
    }
    next()
  }
  async delete(ctx, next){
    try{
      const param = ctx.request.body;
      const result = await Message.deleteOne(param)
      ctx.body = {
        statusCode: 200,
        success: "成功删除",
        message: {
          ...result
        }
      }
    }catch(err){
      console.log("删除失败", err);
      ctx.body = {
        statusCode: 400,
        type: "DELETE_MESSAGE_FAILLED",
        message: "删除失败"
      }
    }
    next()
  }
}

export default new MessageController();