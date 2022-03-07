import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test responses from endpoints', (): void => {
  
    it('gets /api', async (): Promise<void> => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=fjord&width=100&height=100 is exist (passed)', async (): Promise<void> => {
      const response= await request.get('/api/images?filename=fjord&width=100&height=100');
      expect(response.status).toBe(200);
    });

    it('Negative value is invalid', async (): Promise<void> => {
      const response= await request.get('/api/images?filename=fjord&width=-100&height=-100');
      expect(response.status).toBe(400);
    });

    it('Image parameter is missing', async (): Promise<void> => {
      const response= await request.get('/api/images?filename=&width=100&height=100');
      expect(response.status).toBe(400);
    });

    it('Width and height parameters are missing', async (): Promise<void> => {
      const response= await request.get('/api/images?filename=fjord&width=&height=');
      expect(response.status).toBe(400);
    });
  
});

