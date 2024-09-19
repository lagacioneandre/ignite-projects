import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const checkInParams = z.object({
        gymId: z.string().uuid(),
    });
    const bodySchema = z.object({
        latitude: z.number(),
        longitude: z.number(),
    });
    const { gymId } = checkInParams.parse(request.params);
    const { latitude, longitude } = bodySchema.parse(request.body);
    const useCase = makeCheckInUseCase();
    await useCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude,
    });
    return reply.status(201).send();
}
