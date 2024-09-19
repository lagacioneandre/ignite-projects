import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { makeQuestion } from 'test/factories/make-question';
import { FetchRecentQuestionsCase } from './fetch-recent-questions';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryRepository: InMemoryQuestionRepository;
let useCase: FetchRecentQuestionsCase;

describe('Fetch recent questions', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        useCase = new FetchRecentQuestionsCase(inMemoryRepository);
    });

    test('should be able to fetch recent questions', async () => {
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date('2022, 0, 20') })
        );
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date('2022, 0, 18') })
        );
        await inMemoryRepository.create(
            makeQuestion({ createdAt: new Date('2022, 0, 23') })
        );
        const response = await useCase.execute({ page: 1 });
        expect(response.value).toEqual([
            expect.objectContaining({ createdAt: new Date('2022, 0, 23') }),
            expect.objectContaining({ createdAt: new Date('2022, 0, 20') }),
            expect.objectContaining({ createdAt: new Date('2022, 0, 18') }),
        ]);
    });

    test('should be able to fetch paginated recent questions', async () => {
        for (let i = 0; i <= 22; i++) {
            await inMemoryRepository.create(makeQuestion());
        }
        const response = await useCase.execute({ page: 2 });
        expect(response.value).toHaveLength(2);
    });
});
