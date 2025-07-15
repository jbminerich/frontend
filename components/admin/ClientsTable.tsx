import { useEffect, useState } from 'react'

interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  notes?: string
}

interface Props {
  token: string | null
}

export default function ClientsTable({ token }: Props) {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    if (!token) return

    const fetchClients = async () => {
      try {
        const res = await fetch('http://192.168.254.156:3000/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setClients(data.docs)
      } catch (err) {
        console.error('Failed to fetch clients:', err)
      }
    }

    fetchClients()
  }, [token])

  return (
    <div className="clients-section">
      <h2>Clients</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email || '-'}</td>
              <td>{client.phone || '-'}</td>
              <td>{client.address || '-'}</td>
              <td>{client.notes || '-'}</td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => alert(`TODO: show bookings for ${client.name}`)}
                >
                  View Bookings
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="section-divider" />
    </div>
  )
}
