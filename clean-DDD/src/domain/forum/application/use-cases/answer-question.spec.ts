import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: AnswerQuestionUseCase;

describe('Create answer', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new AnswerQuestionUseCase(inMemoryRepository);
    });

    test('should be able to create an answer', async () => {
        const response = await useCase.execute({
            questionId: '1',
            authorId: '1',
            content: 'Nova resposta',
            attachmentIds: ['1', '2'],
        });
    
        expect(response.isRight).toBeTruthy();
        expect(inMemoryRepository.items[0]).toEqual(response.value?.answer);
        expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(2);
        expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
        ]);
    });
});
