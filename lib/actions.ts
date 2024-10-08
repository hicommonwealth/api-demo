import { v4 as uuidv4 } from "uuid"
import { Chance } from "chance"
import type { Post, Comment } from "./types"

const chance = Chance()

function getComment(id: number, content?: string): Comment {
  return {
    id,
    author: {
      name: chance.name(),
      avatar: `https://picsum.photos/seed/${uuidv4()}/32/32`,
    },
    content: content ?? chance.sentence(),
  }
}

function getPost(id: number): Post {
  const ps = Math.round(Math.random() * 5) + 1
  return {
    id,
    author: {
      name: chance.name(),
      avatar: `https://picsum.photos/seed/${uuidv4()}/40/40`,
    },
    title: chance.sentence(),
    text: Array(ps)
      .fill(null)
      .map(() => chance.paragraph())
      .join("\n\n"),
    likes: ["0x123"],
    comments: [getComment(1)],
    createdAt: new Date().toISOString(),
  }
}

class ApiClient {
  private baseUrl: string
  private authToken: string | null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.authToken = null
  }

  setAuthToken(token: string) {
    this.authToken = token
  }

  async get(endpoint: string, page = 1) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (endpoint === "/posts") {
      return {
        data: Array(3)
          .fill(null)
          .map((_, i) => getPost(page * 3 + i + 1)),
      }
    }

    throw new Error("Not implemented")
  }

  async post(endpoint: string, data?: { content: string }) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (endpoint.includes("/like")) {
      return { data: { likes: ["0x123", "0x456"] } }
    }

    if (endpoint.includes("/comments")) {
      return {
        data: {
          comments: [getComment(1, data?.content)],
        },
      }
    }

    throw new Error("Not implemented")
  }
}

const apiClient = new ApiClient("")

export async function getPosts(page: number) {
  const response = await apiClient.get("/posts", page)
  return {
    posts: response.data,
    nextPage: page + 1,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function likePost(postId: number) {
  const response = await apiClient.post(`/posts/${postId}/like`)
  return response.data.likes
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addComment(postId: number, content: string) {
  const response = await apiClient.post(`/posts/${postId}/comments`, {
    content,
  })
  return response.data.comments
}
