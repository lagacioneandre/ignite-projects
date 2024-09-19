import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';
import { Either, right } from '@/core/either';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';

interface AnswerQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
    attachmentIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {

    constructor (
        private answersRepository: AnswerRepository
    ) {}

    async execute({ authorId, questionId, content, attachmentIds }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
        });
        const answerAttachments = attachmentIds.map(item => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(item),
                answerId: answer.id,
            });
        });
        answer.attachments = new AnswerAttachmentList(answerAttachments);
        await this.answersRepository.create(answer);
        return right({ answer });
        
    }
}