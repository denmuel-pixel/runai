export interface RaceCategory {
  id: string;
  name: string;
  distance: string;
  tagline: string;
  price: string;
  color: string; // Hex or tailwind class
  glowColor: string;
  startTime: string;
  elevation: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface Checkpoint {
  id: number;
  name: string;
  km: number;
  description: string;
  x: number; // SVG coordinate percentage
  y: number; // SVG coordinate percentage
}

export interface TimelineItem {
  time: string;
  title: string;
  category: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  category: string; // '3k' | '5k'
  tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  ticketId: string;
  qrCodeValue: string;
  registrationDate: string;
}
