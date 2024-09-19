import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(userRepository);
    });

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Andre',
            email: 'email@mail.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Andre',
            email: 'email@mail.com',
            password: '123456'
        });

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be abel to register with same email twice', async () => {
        const email = 'email@mail.com';

        await sut.execute({
            name: 'Andre',
            email,
            password: '123456'
        });

        await expect(() => 
            sut.execute({
                name: 'Andre',
                email,
                password: '123456'
            }) 
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
