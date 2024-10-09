"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { Comment } from "@/components/comment"
import { formatDateTime } from "@/lib/utils"
import type * as types from "@/lib/types"
import { likePost } from "@/lib/actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import NewComment from "./new-comment"

export function Post({ post }: { post: types.Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)

  const handleLike = async () => {
    const updatedLikes = await likePost(post.id)
    setLikes(updatedLikes!)
  }

  return (
    <Card className="mb-5 bg-black border border-green-500 text-green-500">
      <CardHeader className="flex flex-wrap md:flex-row justify-between gap-4 border-b border-green-500">
        {/* Author Info Container */}
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border border-green-500">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="bg-green-500 text-black">
              {post.author.name[0]}
            </AvatarFallback>
          </Avatar>{" "}
          <div className="text-left">
            <p className="text-sm font-semibold">{post.author.name}</p>
            <p className="text-xs opacity-70">
              {formatDateTime(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Title Container */}
        <div className="flex-1 pl-3">
          <h2 className="text-lg font-semibold">{post.title}</h2>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="prose prose-terminal relative max-w-none h-auto max-h-96 mb-4 overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.text}</ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 border-t border-green-500">
        <div className="flex items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="text-green-500 hover:text-green-400"
          >
            <Heart className={`mr-2 h-4 w-4 fill-green-500`} />
            {likes.length}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-green-500 hover:text-green-400"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {comments.length}
          </Button>
        </div>
        <div className="w-full space-y-2">
          {comments.map((comment, index) => (
            <Comment key={`c_${post.id}_${index}`} comment={comment} />
          ))}
        </div>
        <NewComment post={post} comments={comments} setComments={setComments} />
      </CardFooter>
    </Card>
  )
}
