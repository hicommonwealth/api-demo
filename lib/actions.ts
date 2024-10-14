"use server"

import { CommonApiClient } from "@commonxyz/api-client"
import dotenv from "dotenv"

dotenv.config()

const commonClient = new CommonApiClient({
  environment: process.env.HOST,
  apiKey: process.env.API_KEY!,
  address: process.env.ADDRESS!,
})

export async function getPosts(page: number) {
  const response = await commonClient.user.getUserActivity()
  return {
    posts: response,
    nextPage: page,
  }
}

// export async function getPost(postId: number) {
//   return await commonClient.thread.getThread({ postId })
// }

export async function likePost(postId: number) {
  return await commonClient.reaction.createThreadReaction({
    threadId: postId,
  })
}

export async function createComment(postId: number, content: string) {
  return await commonClient.comment.createComment({
    threadId: postId,
    text: content,
  })
}

export async function deleteComment(commentId: number) {
  return await commonClient.comment.deleteComment({
    commentId,
  })
}

export async function updateComment(commentId: number, content: string) {
  return await commonClient.comment.updateComment({
    commentId,
    text: content,
  })
}
