import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { InMemoryGymsRepository } from './in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymRepository);
    });

    it('should be able to create a gym', async () => {
        const { gym } = await sut.execute({
            title: '',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
