import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsCase } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';

let inMemoryRepository: InMemoryQuestionCommentsRepository;
let useCase: FetchQuestionCommentsCase;

describe('Fetch question comment', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionCommentsRepository();
        useCase = new FetchQuestionCommentsCase(inMemoryRepository);
    });

    test('should be able to fetch question comment', async () => {
        await inMemoryRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
        await inMemoryRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
        await inMemoryRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
        const response = await useCase.execute({
            questionId: 'question-1',
            page: 1,
        });
        expect(response).toHaveLength(3);
    });

    test('should be able to fetch paginated question comment', async () => {
        for (let i = 0; i <= 22; i++) {
            await inMemoryRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
        }
        const response = await useCase.execute({
            questionId: 'question-1',
            page: 2,
        });
        expect(response).toHaveLength(2);
    });
});
