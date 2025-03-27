import request from 'supertest';
import app from '.././src/app';
import config from '../src/config';

const therapistTest = () => {
    it('should return therapist information when valid ID is provided', async () => {
        const id = '3';
        const response = await request(app).get(`/api/v1/therapists/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.data.userId).toBe(6);
    });


    it('should return 404 when invalid ID is provided', async () => {
        const id = '40';
        const response = await request(app).get(`/api/v1/therapists/${id}`);
        expect(response.status).toBe(404);
    });

    it('check if therapist is not Active return 404 not found ',async () => {
        const id = '1';
        const response = await request(app).get(`/api/v1/therapists/${id}`);
        expect(response.status).toBe(404);
    });

    it('should return  list of therapists  on the query ', async () => {
        const response = await request(app).get('/api/v1/therapists').query({ q: 'Al', page: 1,minPrice:'10',maxPrice:'20' });
        expect(response.status).toBe(200);
    });
    it('should return  list of the first 8  therapists  on the query ', async () => {
        const response = await request(app).get('/api/v1/therapists').query({ q: '', page: 1, minPrice: '10', maxPrice: '30' });
        expect(response.status).toBe(200);
    });
    it('should return Page number should be a valid number ', async () => {
        const response = await request(app).get('/api/v1/therapists').query({ q: '', page: "M", minPrice: '10', maxPrice: '30' });
        expect(response.status).toBe(400);
    });
    
    it('Should return Successful when the user is a therapist with no records updated', async () => {
        const token = config.TOKEN_TEST_THERAPIST;
        const response = await request(app)
        .patch(`/api/v1/therapists`)
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "data": null,
            "message": "No Records Updated"
        })
    })
    
}

export default therapistTest;


