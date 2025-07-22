import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Booking {
  id: number | string
  name: string
  email: string
  phone: string
  address: string
  service?: string
  requestedDateTime?: Date | null
}

interface Props {
  bookings: Booking[]
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
  token: string | null
}

export default function BookingsTable({ bookings, setBookings, token }: Props) {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newBooking, setNewBooking] = useState<Booking>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    requestedDateTime: new Date(),
  })

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    const res = await fetch(`https://laryscleaningservices.org/api/booking-requests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id))
    } else {
      alert('Failed to delete booking')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBooking) return

    const res = await fetch(`https://laryscleaningservices.org/api/booking-requests/${editingBooking.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name: editingBooking.name,
          email: editingBooking.email,
          phone: editingBooking.phone,
          address: editingBooking.address,
          service: editingBooking.service,
          requestedDateTime: editingBooking.requestedDateTime?.toISOString() || null,
        },
      }),
    })

    if (res.ok) {
      const updatedData = await res.json()
      const updatedBooking = {
        id: updatedData.data.id,
        ...updatedData.data.attributes,
        requestedDateTime: new Date(updatedData.data.attributes.requestedDateTime),
      }
      setBookings((prev) => prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)))
      setEditingBooking(null)
    } else {
      alert('Failed to update booking')
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`https://laryscleaningservices.org/api/booking-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          name: newBooking.name,
          email: newBooking.email,
          phone: newBooking.phone,
          address: newBooking.address,
          service: newBooking.service,
          requestedDateTime: newBooking.requestedDateTime?.toISOString() || null,
        },
      }),
    })

    if (res.ok) {
      const created = await res.json()
      const newEntry = {
        id: created.data.id,
        ...created.data.attributes,
        requestedDateTime: new Date(created.data.attributes.requestedDateTime),
      }
      setBookings((prev) => [...prev, newEntry])
      alert('Booking added!')
      setNewBooking({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        requestedDateTime: new Date(),
      })
      setShowForm(false)
    } else {
      alert('Failed to add booking')
    }
  }

  return (
    <section className="bookings-table">
      <h3>Booking Requests</h3>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Service</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.address}</td>
                  <td>{b.service || '-'}</td>
                  <td>{b.requestedDateTime ? new Date(b.requestedDateTime).toLocaleString() : '-'}</td>
                  <td className="button-group">
                    <button onClick={() => setEditingBooking(b)} className="btn btn-primary">Edit</button>
                    <button onClick={() => handleDelete(b.id)} className="btn btn-primary">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => {
              setEditingBooking(null)
              setShowForm(!showForm)
            }}
            className="btn btn-primary"
            style={{ marginBottom: '1rem' }}
          >
            {showForm ? 'Cancel' : 'Add New Booking'}
          </button>

          {showForm && (
            <div className="new-booking-form">
              <h3>Add New Booking</h3>
              <form onSubmit={handleCreate}>
                <input type="text" placeholder="Name" value={newBooking.name} onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={newBooking.email} onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })} required />
                <input type="text" placeholder="Phone" value={newBooking.phone} onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })} required />
                <input type="text" placeholder="Address" value={newBooking.address} onChange={(e) => setNewBooking({ ...newBooking, address: e.target.value })} required />
                <input type="text" placeholder="Service" value={newBooking.service} onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })} />
                <DatePicker
                  selected={newBooking.requestedDateTime ?? undefined}
                  onChange={(date) => setNewBooking({ ...newBooking, requestedDateTime: date })}
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  timeIntervals={30}
                  className="form-input"
                />
                <button type="submit" className="btn btn-primary">Submit Booking</button>
              </form>
            </div>
          )}

          {editingBooking && (
            <div className="edit-booking-form">
              <h3>Edit Booking</h3>
              <form onSubmit={handleUpdate}>
                <input type="text" value={editingBooking.name} onChange={(e) => setEditingBooking({ ...editingBooking, name: e.target.value })} placeholder="Name" />
                <input type="email" value={editingBooking.email} onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })} placeholder="Email" />
                <input type="text" value={editingBooking.phone} onChange={(e) => setEditingBooking({ ...editingBooking, phone: e.target.value })} placeholder="Phone" />
                <input type="text" value={editingBooking.address} onChange={(e) => setEditingBooking({ ...editingBooking, address: e.target.value })} placeholder="Address" />
                <input type="text" value={editingBooking.service || ''} onChange={(e) => setEditingBooking({ ...editingBooking, service: e.target.value })} placeholder="Service" />
                <DatePicker
                  selected={editingBooking.requestedDateTime ?? undefined}
                  onChange={(date) => setEditingBooking({ ...editingBooking, requestedDateTime: date })}
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  timeIntervals={30}
                  className="form-input"
                />
                <div className="button-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" onClick={() => setEditingBooking(null)} className="btn btn-secondary">Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
