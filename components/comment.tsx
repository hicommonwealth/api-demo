"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CommonApi } from "@commonxyz/api-client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useState } from "react"
import { Edit, Trash } from "lucide-react" // Importing Lucide icons
import { useAuthStore } from "./state"
import { formatDateTime } from "@/lib/utils"

export function Comment({
  comment,
  onEdit,
  onDelete,
}: {
  comment: CommonApi.GetUserActivityResponseResultsItemRecentCommentsItem
  onEdit: (id: number, newText: string) => void
  onDelete: (id: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(comment.body)
  const { address } = useAuthStore()

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    onEdit(comment.id, editedText)
    setIsEditing(false)
  }

  const handleDeleteClick = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id)
    }
  }

  // seems like metamask is coverting address to lowercase
  const isAuthor = comment.address.toLowerCase() == address
  const isDeleted =
    typeof comment.deleted_at !== "undefined" && comment.deleted_at !== null

  return (
    <div className="flex items-start gap-2 mb-2 font-mono">
      <Avatar className="w-6 h-6 border border-green-500">
        <AvatarImage
          src={comment.profile_avatar}
          alt={comment.profile_name ?? "Anonymous"}
        />
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex gap-2">
          <div className="flex flex-1 text-sm">
            {comment.profile_name ?? "Anonymous"}
            <small className="opacity-70 pl-3">
              {formatDateTime(comment.created_at!)}
            </small>
          </div>
          {isAuthor && !isEditing && !isDeleted && (
            <div className="flex">
              <button
                className="text-xs hover:underline flex items-center gap-1 pr-2"
                onClick={handleEditClick}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="text-xs hover:underline flex items-center gap-1 pr-2"
                onClick={handleDeleteClick}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 w-full !max-w-full">
            <textarea
              rows={4}
              className="w-full bg-black text-green-500 border border-green-500 p-2 focus:ring-green-500 rounded-md"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="flex gap-2">
              <button className="text-sm" onClick={handleSaveClick}>
                Save
              </button>
              <button
                className="text-sm text-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`text-sm opacity-90 prose prose-terminal p-3 w-full !max-w-full ${
              isDeleted && "line-through text-gray-500"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {comment.body}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
