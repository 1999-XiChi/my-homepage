import koa from "koa"
import path from "path"
import helmet from "koa-helmet"
import statics from "koa-static"
import compose from "koa-compose"
import koaBody from "koa-body"
import jsonUtil from "koa-json"
import cors from "@koa/cors"
import router from "./src/routes/routes"
import compress from "koa-compress"

const app = new koa()

const isDevMode = process.env.NODE_ENV === "production" ? false : true;

/* app.use(helmet())
app.use(statics(path.join(__dirname, "./public")))
app.use(router()) */

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, "./public")),
  cors(),
  jsonUtil({pretty:false, param: "pretty"}),
  helmet()
])

if(!isDevMode){
  app.use(compress())
}

app.use(middleware)
app.use(router())

app.listen(3030,()=>{
  console.log("app runnig at 3030")
})