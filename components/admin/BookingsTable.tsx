// components/admin/BookingsTable.tsx
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface Booking {
  id: string
  name: string
  email: string
  phone: string
  address: string
  serviceType?: { title: string }
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
  serviceType: { title: '' },
  requestedDateTime: new Date(),
})


  function toLocalDatetimeInputString(isoString: string) {
    const dt = new Date(isoString)
    const offset = dt.getTimezoneOffset()
    const local = new Date(dt.getTime() - offset * 60 * 1000)
    return local.toISOString().slice(0, 16)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return

    const res = await fetch(`http://192.168.254.156:3000/api/bookingRequests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `JWT ${token}` },
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

    const res = await fetch(`http://192.168.254.156:3000/api/bookingRequests/${editingBooking.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        ...editingBooking,
        requestedDateTime: editingBooking.requestedDateTime?.toISOString() ?? new Date().toISOString(),

      }),
    })

    if (res.ok) {
      alert('Booking updated!')
      const updated: Booking = {
        ...editingBooking,
        // store it as a Date (not string), since your UI uses Date objects
        requestedDateTime: new Date(editingBooking.requestedDateTime!),
      }
      

      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      setEditingBooking(null)
    } else {
      alert('Failed to update booking')
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
                  <td>{b.serviceType?.title || '-'}</td>
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
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await fetch(`http://192.168.254.156:3000/api/bookingRequests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            ...newBooking,
            requestedDateTime: new Date(newBooking.requestedDateTime!).toISOString(),
          }),
        })

        if (res.ok) {
          const created = await res.json()
          setBookings((prev) => [...prev, created.doc])
          alert('Booking added!')
          setNewBooking({
            id: '',
            name: '',
            email: '',
            phone: '',
            address: '',
            serviceType: { title: '' },
            requestedDateTime: null,
          })
          setShowForm(false)
        } else {
          alert('Failed to add booking')
        }
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={newBooking.name}
        onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={newBooking.email}
        onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={newBooking.phone}
        onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={newBooking.address}
        onChange={(e) => setNewBooking({ ...newBooking, address: e.target.value })}
        required
      />
      <DatePicker
  selected={newBooking.requestedDateTime ? new Date(newBooking.requestedDateTime) : null}
  onChange={(date: Date) => setNewBooking({ ...newBooking, requestedDateTime: date })}
  showTimeSelect
  dateFormat="Pp"
  minDate={new Date()}
  minTime={new Date(new Date().setHours(7, 0, 0, 0))}
  maxTime={new Date(new Date().setHours(20, 0, 0, 0))}

  timeIntervals={30}
  className="form-input"
/>

      {/* Optional: Add dropdown for serviceType if you want */}
      <button type="submit" className="btn btn-primary">
        Submit Booking
      </button>
    </form>
  </div>
)}

        </div>
      )}
  
      {editingBooking && (
        <div className="edit-booking-form">
          <h3>Edit Booking</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editingBooking.name}
              onChange={(e) => setEditingBooking({ ...editingBooking, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={editingBooking.email}
              onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              value={editingBooking.phone}
              onChange={(e) => setEditingBooking({ ...editingBooking, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              type="text"
              value={editingBooking.address}
              onChange={(e) => setEditingBooking({ ...editingBooking, address: e.target.value })}
              placeholder="Address"
            />
            <DatePicker
  selected={editingBooking.requestedDateTime ? new Date(editingBooking.requestedDateTime) : null}
  onChange={(date: Date) =>
    setEditingBooking({
      ...editingBooking!,
      requestedDateTime: date,
    })
  }
  showTimeSelect
  dateFormat="Pp"
  minDate={new Date()}
  minTime={new Date(new Date().setHours(7, 0, 0, 0))}
  maxTime={new Date(new Date().setHours(20, 0, 0, 0))}

  timeIntervals={30}
  className="form-input"
/>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save</button>
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
  
}
