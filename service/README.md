# API

1. 评论

   + GET /comments  获取评论列表
   + POST /comments/add 发表评论
   + POST /comments/reply 回复某条评修改评论
   + DELETE /comments 删除评论

   + PUT /comments/like  点赞评论
   + DELETE /comments/unlike  取消点赞

2. 访客歌单

   + GET /songList  获取访客歌单
   + POST /songList/add  收藏到访客歌单
   + POST /songList/delete  取消收藏