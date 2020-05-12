import Message from "../model/message"

class MessageController {
  constructor() {

  }
  async message(ctx, next) {
    try {
      const result = await Message.find()
      ctx.body = {
        statusCode: 200,
        success: "成功获取",
        msg: result
      }
    } catch (err) {
      console.log("获取失败：", err);
      ctx.body = {
        statusCode: 400,
        type: "GET_MESSAGE_FAILED",
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
        message: result
      }
    } catch (err) {
      console.log("提交失败", err);
      ctx.body = {
        statusCode: 400,
        type: "ADD_MESSAGE_FAILED",
        message: "提交失败"
      }
    }
    next()
  }
  async reply(ctx, next) {
    try {
      const { id, subMessage } = ctx.request.body; 
      const message = await Message.findOne({_id: id})
      const newSubMessage = message.subMessages.concat(subMessage);
      const result = await Message.updateOne({ _id: id }, {
        subMessages: newSubMessage
      })
      if(result.n === 1){
        ctx.body = {
          statusCode: 200,
          success: "成功回复",
          message: newSubMessage
        }
      }else{
        ctx.body = {
          statusCode: 400,
          type: "REPLY_MESSAGE_ERROR",
          message: result
        }
      }
    } catch (err) {
      console.log("回复失败", err);
      ctx.body = {
        statusCode: 400,
        type: "REPLY_MESSAGE_FAILED",
        message: "回复失败"
      }
    }
    next()
  }
  async delete(ctx, next) {
    try {
      const {id} = ctx.request.body;
      const result = await Message.deleteOne({_id: id})
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
          type: "DELETE_MESSAGE_ERROR",
          message: result
        }
      }
    } catch (err) {
      console.log("删除失败", err);
      ctx.body = {
        statusCode: 400,
        type: "DELETE_MESSAGE_FAILED",
        message: "删除失败"
      }
    }
    next()
  }
  async like(ctx, next) {
    try{
      const { id } = ctx.request.body;
      const message = await Message.findOne({_id: id})
      const likes = message.likes + 1
      const result = await Message.updateOne({ _id: id }, {
        likes: likes
      })
      const updatedMessage = {
        ...message["_doc"],
        "likes": likes
      }
      ctx.body = {
        statusCode: 200,
        success: "成功点赞",
        message: updatedMessage
      }
    }catch(err){
      console.log("点赞失败："+ err)
      ctx.body = {
        statusCode: 400,
        success: "LIKE_MESSAGE_FAILED",
        message: "点赞失败"
      }
    }
    next()
  }
  async unlike(ctx, next) {
    try{
      const { id } = ctx.request.body;
      const message = await Message.findOne({_id: id})
      const likes = message.likes - 1
      const result = await Message.updateOne({ _id: id }, {
        likes: likes
      })
      const updatedMessage = {
        ...message["_doc"],
        "likes": likes
      }
      ctx.body = {
        statusCode: 200,
        success: "取消点赞",
        message: updatedMessage
      }
    }catch(err){
      console.log("取消点赞失败："+ err)
      ctx.body = {
        statusCode: 400,
        success: "UNLIKE_MESSAGE_FAILED",
        message: "取消点赞失败"
      }
    }
    next()
  }
}

export default new MessageController();