import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'Andre',
            email: 'email@mail.com',
            password: '123456'
        });
        expect(response.statusCode).toEqual(201);
    });
});
