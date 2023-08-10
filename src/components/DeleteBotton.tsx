'use client'
import { useEffect, useState } from 'react' // Import useState
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Memory {
  id: string
}

export function DeleteBotton({ id }: Memory) {
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false) // State for showing modal
  const [memories, setMemories] = useState<Memory[]>([])

  useEffect(() => {
    // Fetch and set memories when the component mounts
    fetchMemories()
  }, [])

  async function fetchMemories() {
    const token = Cookie.get('token')
    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemories(response.data) // Update memories list with fetched data
  }

  async function handleDelete() {
    const token = Cookie.get('token')

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemories(memories.filter((memory) => memory.id !== id))

    router.push('/')
  }

  return (
    <>
      <button type="button" onClick={() => setShowConfirmation(true)}>
        {' '}
        {/* Show modal on button click */}
        <Trash2 className="h-4 w-4 items-end text-red-600 hover:text-red-500" />
      </button>

      {/* Modal */}
      {showConfirmation && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <div className="rounded-md bg-zinc-950 p-6 shadow-md">
            <p>Tem certeza de que deseja excluir?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-400"
                onClick={() => {
                  handleDelete()
                  setShowConfirmation(false) // Hide modal on delete
                }}
              >
                Sim
              </button>
              <button
                className="rounded-md bg-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowConfirmation(false)} // Hide modal on cancel
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
