"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CommonApi } from "@commonxyz/api-client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useState } from "react"
import { Edit, Trash } from "lucide-react" // Importing Lucide icons
import { useAuthStore } from "./state"

export function Comment({
  comment,
  onEdit,
  onDelete,
}: {
  comment: CommonApi.GetUserActivityResponseItemRecentCommentsItem
  onEdit: (id: number, newText: string) => void
  onDelete: (id: number) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(comment.text)
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

  return (
    <div className="flex items-start gap-2 mb-2 font-mono">
      <Avatar className="w-6 h-6 border border-green-500">
        <AvatarImage
          src={comment.profileAvatar}
          alt={comment.profileName ?? "Anonymous"}
        />
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex gap-2">
          <p className="text-sm">{comment.profileName ?? "Anonymous"}</p>
          {isAuthor && !isEditing && (
            <>
              <button
                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                onClick={handleEditClick}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="text-xs text-red-500 hover:underline flex items-center gap-1"
                onClick={handleDeleteClick}
              >
                <Trash className="w-4 h-4" />
              </button>
            </>
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
              <button
                className="text-sm text-blue-500"
                onClick={handleSaveClick}
              >
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
          <div className="text-sm opacity-90 prose prose-terminal p-3 w-full !max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {comment.text}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
