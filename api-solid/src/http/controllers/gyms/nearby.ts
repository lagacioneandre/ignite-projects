import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        latitude: z.number(),
        longitude: z.number(),
    });
    const { latitude, longitude } = bodySchema.parse(request.body);
    const useCase = makeFetchNearbyGymsUseCase();
    const { gyms } = await useCase.execute({ 
        userLatitude: latitude,
        userLongitude: longitude,
     });
    return reply.status(200).send({ gyms });
}
