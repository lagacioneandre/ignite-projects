import { PrismaUsersRespository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
    const prismaUsersRepository = new PrismaUsersRespository();
    const useCase = new GetUserProfileUseCase(prismaUsersRepository);
    return useCase;
}
