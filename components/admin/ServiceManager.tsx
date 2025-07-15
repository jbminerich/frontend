// components/admin/ServiceManager.tsx
import { useEffect, useState } from 'react'

interface Service {
  id: string
  title: string
  description?: string
  price?: number
}

interface Props {
  token: string | null
}

export default function ServiceManager({ token }: Props) {
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState<Service>({
    id: '',
    title: '',
    description: '',
    price: undefined,
  })
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)


  const fetchServices = async () => {
    const res = await fetch('http://192.168.254.156:3000/api/services', {
      headers: { Authorization: `JWT ${token}` },
    })
    const data = await res.json()
    setServices(data.docs)
  }

  useEffect(() => {
    if (token) fetchServices()
  }, [token])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewService((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }))
  }

  const handleAddOrEditService = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingServiceId ? 'PATCH' : 'POST'
    const url = editingServiceId
      ? `http://192.168.254.156:3000/api/services/${editingServiceId}`
      : `http://192.168.254.156:3000/api/services`

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        title: newService.title,
        description: newService.description,
        price: newService.price,
      }),
    })

    if (res.ok) {
      alert(editingServiceId ? 'Service updated!' : 'Service added!')
      setNewService({ id: '', title: '', description: '', price: undefined })
      setEditingServiceId(null)
      fetchServices()
    } else {
      alert('Failed to save service')
    }
  }

  const handleEditClick = (service: Service) => {
    setNewService(service)
    setEditingServiceId(service.id)
    setShowForm(true) // <-- This line ensures the form appears when editing
  }
  

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    const res = await fetch(`http://192.168.254.156:3000/api/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `JWT ${token}` },
    })

    if (res.ok) {
      alert('Service deleted!')
      fetchServices()
    } else {
      alert('Failed to delete service')
    }
  }

  return (
    <section className="service-manager">



<h3>Existing Services</h3>
{services.length === 0 ? (
  <p>No services found</p>
) : (
  <div className="table-wrapper">
    <table className="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.id}>
            <td>{s.title}</td>
            <td>{s.description || '-'}</td>
            <td>{s.price !== undefined ? `$${s.price}` : 'N/A'}</td>
            <td className="button-group">
              <button onClick={() => handleEditClick(s)} className="btn btn-primary">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="btn btn-primary">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

  <button
  onClick={() => {
    if (editingServiceId) return // Don't toggle if editing
    setShowForm(!showForm)
  }}
  className="btn btn-primary"
  style={{ marginBottom: '1rem' }}
>
  {editingServiceId ? 'Editing...' : showForm ? 'Cancel' : 'Add New Service'}
</button>

{showForm && (
<form onSubmit={handleAddOrEditService} className="service-form">
  <input
    type="text"
    name="title"
    placeholder="Service title"
    value={newService.title}
    onChange={handleInputChange}
    required
  />
  <textarea
    name="description"
    placeholder="Service description"
    value={newService.description}
    onChange={handleInputChange}
  />
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={newService.price ?? ''}
    onChange={handleInputChange}
  />
  <div className="button-group">
    <button type="submit" className="btn btn-primary">
      {editingServiceId ? 'Update' : 'Add'} Service
    </button>
    {editingServiceId && (
      <button
        type="button"
        onClick={() => {
          setEditingServiceId(null)
          setNewService({ id: '', title: '', description: '', price: undefined })
          setShowForm(false)
        }}
        className="btn btn-secondary"
      >
        Cancel
      </button>
    )}
  </div>
</form>
)}
</section>


  )
}
