import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryRepository: InMemoryQuestionRepository;
let useCase: GetQuestionBySlugUseCase;

describe('Get question by slug', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        useCase = new GetQuestionBySlugUseCase(inMemoryRepository);
    });

    test('should be able to get a question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question'),
        });
        inMemoryRepository.create(newQuestion);
        const response = await useCase.execute({
            slug: 'example-question'
        });
    
        expect(response.value?.question.id).toBeTruthy();
    });
});
