"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type * as types from "@/lib/types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function Comment({ comment }: { comment: types.Comment }) {
  return (
    <div className="flex items-start gap-2 mb-2 font-mono">
      <Avatar className="w-6 h-6 border border-green-500">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback className="bg-green-500 text-black text-xs">
          {comment.author.name[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{comment.author.name}</p>
        <div className="text-sm opacity-90 prose prose-terminal p-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {comment.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
