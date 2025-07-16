export interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    serviceType?: { title: string };
    requestedDateTime?: Date | null;
  }
  