"use server"

import { CommonApi, CommonApiClient } from "@commonxyz/api-client"
import dotenv from "dotenv"

dotenv.config()

const client = new CommonApiClient({
  environment: process.env.HOST,
  apiKey: process.env.API_KEY!,
  address: process.env.ADDRESS!,
})

export async function getPosts(page: number) {
  const response = await client.user.getUserActivity({
    comment_limit: 5,
  })
  return {
    posts: response,
    nextPage: page,
  }
}

export async function getComments(postId: number) {
  return await client.comment.getComments({
    thread_id: postId,
    limit: "5",
    order_by: "created_at",
    order_direction: CommonApi.GetCommentsRequestOrderDirection.Desc,
    include_user: true,
  })
}

export async function likePost(postId: number) {
  return await client.reaction.createThreadReaction({
    thread_id: postId,
  })
}

export async function createComment(postId: number, content: string) {
  return await client.comment.createComment({
    thread_id: postId,
    body: content,
  })
}

export async function deleteComment(comment_id: number) {
  return await client.comment.deleteComment({
    comment_id,
  })
}

export async function updateComment(comment_id: number, content: string) {
  return await client.comment.updateComment({
    comment_id,
    body: content,
  })
}
