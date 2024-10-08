"use client"

import { Suspense } from "react"
import { Auth } from "./auth"
import { Feed } from "./feed"

export function Home() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      <header className="border-b border-green-500">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-2xl font-bold text-center">
            Common Terminal Feed
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
          <Auth>
            <Suspense
              fallback={<div className="text-green-500">Loading feed...</div>}
            >
              <Feed />
            </Suspense>
          </Auth>
        </div>
      </main>
    </div>
  )
}
