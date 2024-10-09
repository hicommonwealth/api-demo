"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Post } from "@/components/post"
import { useEffect } from "react"
import { getPosts } from "@/lib/actions"

export function Feed() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  })

  // Attach scroll event listener to handle infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.innerHeight + document.documentElement.scrollTop
      if (
        scroll >= document.documentElement.scrollHeight &&
        hasNextPage &&
        !isFetchingNextPage
      )
        fetchNextPage()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page) =>
        page.posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </>
  )
}
