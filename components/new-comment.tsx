import React, { FormEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea" // Adjust to your Textarea component path
import { Button } from "./ui/button"
import { createComment, getComments } from "@/lib/actions"
import { CommonApi } from "@commonxyz/api-client"

interface NewCommentProps {
  post: CommonApi.GetUserActivityResponseResultsItem
  setComments: React.Dispatch<
    React.SetStateAction<
      Array<CommonApi.GetUserActivityResponseResultsItemRecentCommentsItem>
    >
  >
}

export default function NewComment({ post, setComments }: NewCommentProps) {
  const [newComment, setNewComment] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handler = async (e?: FormEvent) => {
    e?.preventDefault()
    if (newComment.trim()) {
      await createComment(post.id, newComment)
      const updadatedComments = await getComments(post.id)
      setComments([
        ...updadatedComments.results.map((c) => ({
          id: c.id!,
          body: c.body,
          created_at: c.created_at!,
          deleted_at: c.deleted_at,
          address: c.Address!.address!,
          user_id: c.Address!.User!.id!,
          profile_name: c.Address!.User!.profile.name,
          profile_avatar: c.Address!.User!.profile.avatar_url,
        })),
      ])
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
      {newComment.trim() && (
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-green-500 text-black hover:bg-green-600"
          >
            Submit
          </Button>
        </div>
      )}
    </form>
  )
}
