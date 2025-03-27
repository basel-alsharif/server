import request from 'supertest';
import app from '.././src/app';
import connection from '../src/db/connection'
import buildb from '../src/db/build';
import appointmentRouteTest from './appointment';
import therapistTest from './therapists';



beforeAll(buildb);
afterAll(() => connection.close())
describe('Therapist Route', therapistTest);
describe('Appointment Route', appointmentRouteTest)
