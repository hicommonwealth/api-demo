"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CommonApi } from "@commonxyz/api-client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function Comment({
  comment,
}: {
  comment: CommonApi.GetUserActivityResponseItemRecentCommentsItem
}) {
  return (
    <div className="flex items-start gap-2 mb-2 font-mono">
      <Avatar className="w-6 h-6 border border-green-500">
        <AvatarImage
          src={comment.profileAvatar}
          alt={comment.profileName ?? "Anonymous"}
        />
      </Avatar>
      <div>
        <p className="text-sm">{comment.profileName ?? "Anonymous"}</p>
        <div className="text-sm opacity-90 prose prose-terminal p-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {comment.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
