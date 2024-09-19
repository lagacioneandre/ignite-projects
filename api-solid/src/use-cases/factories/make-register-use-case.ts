import { PrismaUsersRespository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRespository();
    const useCase = new RegisterUseCase(prismaUsersRepository);
    return useCase;
}
