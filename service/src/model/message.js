import mongoose from "../db/index"

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  "cid": { type: Number },
  "message": { type: String },
  "date": { type: String },
  "user": { type: String },
  "likes": { type: Number },
  "subMessages": { type: Number }
})

const MessageModel = mongoose.model("message", MessageSchema)

export default MessageModel