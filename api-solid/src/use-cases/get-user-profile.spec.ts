import { beforeAll, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
    beforeAll(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Andre',
            email: 'email@mail.com',
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('Andre');
    });

    it('should not be able to get user profile with wrong id', async () => {
        expect(() => {
            sut.execute({
                userId: 'non-existing-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
