export type Comment = {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
}

export type Post = {
  id: number
  author: {
    name: string
    avatar: string
  }
  title: string
  text: string
  likes: Array<string>
  createdAt: string
  comments: Array<Comment>
}
