import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    private items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        };
        this.items.push(checkIn);
        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');
        const checkInOnSameDate = this.items.find(item => {
            const checkInDate = dayjs(item.created_at);
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
            return item.user_id === userId && isOnSameDate;
        });
        return checkInOnSameDate || null;
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.items
            .filter(item => item.user_id === userId)
            .slice((page -1) * 20, page * 20);
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items
            .filter(item => item.user_id === userId)
            .length;
    }

    async findById(id: string): Promise<CheckIn | null> {
        const checkIn = this.items.find(item => item.id === id);
        return checkIn ?? null;
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id);
        if (checkInIndex > -1) this.items[checkInIndex] = checkIn;
        return checkIn;
    }
}
