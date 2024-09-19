import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: EditAnswerUseCase;

describe('Edit answer', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new EditAnswerUseCase(inMemoryRepository, inMemoryAnswerAttachmentRepository);
    });

    test('should be able to edit a answer by id', async () => {
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
            answerId: newAnswer.id.toValue(),
            authorId: 'author-1',
            content: 'Conteudo teste',
            attachmentIds: ['1', '3'],
        });
    
        expect(inMemoryRepository.items[0]).toMatchObject({
            title: 'Pergunta teste',
            content: 'Conteudo teste',
        });
        expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(2);
        expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
        ]);
    });
    
    test('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'));
        inMemoryRepository.create(newAnswer);
        const result = await useCase.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-2',
            content: 'Conteudo teste',
            attachmentIds: [],
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
