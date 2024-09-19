import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';

let inMemoryRepository: InMemoryAnswerCommentsRepository;
let useCase: FetchAnswerCommentsCase;

describe('Fetch answer comment', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswerCommentsRepository();
        useCase = new FetchAnswerCommentsCase(inMemoryRepository);
    });

    test('should be able to fetch answer comment', async () => {
        await inMemoryRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }));
        await inMemoryRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }));
        await inMemoryRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }));
        const response = await useCase.execute({
            answerId: 'answer-1',
            page: 1,
        });
        expect(response).toHaveLength(3);
    });

    test('should be able to fetch paginated answer comment', async () => {
        for (let i = 0; i <= 22; i++) {
            await inMemoryRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }));
        }
        const response = await useCase.execute({
            answerId: 'answer-1',
            page: 2,
        });
        expect(response).toHaveLength(2);
    });
});
