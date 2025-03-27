/* eslint-disable @typescript-eslint/no-unused-vars */

const Users = [
  {
    fullName: 'Emma Johnson',
    email: 'emma.j@example.com',
    password: '$2a$12$5B6z7X8YlKJhGfDdSsTuu.9QrR1sP2LmN3O4I5U6V7W8x9y0ZzA1',
    phoneNumber: '+15551234567',
    role: 'user',
    isActive: true,
  },
  {
    fullName: 'Dr. Michael Chen',
    email: 'dr.chen@example.com',
    password: '$2a$12$5B6z7X8YlKJhGfDdSsTuu.9QrR1sP2LmN3O4I5U6V7W8x9y0ZzA1',
    phoneNumber: '+15559876543',
    role: 'therapist',
    isActive: true,
  },
  {
    fullName: 'Sophia Rodriguez',
    email: 'sophia.r@example.com',
    password: '$2a$12$5B6z7X8YlKJhGfDdSsTuu.9QrR1sP2LmN3O4I5U6V7W8x9y0ZzA1',
    phoneNumber: '+15558765432',
    role: 'user',
    isActive: true,
  },
  {
    fullName: 'Dr. James Wilson',
    email: 'j.wilson@example.com',
    password: '$2a$12$5B6z7X8YlKJhGfDdSsTuu.9QrR1sP2LmN3O4I5U6V7W8x9y0ZzA1',
    phoneNumber: '+15557654321',
    role: 'therapist',
    isActive: false,
  },
  {
    fullName: 'Olivia Smith',
    email: 'olivia.s@example.com',
    password: '$2a$12$5B6z7X8YlKJhGfDdSsTuu.9QrR1sP2LmN3O4I5U6V7W8x9y0ZzA1',
    phoneNumber: '+15556543210',
    role: 'user',
    isActive: true,
  },
];

const Admins = [
  {
    username: 'admin',
    password: '$2a$12$X1Y2Z3A4B5C6D7E8F9G0H.IjK1L2M3N4O5P6Q7R8S9T0U1V2W3',
    role: 'admin',
  },
];

const Therapists = [
  {
    cvLink: 'https://example.com/cv/dr-chen',
    profileImg: 'https://example.com/images/therapists/dr-chen.jpg',
    major: 'Clinical Psychologist',
    bio: 'Specializing in cognitive behavioral therapy with 10+ years experience helping patients manage anxiety and depression.',
    hourlyRate: 120,
    userId: 2,
  },
  {
    cvLink: 'https://example.com/cv/dr-wilson',
    profileImg: 'https://example.com/images/therapists/dr-wilson.jpg',
    major: 'Marriage and Family Therapist',
    bio: 'Focused on relationship counseling and family systems therapy. EMDR certified practitioner.',
    hourlyRate: 95,
    userId: 4,
  },
];

const Appointments = [
  {
    therapistId: 1,
    datetime: new Date('2023-07-15T09:00:00.000Z'),
    isBooked: true,
    isAvailable: false,
  },
  {
    therapistId: 1,
    datetime: new Date('2023-07-15T10:30:00.000Z'),
    isBooked: false,
    isAvailable: true,
  },
  {
    therapistId: 1,
    datetime: new Date('2023-07-15T13:00:00.000Z'),
    isBooked: false,
    isAvailable: true,
  },
  {
    therapistId: 2,
    datetime: new Date('2023-07-16T11:00:00.000Z'),
    isBooked: true,
    isAvailable: false,
  },
  {
    therapistId: 2,
    datetime: new Date('2023-07-16T14:00:00.000Z'),
    isBooked: false,
    isAvailable: true,
  },
];

const Sessions = [
  {
    appointmentId: 1,
    userId: 1,
    notes: 'Initial consultation - discussed anxiety management techniques',
  },
  {
    appointmentId: 4,
    userId: 3,
    notes: 'Couples therapy session - communication strategies',
  },
];

const Bugs = [
  {
    title: 'Calendar timezone issue',
    description: 'Appointment times display in UTC instead of local timezone',
    priority: 'high',
    status: 'in progress',
    assignedTo: 'dev-team',
  },
  {
    title: 'Profile image upload fails',
    description: 'Error when uploading images >2MB',
    priority: 'medium',
    status: 'new',
    assignedTo: 'unassigned',
  },
  {
    title: 'Mobile menu not closing',
    description: 'Navigation menu remains open after selection on mobile',
    priority: 'low',
    status: 'new',
    assignedTo: 'unassigned',
  },
];

export {
  Users, Therapists, Appointments, Sessions, Admins,
  Bugs,
};
