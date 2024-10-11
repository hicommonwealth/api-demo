"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { Comment } from "@/components/comment"
import { formatDateTime } from "@/lib/utils"
import { likePost } from "@/lib/actions"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import NewComment from "./new-comment"
import { CommonApi } from "@commonxyz/api-client"

export function Post({
  post,
}: {
  post: CommonApi.GetUserActivityResponseItem
}) {
  const [likes, setLikes] = useState([""]) //post.likes
  const [comments, setComments] = useState(post.recentComments ?? [])

  const handleLike = async () => {
    const response = await likePost(post.id)
    setLikes([...likes, response.reaction])
  }

  return (
    <Card className="mb-5 bg-black border border-green-500 text-green-500">
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

        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-12 h-12 border border-green-500">
            <AvatarImage src={post.communityIcon} alt={post.communityId} />
          </Avatar>
          <div className="text-left">
            <p className="text-lg">{post.communityId}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="prose prose-terminal relative max-w-none h-auto max-h-96 mb-4 overflow-auto">
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
          {post.recentComments?.map((comment, index) => (
            <Comment key={`c_${post.id}_${index}`} comment={comment} />
          ))}
        </div>
        <NewComment post={post} comments={comments} setComments={setComments} />
      </CardFooter>
    </Card>
  )
}
