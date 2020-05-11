import mongoose from "../db/index"

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  "message": { type: String },
  "date": {
    type: Date,
    default: Date.now
  },
  "user": { type: String },
  "likes": { type: Number, default: 0 },
  "subMessages": { type: Array },
  "avatar": { type: String, default: "http://njupt.xichi.xyz/homepage/avatar/avatar_girl.png" }
})

const MessageModel = mongoose.model("message", MessageSchema)

export default MessageModel