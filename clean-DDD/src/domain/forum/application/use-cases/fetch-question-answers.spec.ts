import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { FetchQuestionAnswersCase } from './fetch-question-answers';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: FetchQuestionAnswersCase;

describe('Fetch question answers', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new FetchQuestionAnswersCase(inMemoryRepository);
    });

    test('should be able to fetch question answers', async () => {
        await inMemoryRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
        await inMemoryRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
        await inMemoryRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
        const response = await useCase.execute({
            questionId: 'question-1',
            page: 1,
        });
        expect(response).toHaveLength(3);
    });

    test('should be able to fetch paginated question answers', async () => {
        for (let i = 0; i <= 22; i++) {
            await inMemoryRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
        }
        const response = await useCase.execute({
            questionId: 'question-1',
            page: 2,
        });
        expect(response).toHaveLength(2);
    });
});
