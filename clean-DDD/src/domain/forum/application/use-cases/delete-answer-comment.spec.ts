import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryRepository: InMemoryAnswerCommentsRepository;
let useCase: DeleteAnswerCommentUseCase;

describe('Delete comment answer', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswerCommentsRepository();
        useCase = new DeleteAnswerCommentUseCase(inMemoryRepository);
    });

    test('should be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment();
        await inMemoryRepository.create(answerComment);
        await useCase.execute({
            authorId: answerComment.authorId.toString(),
            answerCommentId: answerComment.id.toString(),
        });
    
        expect(inMemoryRepository.items).toHaveLength(0);
    });
    
    test('should not be able to delete a answer comment from another user', async () => {
        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityId('author-1')
        });
        inMemoryRepository.create(answerComment);
        const result = await useCase.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: 'author-2',
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
