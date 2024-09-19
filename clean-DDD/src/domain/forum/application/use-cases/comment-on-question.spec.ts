import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryRepository: InMemoryQuestionRepository;
let useCase: CommentOnQuestionUseCase;

describe('Comment on question', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        useCase = new CommentOnQuestionUseCase(inMemoryRepository, inMemoryQuestionCommentsRepository);
    });

    test('should be able to comment on question', async () => {
        const question = makeQuestion();
        await inMemoryRepository.create(question);
        await useCase.execute({
            authorId: question.authorId.toString(),
            questionId: question.id.toString(),
            content: 'Comentario teste'
        });
    
        expect(inMemoryRepository.items[0].content).toEqual('Comentario teste');
    });
});
