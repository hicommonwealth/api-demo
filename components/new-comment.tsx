import React, { FormEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea" // Adjust to your Textarea component path
import { Button } from "./ui/button"
import { addComment } from "@/lib/actions"
import type * as types from "@/lib/types"

interface NewCommentProps {
  post: { id: number }
  comments: Array<types.Comment>
  setComments: React.Dispatch<React.SetStateAction<Array<types.Comment>>>
}

export default function NewComment({
  post,
  comments,
  setComments,
}: NewCommentProps) {
  const [newComment, setNewComment] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handler = async (e?: FormEvent) => {
    e?.preventDefault()
    if (newComment.trim()) {
      const updatedComment = await addComment(post.id, newComment)
      setComments([...comments, ...updatedComment!])
      setNewComment("")
    }
  }

  return (
    <form onSubmit={handler} className="relative flex w-full flex-col gap-2">
      {/* Placeholder Div */}
      {!isFocused && !newComment && (
        <div className="absolute text-sm top-0 left-0 m-2 text-green-800 pointer-events-none bg-black">
          Write a comment:
          <ul className="m-2 list-disc list-inside">
            <li>
              Supports <span className="font-bold">markdown</span>
            </li>
            <li>
              <span className="italic underline">Shift+Enter</span> for new
              lines
            </li>
          </ul>
        </div>
      )}
      {/* Textarea */}
      <Textarea
        id="comment"
        rows={4}
        placeholder=""
        value={newComment}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handler()
          }
        }}
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={() => setIsFocused(true)} // Hide the placeholder on focus
        onBlur={() => setIsFocused(false)} // Show the placeholder on blur if empty
        className="w-full bg-black text-green-500 border border-green-500 p-2 focus:ring-green-500"
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-green-500 text-black hover:bg-green-600"
          disabled={!newComment.trim()}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
