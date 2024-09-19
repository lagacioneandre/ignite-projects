import { beforeAll, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
    beforeAll(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to register', async () => {
        await usersRepository.create({
            name: 'Andre',
            email: 'email@mail.com',
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            email: 'email@mail.com',
            password: '123456',
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => {
        expect(() => {
            sut.execute({
                email: 'email@mail.com',
                password: '123456',
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'Andre',
            email: 'email@mail.com',
            password_hash: await hash('123456', 6),
        });

        await expect(() => {
            sut.execute({
                email: 'email@mail.com',
                password: '123123',
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
