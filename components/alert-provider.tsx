import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

// Define the shape of the alert state
interface AlertState {
  type: "success" | "error" | "info" | null
  title?: string
  description?: string
  error?: unknown
}

interface AlertContextType {
  showAlert: (
    alert: Omit<AlertState, "type"> & {
      type?: AlertState["type"]
      timeout?: number
    }
  ) => void
  hideAlert: () => void
  alert: AlertState
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    type: null,
    title: "",
    description: "",
  })

  // Automatically hide the alert after a timeout (default 5000ms)
  useEffect(() => {
    if (alert.type) {
      const timer = setTimeout(() => {
        hideAlert()
      }, 5000) // Change the timeout duration as needed

      return () => clearTimeout(timer)
    }
  }, [alert])

  const showAlert = ({
    title,
    description,
    error,
    type = "error",
    timeout = 5000, // You can override the timeout when showing an alert
  }: Omit<AlertState, "type"> & {
    type?: AlertState["type"]
    timeout?: number
  }) => {
    const defaultDescription = description ?? "Something went wrong."
    if (error) {
      if (error instanceof Error) {
        setAlert({
          title: "Error",
          description: error.message,
          type: "error",
        })
      } else {
        setAlert({
          title: "Error",
          description: defaultDescription,
          type: "error",
        })
      }
    } else setAlert({ title, description: defaultDescription, type })

    // Custom timeout for auto-close
    if (timeout) {
      setTimeout(() => hideAlert(), timeout)
    }
  }

  const hideAlert = () => setAlert({ type: null, title: "", description: "" })

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
      {alert.type && (
        <div className="fixed top-4 right-4 z-50 opacity-100">
          <Alert variant={alert.type === "error" ? "destructive" : "default"}>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  )
}

// Custom hook to use the alert context
export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context
}
