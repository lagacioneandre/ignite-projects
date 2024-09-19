import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryRepository: InMemoryQuestionCommentsRepository;
let useCase: DeleteQuestionCommentUseCase;

describe('Delete comment question', () => {
    beforeEach(() => {
        inMemoryRepository = new InMemoryQuestionCommentsRepository();
        useCase = new DeleteQuestionCommentUseCase(inMemoryRepository);
    });

    test('should be able to delete a question comment', async () => {
        const questionComment = makeQuestionComment();
        await inMemoryRepository.create(questionComment);
        await useCase.execute({
            authorId: questionComment.authorId.toString(),
            questionCommentId: questionComment.id.toString(),
        });
    
        expect(inMemoryRepository.items).toHaveLength(0);
    });
    
    test('should not be able to delete a question comment from another user', async () => {
        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityId('author-1')
        });
        inMemoryRepository.create(questionComment);
        const result = await useCase.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: 'author-2',
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
