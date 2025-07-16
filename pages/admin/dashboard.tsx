import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BookingsTable from '@/components/admin/BookingsTable'
import ServiceManager from '@/components/admin/ServiceManager'
import Link from 'next/link'
import { Booking } from '@/types/Booking';

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [error, setError] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('payload-token') : null

  useEffect(() => {
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetch('http://192.168.254.156:3000/api/bookingRequests?depth=1', {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings')
        return res.json()
      })
      .then((data) => {
        const formatted = data.docs.map((b: any) => ({
          ...b,
          requestedDateTime: b.requestedDateTime ? new Date(b.requestedDateTime) : null,
        }));
        setBookings(formatted);
      });      
  }, [token])

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('payload_token')
            router.push('/admin/login')
          }}
        >
          Log Out
        </button>
        <Link href="/admin/clients" className="btn btn-secondary">
  Manage Clients
</Link>
      </div>
      <hr className="section-divider" />
      <BookingsTable bookings={bookings as any} setBookings={setBookings} token={token} />
      <hr className="section-divider" />
      <ServiceManager token={token} />

      {error && <p className="error">{error}</p>}
    </div>
  )
}
