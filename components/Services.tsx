'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

type Service = {
  id: string;
  documentId: string;
  Title: string;
  Description: string;
  Price: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch services from Strapi
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://laryscleaningservices.org/api/services');
        setServices(response.data.data || []);  // Safely handle response from Strapi
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Auto-cycle through services every 6 seconds
  useEffect(() => {
    if (!isAuto || services.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAuto, services]);

  // Update expanded service when index changes
  useEffect(() => {
    if (services.length > 0) {
      setActiveId(services[currentIndex]?.id);
    }
  }, [currentIndex, services]);

  // Manual toggle with pause
  const toggle = (id: string) => {
    setIsAuto(false); // Stop auto-cycle when user interacts
    setActiveId((prev) => (prev === id ? null : id));

    const manualIndex = services.findIndex((s) => s.id === id);
    if (manualIndex !== -1) {
      setCurrentIndex(manualIndex);
    }
  };

  // Convert service title to image filename
  const getImage = (title: string) => {
    const slug = (title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') : 'default-slug');
    return `/images/services/${slug}.jpg`; // Ensure the images are correctly named in the public directory
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
              marginBottom: '2rem',
              animation: `fadeInUp 0.5s ease-out ${index * 0.1 + 0.2}s both`,
            }}
          >
            <button onClick={() => toggle(service.id)} className="service-button">
              {service.Title}
            </button>

            {activeId === service.id && (
              <div
                style={{
                  marginTop: '1rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid #ccc',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: '1 1 300px' }}>
                  <p>{service.Description}</p>
                  {service.Price && (
                    <p>
                      <strong>Price:</strong> ${service.Price}
                    </p>
                  )}
                </div>
                <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                  <Image
                    src={getImage(service.Title)}
                    alt={service.Title || 'Default service image'}  // Fallback for alt text
                    width={300}
                    height={200}
                    style={{ borderRadius: '0.75rem', objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
