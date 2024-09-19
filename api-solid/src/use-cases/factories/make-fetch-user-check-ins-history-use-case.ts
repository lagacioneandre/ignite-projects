import { FetchMemberCheckInsHistoryUseCase } from "../fetch-member-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const useCase = new FetchMemberCheckInsHistoryUseCase(prismaCheckInsRepository);
    return useCase;
}
