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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function likePost(postId: number) {
  return await commonClient.reaction.createThreadReaction({
    threadId: postId,
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addComment(postId: number, content: string) {
  return await commonClient.comment.createComment({
    threadId: postId,
    text: content,
  })
}
