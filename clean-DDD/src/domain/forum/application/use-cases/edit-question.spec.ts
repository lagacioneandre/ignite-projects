import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryRepository: InMemoryQuestionRepository;
let useCase: EditQuestionUseCase;

describe('Edit question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        useCase = new EditQuestionUseCase(inMemoryRepository, inMemoryQuestionAttachmentRepository);
    });

    test('should be able to edit a question by id', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'));
        await inMemoryRepository.create(newQuestion);
        inMemoryQuestionAttachmentRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('1')
            }),
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('2')
            })
        );
        await useCase.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-1',
            title: 'Pergunta teste',
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
    
    test('should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'));
        inMemoryRepository.create(newQuestion);
        const result = await useCase.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-2',
            title: 'Pergunta teste',
            content: 'Conteudo teste',
            attachmentIds: [],
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
