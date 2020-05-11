import mongoose from "../db/index"

const Schema = mongoose.Schema;

const SongListSchema = new Schema({
  "song": { author: String, id: Number, name: String, src: String },
  "date": {
    type: Date,
    default: Date.now
  },
  "user": { type: String },
  "msg": { type: String }
})

const SongListModel = mongoose.model("songList", SongListSchema)

export default SongListModel