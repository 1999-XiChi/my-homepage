class SongListController{
  constructor(){

  }
  async songList(ctx){
    ctx.body = {
      msg: "hello song list"
    }
  }
}

export default new SongListController();