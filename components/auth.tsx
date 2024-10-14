"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "./state"

export function Auth({ children }: { children: React.ReactNode }) {
  const { address, setAddress } = useAuthStore()

  useEffect(() => {
    const checkMetamask = async () => {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            setAddress(accounts[0])
          })

        window.ethereum.on!("accountsChanged", (...accounts: unknown[]) => {
          const address = accounts[0] as string
          setAddress(address as string)
        })
      }
    }

    checkMetamask()
  }, [address, setAddress])

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAddress(accounts[0])
      } catch (error) {
        console.error("Failed to connect to Metamask", error)
      }
    } else {
      alert("Please install Metamask to use this app")
    }
  }

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <Button
          onClick={connectMetamask}
          className="bg-green-500 text-black hover:bg-green-600 font-mono flex items-center gap-2 font-bold"
        >
          Connect Metamask
        </Button>
      </div>
    )

  return <>{children}</>
}
