import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: CommentOnAnswerUseCase;

describe('Comment on answer', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new CommentOnAnswerUseCase(inMemoryRepository, inMemoryAnswerCommentsRepository);
    });

    test('should be able to comment on answer', async () => {
        const answer = makeAnswer();
        await inMemoryRepository.create(answer);
        await useCase.execute({
            authorId: answer.authorId.toString(),
            answerId: answer.id.toString(),
            content: 'Comentario teste'
        });
    
        expect(inMemoryRepository.items[0].content).toEqual('Comentario teste');
    });
});
