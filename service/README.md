# API

1. 评论

   + GET /message  获取评论列表
   + POST /message/add 发表评论
   + POST /message/reply 回复某条评论
   + POST /message/delete 删除评论

   + POST /message/like  点赞评论
   + POST /message/unlike  取消点赞

2. 访客歌单

   + GET /songList  获取访客歌单
   + POST /songList/add  收藏到访客歌单
   + POST /songList/delete  取消收藏

## How to start?

+ `npm install`
+ `npm start`

## How to deploy?

+ `npm install`
+ `npm run build`
+ `pm2 start dist/server.bundle.js`

## 踩坑

webpack打包没有报错，但`nodedist/server.bundle.js`