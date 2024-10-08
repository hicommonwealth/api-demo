"use client"

import { FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle } from "lucide-react"
import { Comment } from "@/components/comment"
import { formatDateTime } from "@/lib/utils"
import type * as types from "@/lib/types"
import { addComment, likePost } from "@/lib/actions"

export function Post({ post }: { post: types.Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [newComment, setNewComment] = useState("")

  const handleLike = async () => {
    const updatedLikes = await likePost(post.id)
    setLikes(updatedLikes!)
  }

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const updatedComment = await addComment(post.id, newComment)
      setComments([...comments, ...updatedComment!])
      setNewComment("")
    }
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
        <div className="relative w-full h-64 mb-4 overflow-auto">
          {post.text.split("\n\n").map((p, i) => (
            <p className="pb-3" key={`p_${post.id}_${i}`}>
              {p}
            </p>
          ))}
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
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <form onSubmit={handleAddComment} className="flex w-full gap-2">
          <Input
            id="comment"
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow bg-black text-green-500 border-green-500 focus:ring-green-500"
          />
          <Button
            type="submit"
            className="bg-green-500 text-black hover:bg-green-600"
          >
            Post
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
