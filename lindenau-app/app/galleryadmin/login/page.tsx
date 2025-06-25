"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/toast-provider"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        toast({
          title: "Success",
          description: "Successfully logged in",
          type: "success",
        })
        router.push("/galleryadmin")
      } else {
        toast({
          title: "Error",
          description: result.error || "Invalid credentials",
          type: "error",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred during login",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffde9]">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-normal">
          <Link href="/">Tatjana Lindenau</Link>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About & Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Gallery Admin</h2>
              <p className="text-gray-600 mt-2">Sign in to access the admin panel</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-black/80"
                disabled={isSubmitting || !email.trim() || !password.trim()}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Need access? Contact the administrator to create your account.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-[#837e7e]">
        <div className="space-x-6">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
        </div>
      </footer>
    </div>
  )
}
