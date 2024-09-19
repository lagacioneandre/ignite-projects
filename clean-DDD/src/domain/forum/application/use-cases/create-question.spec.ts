import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryRepository: InMemoryQuestionRepository;
let useCase: CreateQuestionUseCase;

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        useCase = new CreateQuestionUseCase(inMemoryRepository);
    });

    test('should be able to create an answer', async () => {
        const response = await useCase.execute({
            authorId: '1',
            title: 'Nova pergunta',
            content: 'Nova pergunta',
            attachmentIds: ['1', '2'],
        });
    
        expect(response.isRight).toBeTruthy();
        expect(inMemoryRepository.items[0]).toEqual(response.value?.question);
        expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(2);
        expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
        ]);
    });
});
