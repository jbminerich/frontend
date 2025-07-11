'use client';

import { useEffect, useState } from 'react';

type Service = {
  id: string;
  title: string;
};

export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    requestedDateTime: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('http://192.168.254.156:3000/api/services');
      const json = await res.json();
      setServices(json.docs);
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
      setFormData(prev => ({ ...prev, [name]: value }));
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
    const payload = {
        ...formData,
        requestedDateTime: formData.requestedDateTime, // don't convert to Date object
      };
    const res = await fetch('http://192.168.254.156:3000/api/bookingRequests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        serviceType: '',
        requestedDateTime: '',
      });
    } else {
      alert('There was an error submitting your request.');
    }
  };

  return (
    <section id="booking" className="container" style={{ padding: '3rem 0' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Book a Cleaning</h3>
      {success && <p style={{ color: 'green' }}>Request submitted! We'll be in touch shortly.</p>}

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
            <option key={service.id} value={service.id}>{service.title}</option>
          ))}
        </select>
        <input
          name="requestedDateTime"
          type="datetime-local"
          value={formData.requestedDateTime}
          onChange={handleChange}
          min={getLocalDateTimeString()}
          required
          className="form-input"
        />
        <button
          type="submit"
          className="submit-button"
        >
          Submit Request
        </button>
      </form>
    </section>
  );
}
