"use client"

import { Suspense } from "react"
import { Auth } from "./auth"
import { Feed } from "./feed"
import { AlertProvider } from "./alert-provider"

export function Home() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      <header>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-2xl font-bold text-center">common.xyz</h1>
        </div>
      </header>
      <main>
        <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
          <AlertProvider>
            <Auth>
              <Suspense
                fallback={<div className="text-green-500">Loading feed...</div>}
              >
                <Feed />
              </Suspense>
            </Auth>
          </AlertProvider>
        </div>
      </main>
    </div>
  )
}
