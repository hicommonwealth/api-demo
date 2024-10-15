"use server"

import { CommonApiClient } from "@commonxyz/api-client"
import dotenv from "dotenv"

dotenv.config()

const client = new CommonApiClient({
  environment: process.env.HOST,
  apiKey: process.env.API_KEY!,
  address: process.env.ADDRESS!,
})

export async function getPosts(page: number) {
  const response = await client.user.getUserActivity()
  return {
    posts: response,
    nextPage: page,
  }
}

// TODO: implement whe api is ready
// export async function getPost(postId: number) {
//   return await commonClient.thread.getThread({ postId })
// }

export async function likePost(postId: number) {
  return await client.reaction.createThreadReaction({
    threadId: postId,
  })
}

export async function createComment(postId: number, content: string) {
  return await client.comment.createComment({
    threadId: postId,
    text: content,
  })
}

export async function deleteComment(commentId: number) {
  return await client.comment.deleteComment({
    commentId,
  })
}

export async function updateComment(commentId: number, content: string) {
  return await client.comment.updateComment({
    commentId,
    text: content,
  })
}
