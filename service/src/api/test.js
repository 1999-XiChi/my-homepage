import User from "../model/test"

const user = {
  name: "brain",
  age: 30,
  email: "4745045964@qq.com"
}

//增
const add = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}

export default add

//查
const find = async () => {
  const result = await User.find()
  console.log(result)
}

find()

// 改
const update = async () => {
  const result = await User.updateOne({ name: "brain" }, {
    name: "xichi"
  })
  console.log(result)
}

update()

// 删
const delete = async () => {
  const result = await User.deleteOne({ name: "brain" })
  console.log(result)
}

delete()
