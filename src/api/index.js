import axios from "axios";

let request = axios.create({
  baseURL: "https://api.xichi.xyz/homepage"
})

// MESSAGE API

export const getAllMessage = () => {
  return request.get("/message")
}

export const addMessage = (user, avatar, message, date) => {
  return request.post("/message/add", {
    user,
    avatar,
    message,
    date
  })
}

export const replyMessage = (id, subMessage) => {
  return request.post("/message/reply", {
    id,
    subMessage
  })
}

export const deleteMessage = (id) => {
  return request.post("/message/delete", {
    id
  })
}

export const likeMessage = (id) => {
  return request.post("/message/like", {
    id
  })
}

export const unlikeMessage = (id) => {
  return request.post("/message/unlike", {
    id
  })
}

// SONG LIST API
export const getSongList = () => {
  return request.get("/songlist")
}

export const addSong = (song, date, user, msg) => {
  return request.post("/songlist/add", {
    song,
    date,
    user,
    msg
  })
}

export const deleteSong = (id) => {
  return request.post("/songlist/delete", {
    id
  })
}
