import request from 'supertest';
import app from '.././src/app';
import dotenv from 'dotenv';
import config from '../src/config';

dotenv.config();

const appointmentRouteTest = () => {
    it('Should return a Success Response with 200 status and result attributes',async () => {
  
        const response = await request(app).get(`/api/v1/appointments/4?date=2023-06-18`);
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "data": [
                {
                    "id": 16,
                    "datetime": "2023-06-18T11:00:00.000Z",
                    "therapistId": 4,
                    "isBooked": false,
                    "isAvailable": true
                },
                {
                    "id": 17,
                    "datetime": "2023-06-18T12:00:00.000Z",
                    "therapistId": 4,
                    "isBooked": false,
                    "isAvailable": true
                },
                {
                    "id": 18,
                    "datetime": "2023-06-18T13:00:00.000Z",
                    "therapistId": 4,
                    "isBooked": false,
                    "isAvailable": true
                },
                {
                    "id": 19,
                    "datetime": "2023-06-18T14:00:00.000Z",
                    "therapistId": 4,
                    "isBooked": false,
                    "isAvailable": true
                },
                {
                    "id": 20,
                    "datetime": "2023-06-18T15:00:00.000Z",
                    "therapistId": 4,
                    "isBooked": false,
                    "isAvailable": true
                }
            ],
            "message": "appointment successfully retrieved"
        });
      })
    
      it('Should return a FAIL Response with 200 status and result attributes',async () => {
        const response = await request(app).get(`/api/v1/appointments/4?date=2023-06-17`);
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "data": [],
            "message": "sorry but no appointments found"
      });
      })
    it('Should return This appointment is booked with status 400', async () => {
        const id = 6;
        const token = config.TOKEN_TEST_THERAPIST;

        const response = await request(app)
            .put(`/api/v1/appointments/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'this appointment is booked'
        });
    });
    it('Should return Availability Successfully updated with status 200', async () => {
        const id = '9';
        const token = config.TOKEN_TEST_THERAPIST;

        const response = await request(app)
            .put(`/api/v1/appointments/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            data: null,
            message: 'Availability Successfully updated'
        });
    });
    it('Should return  Unauthorized if Therapist doesn’t own the appointment  and return  status 401', async () => {
        const id = '11';
        const token = config.TOKEN_TEST_THERAPIST;

        const response = await request(app)
            .put(`/api/v1/appointments/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            message: 'Unauthorized'
        });
    });
}

export default appointmentRouteTest