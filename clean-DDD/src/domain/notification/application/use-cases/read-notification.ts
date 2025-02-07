import { Either, left, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';

export interface ReadNotificationUseCaseRequest {
    recipientId: string;
    notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { notification: Notification }>;

export class ReadNotificationUseCase {

    constructor (
        private notificationRepository: NotificationRepository
    ) {}

    async execute({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) return left(new ResourceNotFoundError());
        if (recipientId !== notification.recipientId.toString()) return left(new NotAllowedError());
        notification.read();
        await this.notificationRepository.save(notification);
        return right({ notification });
    }
}