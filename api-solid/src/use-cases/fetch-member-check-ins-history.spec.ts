import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from './in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from './in-memory/in-memory-gyms-repository';
import { FetchMemberCheckInsHistoryUseCase } from './fetch-member-check-ins-history';

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: FetchMemberCheckInsHistoryUseCase;

describe('Fetch User Check-in History Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchMemberCheckInsHistoryUseCase(checkInRepository);
        vi.useFakeTimers();
    });

    it('should be able to check in', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });
        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });
        const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 });
        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gum-01' }),
            expect.objectContaining({ gym_id: 'gum-02' }),
        ])
    });

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01',
            });
        }
        
        const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 });
        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gum-21' }),
            expect.objectContaining({ gym_id: 'gum-22' }),
        ])
    });
});
