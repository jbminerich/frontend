'use client';

import { useEffect, useState } from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  price?: number;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('http://192.168.254.156:3000/api/services');
      const json = await res.json();
      setServices(json.docs);
    };

    fetchServices();
  }, []);

  const toggle = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="container" style={{ padding: '2rem 0' }}>
      <h3>Our Services</h3>
      {services.length === 0 && <p>No services available at the moment.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        
      {services.map((service, index) => (
  <li
    key={service.id}
    style={{
      marginBottom: '1.5rem',
      animation: `fadeInUp 0.5s ease-out ${index * 0.1 + 0.2}s both`,
    }}
  >
    <button
  onClick={() => toggle(service.id)}
  className="service-button"
>
  {service.title}
</button>

    {activeId === service.id && (
      <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #ccc' }}>
        <p>{service.description}</p>
        {service.price && <p><strong>Price:</strong> ${service.price}</p>}
      </div>
    )}
  </li>
))}
      </ul>
    </section>
  );
}
