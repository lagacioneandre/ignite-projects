import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';
import { AnswerAttachmentRepository } from '../repositories/answer-attachment-repository';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface EditAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
    attachmentIds: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>;

export class EditAnswerUseCase {

    constructor (
        private answerRepository: AnswerRepository,
        private answerAttachmentRepository: AnswerAttachmentRepository
    ) {}

    async execute({ authorId, answerId, content, attachmentIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId);
        if (!answer) return left(new ResourceNotFoundError());
        if (authorId !== answer.authorId.toString()) return left(new NotAllowedError());
        const currentAnswerAttachment = await this.answerAttachmentRepository.findManyByAnswerId(answerId);
        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachment);
        const answerAttachments = attachmentIds.map(item => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(item),
                answerId: answer.id
            });
        });
        answerAttachmentList.update(answerAttachments);
        answer.attachments = answerAttachmentList;
        answer.content = content;
        await this.answerRepository.save(answer);
        return right({ answer });
    }
}