"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { Comment } from "@/components/comment"
import { formatDateTime } from "@/lib/utils"
import { deleteComment, likePost, updateComment } from "@/lib/actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import NewComment from "./new-comment"
import { CommonApi } from "@commonxyz/api-client"
import { useAlert } from "./alert-provider"

export function Post({
  post,
}: {
  post: CommonApi.GetUserActivityResponseItem
}) {
  const [likes, setLikes] = useState([""]) //post.likes
  const [comments, setComments] = useState(post.recentComments ?? [])
  const { showAlert } = useAlert()

  const handleLike = async () => {
    try {
      const response = await likePost(post.id)
      setLikes([...likes, response.reaction])
    } catch (error) {
      showAlert({ error, description: "Failed to like post." })
    }
  }

  const handleEditComment = async (id: number, newText: string) => {
    try {
      await updateComment(id, newText)
      const comment = comments.find((comment) => comment.id === id)
      if (comment) {
        comment.text = newText
      }
      setComments([...comments])
    } catch (error) {
      showAlert({ error, description: "Failed to edit comment." })
    }
  }

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id)
      setComments(comments.filter((comment) => comment.id !== id))
    } catch (error) {
      showAlert({ error, description: "Failed to delete comment." })
    }
  }

  return (
    <Card className="mb-10 bg-black border border-green-500 text-green-500 shadow-lg shadow-green-500/50">
      <CardHeader className="flex flex-wrap md:flex-row justify-between gap-4 border-b border-green-500">
        <div className="flex-1 text-left">
          <h2 className="text-xl pl-1 pb-2">{post.title}</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0">
              <Avatar className="w-8 h-8 border border-green-500">
                <AvatarImage
                  src={post.profileAvatar}
                  alt={post.profileName ?? "Anonymous"}
                />
              </Avatar>
            </div>
            <div>
              <p className="text-sm">{post.profileName ?? "Anonymous"}</p>
              <p className="text-xs opacity-70">
                {formatDateTime(post.createdAt!)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-3xl shadow-lg shadow-green-500/50">
          <Avatar className="w-12 h-12 border border-green-500">
            <AvatarImage src={post.communityIcon} alt={post.communityId} />
          </Avatar>
          <div className="text-left">
            <p className="text-lg">{post.communityId}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="prose prose-terminal relative max-w-none h-auto max-h-fit mb-4 overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
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
            {post.numberOfComments}
          </Button>
        </div>
        <div className="w-full space-y-2">
          {comments?.map((comment, index) => (
            <Comment
              key={`c_${post.id}_${index}`}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
        <NewComment post={post} setComments={setComments} />
      </CardFooter>
    </Card>
  )
}
