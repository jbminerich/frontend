// pages/admin/clients.tsx

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ClientsTable from '@/components/admin/ClientsTable'

export default function ClientsPage() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('payload-token')
    if (!storedToken) {
      router.push('/admin/login')
    } else {
      setToken(storedToken)
    }
  }, [router])

  if (!token) return <p>Loading...</p>

  return (
    <div className="admin-page">
      <h1>Client Management</h1>
      <ClientsTable token={token} />
    </div>
  )
}
