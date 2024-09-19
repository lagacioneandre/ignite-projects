import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from './in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from './in-memory/in-memory-gyms-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new GetUserMetricsUseCase(checkInRepository);
        vi.useFakeTimers();
    });

    it('should be able to get check-ins count from metrics', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });
        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });
        const { checkInsCount } = await sut.execute({ userId: 'user-01' });
        expect(checkInsCount).toHaveLength(2);
    });
});
