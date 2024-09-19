import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: DeleteAnswerUseCase;

describe('Delete answer', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new DeleteAnswerUseCase(inMemoryRepository);
    });

    test('should be able to delete a answer by id', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'));
        await inMemoryRepository.create(newAnswer);

        inMemoryAnswerAttachmentRepository.items.push(
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('1')
            }),
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('2')
            })
        );

        await useCase.execute({
            answerId: 'answer-1',
            authorId: 'author-1',
        });
    
        expect(inMemoryRepository.items).toHaveLength(0);
        expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(0);
    });
    
    test('should not be able to delete a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'));
        inMemoryRepository.create(newAnswer);
        const result = await useCase.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
