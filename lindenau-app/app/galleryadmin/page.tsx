"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Edit, Trash2, GripVertical, LogOut, MoreVertical, Palette, CheckCircle, XCircle } from "lucide-react"
import { deleteArtworkAction, updatePositionsAction } from "@/app/actions"
import type { Artwork } from "@/lib/db"
import { useToast } from "@/components/toast-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-provider"

function GalleryAdminContent() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { logout, user } = useAuth()

  // Fetch artworks on component mount
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/artworks")
        if (!response.ok) throw new Error("Failed to fetch artworks")
        const data = await response.json()
        setArtworks(data)
      } catch (error) {
        console.error("Error fetching artworks:", error)
        toast({
          title: "Error",
          description: "Failed to load artworks",
          type: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtworks()
  }, [toast])

  const handleAddArtwork = () => {
    router.push("/galleryadmin/artwork/new")
  }

  const handleEditArtwork = (id: string) => {
    router.push(`/galleryadmin/artwork/edit/${id}`)
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Success",
      description: "Successfully logged out",
      type: "success",
    })
    router.push("/")
  }

  const handleDeleteArtwork = async (id: string) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      try {
        const result = await deleteArtworkAction(id)

        if (result.success) {
          setArtworks(artworks.filter((artwork) => artwork.id !== id))
          toast({
            title: "Success",
            description: "Artwork deleted successfully",
            type: "success",
          })
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to delete artwork",
            type: "error",
          })
        }
      } catch (error) {
        console.error("Error deleting artwork:", error)
        toast({
          title: "Error",
          description: "Failed to delete artwork",
          type: "error",
        })
      }
    }
  }

  const onDragEnd = async (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return
    }

    // Don't do anything if the position didn't change
    if (result.destination.index === result.source.index) {
      return
    }

    const items = Array.from(artworks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index,
    }))

    // Update local state immediately
    setArtworks(updatedItems)

    // Save the new positions to the database
    try {
      setIsSaving(true)
      const positions = updatedItems.map((item) => ({
        id: item.id,
        position: item.position,
      }))

      const result = await updatePositionsAction(positions)

      if (result.success) {
        toast({
          title: "Success",
          description: "Artwork positions updated",
          type: "success",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update positions",
          type: "error",
        })
        // Refetch to ensure we have the correct state
        fetchArtworks()
      }
    } catch (error) {
      console.error("Error updating positions:", error)
      toast({
        title: "Error",
        description: "Failed to update positions",
        type: "error",
      })
      // Refetch to ensure we have the correct state
      fetchArtworks()
    } finally {
      setIsSaving(false)
    }
  }

  // Helper function to refetch artworks
  const fetchArtworks = async () => {
    try {
      const response = await fetch("/api/artworks")
      if (!response.ok) throw new Error("Failed to fetch artworks")
      const data = await response.json()
      setArtworks(data)
    } catch (error) {
      console.error("Error fetching artworks:", error)
    }
  }

  const filteredArtworks = () => {
    if (activeTab === "available") {
      return artworks.filter((artwork) => artwork.availability === "Available")
    } else if (activeTab === "sold") {
      return artworks.filter((artwork) => artwork.availability === "Sold")
    }
    return artworks
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffde9]">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center sm:text-left">
          <Link href="/">Tatjana Lindenau</Link>
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm">Welcome, {user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-6 py-6 sm:py-8 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl">Gallery Management</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {isSaving && (
              <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                Saving changes...
              </span>
            )}
            <Button onClick={handleAddArtwork} className="bg-black hover:bg-black/80 flex items-center text-white w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Artwork
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : artworks.length === 0 ? (
          <div className="bg-white p-6 sm:p-8 text-center rounded-md shadow">
            <h3 className="text-lg sm:text-xl mb-2 sm:mb-4">No artworks yet</h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base">Start by adding your first artwork to the gallery.</p>
            <Button onClick={handleAddArtwork} className="bg-black hover:bg-black/80 text-white w-full sm:w-auto">
              Add Your First Artwork
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4 sm:mb-6 bg-white border border-gray-200 p-1 rounded-lg shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-0">
              <TabsTrigger 
                value="all" 
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-50 data-[state=active]:hover:bg-black"
              >
                <Palette className="h-4 w-4" />
                All Artworks
              </TabsTrigger>
              <TabsTrigger 
                value="available" 
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-50 data-[state=active]:hover:bg-green-600"
              >
                <CheckCircle className="h-4 w-4" />
                Available
              </TabsTrigger>
              <TabsTrigger 
                value="sold" 
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-50 data-[state=active]:hover:bg-red-600"
              >
                <XCircle className="h-4 w-4" />
                Sold
              </TabsTrigger>
            </TabsList>

            {/* Responsive Table Wrapper for All Artworks */}
            <TabsContent value="all" className="space-y-4">
              <div className="bg-white shadow rounded-md overflow-x-auto">
                <div className="min-w-[600px]">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="artworks">
                      {(provided) => (
                        <table
                          className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <thead className="bg-gray-50">
                            <tr>
                              <th style={{ width: "40px" }} className="px-2 py-3"></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Techniques
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Availability
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Position
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArtworks().map((artwork, index) => (
                              <Draggable key={artwork.id} draggableId={artwork.id.toString()} index={index}>
                                {(provided) => (
                                  <tr ref={provided.innerRef} {...provided.draggableProps}>
                                    <td className="px-2" {...provided.dragHandleProps}>
                                      <GripVertical className="h-5 w-5 text-gray-400" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="w-16 h-16 relative">
                                        <Image
                                          src={artwork.image_url || "/placeholder.svg"}
                                          alt={artwork.title}
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-500">{artwork.techniques}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          artwork.availability === "Available"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {artwork.availability}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {artwork.position + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                          >
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleEditArtwork(artwork.id)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            onClick={() => handleDeleteArtwork(artwork.id)}
                                            className="text-red-600 focus:text-red-600"
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        </table>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </TabsContent>

            {/* Responsive Table Wrapper for Available Artworks */}
            <TabsContent value="available" className="space-y-4">
              <div className="bg-white shadow rounded-md overflow-x-auto">
                <div className="min-w-[500px]">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="available-artworks">
                      {(provided) => (
                        <table
                          className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <thead className="bg-gray-50">
                            <tr>
                              <th style={{ width: "40px" }} className="px-2 py-3"></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Techniques
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Position
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArtworks().map((artwork, index) => (
                              <Draggable key={artwork.id} draggableId={`available-${artwork.id}`} index={index}>
                                {(provided) => (
                                  <tr ref={provided.innerRef} {...provided.draggableProps}>
                                    <td className="px-2" {...provided.dragHandleProps}>
                                      <GripVertical className="h-5 w-5 text-gray-400" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="w-16 h-16 relative">
                                        <Image
                                          src={artwork.image_url || "/placeholder.svg"}
                                          alt={artwork.title}
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-500">{artwork.techniques}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {artwork.position + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                          >
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleEditArtwork(artwork.id)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            onClick={() => handleDeleteArtwork(artwork.id)}
                                            className="text-red-600 focus:text-red-600"
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        </table>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </TabsContent>

            {/* Responsive Table Wrapper for Sold Artworks */}
            <TabsContent value="sold" className="space-y-4">
              <div className="bg-white shadow rounded-md overflow-x-auto">
                <div className="min-w-[500px]">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sold-artworks">
                      {(provided) => (
                        <table
                          className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <thead className="bg-gray-50">
                            <tr>
                              <th style={{ width: "40px" }} className="px-2 py-3"></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Image
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Techniques
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Position
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArtworks().map((artwork, index) => (
                              <Draggable key={artwork.id} draggableId={`sold-${artwork.id}`} index={index}>
                                {(provided) => (
                                  <tr ref={provided.innerRef} {...provided.draggableProps}>
                                    <td className="px-2" {...provided.dragHandleProps}>
                                      <GripVertical className="h-5 w-5 text-gray-400" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="w-16 h-16 relative">
                                        <Image
                                          src={artwork.image_url || "/placeholder.svg"}
                                          alt={artwork.title}
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">{artwork.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-500">{artwork.techniques}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {artwork.position + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-600 hover:text-gray-900"
                                          >
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleEditArtwork(artwork.id)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            onClick={() => handleDeleteArtwork(artwork.id)}
                                            className="text-red-600 focus:text-red-600"
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </tbody>
                        </table>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-[#837e7e] text-xs sm:text-base">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
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

export default function GalleryAdmin() {
  return (
    <ProtectedRoute>
      <GalleryAdminContent />
    </ProtectedRoute>
  )
}
