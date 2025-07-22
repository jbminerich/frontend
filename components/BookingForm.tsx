'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

type Service = {
  id: number;
  documentId?: string;
  Title: string;
  Description?: string;
  Price?: string | null;
};



export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '' as string | number,
    requestedDateTime: new Date(),
  });
  
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://laryscleaningservices.org/api/services');
        setServices(res.data.data); // Use raw response, it's already flat
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      const formatted =
        digits.length >= 7
          ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
          : digits.length >= 4
          ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
          : digits;
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      // Ensure that the serviceType is always a number
      setFormData(prev => ({
        ...prev,
        [name]: name === 'serviceType' ? parseInt(value, 10) : value,  // Parse serviceType as a number
      }));
    }
  };  

  function getLocalDateTimeString() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure the serviceType is a valid number (ID)
    const payload = {
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        service: formData.serviceType,  // Correctly sending the ID of the service
        requestedDateTime: new Date(formData.requestedDateTime).toISOString(),
        bookingStatus: 'Pending', // Default status
      },
    };
  
    try {
      const res = await axios.post('https://laryscleaningservices.org/api/booking-requests', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      console.log('Booking response:', res.status, res.data);
    
      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          serviceType: '',
          requestedDateTime: new Date(),
        });
      } else {
        console.error('Unexpected status code:', res.status);
        alert('There was an error submitting your request.');
      }
    } catch (error) {
      console.error('Error submitting booking request:', error);
      alert('There was an error submitting your request.');
    }
    
  };
  
  return (
    <section id="booking" className="container" style={{ padding: '3rem 0' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Book a Cleaning</h3>
      {success && <p className="success-message">Request submitted! We&apos;ll be in touch shortly.</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', display: 'grid', gap: '1rem' }}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="form-input"
        />
        
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select a Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.Title}
            </option>
          ))}
        </select>


        <label className="form-label">Select Date & Time</label>
        <DatePicker
          selected={formData.requestedDateTime ?? undefined}
          onChange={(date: Date | null) => {
            if (date) {
              setFormData({ ...formData, requestedDateTime: date });
            }
          }}
          showTimeSelect
          dateFormat="Pp"
          minDate={new Date()}
          minTime={new Date(new Date().setHours(7, 0, 0, 0))}
          maxTime={new Date(new Date().setHours(20, 0, 0, 0))}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </section>
  );
}
