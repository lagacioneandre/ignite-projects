import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number(),
        longitude: z.number(),
    });
    const { title, description, phone, latitude, longitude } = bodySchema.parse(request.body);
    const useCase = makeCreateGymUseCase();
    await useCase.execute({ title, description, phone, latitude, longitude });
    return reply.status(201).send();
}
