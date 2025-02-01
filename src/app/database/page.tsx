"use client"

import { useState } from "react"
import { connectToDatabase, disconnectFromDatabase } from "./testDbConnection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, CheckCircle2, XCircle, Plug, PlugIcon as PlugOff, Home } from "lucide-react"
import Link from "next/link"

type ActionStatus = "idle" | "loading" | "success" | "error"

export default function TestDbConnection() {
  const [connectStatus, setConnectStatus] = useState<ActionStatus>("idle")
  const [disconnectStatus, setDisconnectStatus] = useState<ActionStatus>("idle")
  const [message, setMessage] = useState("")

  const handleDatabaseAction = async (action: "connect" | "disconnect") => {
    const setStatus = action === "connect" ? setConnectStatus : setDisconnectStatus
    setStatus("loading")
    setMessage("")

    try {
      const result = await (action === "connect" ? connectToDatabase() : disconnectFromDatabase())
      setStatus(result.success ? "success" : "error")
      setMessage(result.message)
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred.")
    }
  }

  const renderStatusIcon = (status: ActionStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="text-green-500 mr-2" />
      case "error":
        return <XCircle className="text-red-500 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
            <div className="flex items-center justify-center group">
              <Link href="/" className="flex-col justify-center">

                <Home className="flex items-center justify-center" />
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center group">
              <Database className="mr-2 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-primary transition-colors">Database Connection Test</span>
            </CardTitle>


          <CardDescription className="text-center mt-2">Test database connection and disconnection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button
              onClick={() => handleDatabaseAction("connect")}
              className="flex-1"
              disabled={connectStatus === "loading" || disconnectStatus === "loading"}
            >
              {connectStatus === "loading" ? (
                "Connecting..."
              ) : (
                <>
                  <Plug className="mr-2" />
                  Connect
                </>
              )}
            </Button>
            <Button
              onClick={() => handleDatabaseAction("disconnect")}
              className="flex-1"
              disabled={connectStatus === "loading" || disconnectStatus === "loading"}
            >
              {disconnectStatus === "loading" ? (
                "Disconnecting..."
              ) : (
                <>
                  <PlugOff className="mr-2" />
                  Disconnect
                </>
              )}
            </Button>
          </div>
          {(connectStatus !== "idle" || disconnectStatus !== "idle") && (
            <div
              className={`p-4 rounded-md ${
                connectStatus === "success" || disconnectStatus === "success"
                  ? "bg-green-100"
                  : connectStatus === "error" || disconnectStatus === "error"
                    ? "bg-red-100"
                    : "bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                {renderStatusIcon(connectStatus !== "idle" ? connectStatus : disconnectStatus)}
                <p
                  className={`text-sm ${
                    connectStatus === "success" || disconnectStatus === "success"
                      ? "text-green-700"
                      : connectStatus === "error" || disconnectStatus === "error"
                        ? "text-red-700"
                        : "text-gray-700"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

