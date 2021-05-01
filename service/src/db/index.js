import mongoose from "mongoose"

const db_url = "";

mongoose.connect(db_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//连接失败
mongoose.connection.on("connected",()=>{
  console.log("Mongoose connection open to" + db_url)
})

//连接异常
mongoose.connection.on("error",(err)=>{
  console.log("Mongoose connection error: " + err)
})

//断开连接
mongoose.connection.on("disconnected",()=>{
  console.log("Mongoose connection disconnected: ")
})

export default mongoose;

