import { Talent, BlogPost, Message } from './definitions';

export const talents: Talent[] = [];

export const blogPosts: BlogPost[] = [];

export const messages: Message[] = [
  {
    id: 'msg001',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Booking Inquiry for Patricia Wambui',
    message: 'We’d like to feature Patricia in our upcoming ad campaign for a new line of sustainable products. Please let us know her availability and rates.',
    createdAt: '2025-11-10T10:00:00Z',
    read: false,
  },
  {
    id: 'msg002',
    name: 'BrandCorp',
    email: 'contact@brandcorp.com',
    subject: 'Collaboration with David Ochieng',
    message: 'We are launching a new creative space in downtown Nairobi and would love for David Ochieng to create a mural. His style is a perfect fit for our brand. We would be honored to work with him.',
    createdAt: '2025-11-09T15:30:00Z',
    read: false,
  },
  {
    id: 'msg003',
    name: 'Fan Mail',
    email: 'fan@gmail.com',
    subject: 'Message for Aisha Khan',
    message: 'Aisha is such an inspiration! Her work and advocacy are changing the game. Thank you for representing such amazing talent.',
    createdAt: '2025-11-08T12:00:00Z',
    read: true,
  },
];
