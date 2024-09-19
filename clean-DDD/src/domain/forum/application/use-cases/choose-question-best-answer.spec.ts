import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryRepository: InMemoryAnswerRepository;
let useCase: ChooseQuestionBestAnswerUseCase;

describe('Choose question best answer', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
        inMemoryRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
        useCase = new ChooseQuestionBestAnswerUseCase(inMemoryRepository, inMemoryQuestionRepository);
    });

    test('should be able to choose the question best answer', async () => {
        const question = makeQuestion();
        const answer = makeAnswer({
            questionId: question.id
        });
        await inMemoryQuestionRepository.create(question);
        await inMemoryRepository.create(answer);
        await useCase.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
        });
    
        expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
    });
    
    test('should not be able to choose another user question best answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        });
        const answer = makeAnswer({
            questionId: question.id
        });
        await inMemoryQuestionRepository.create(question);
        await inMemoryRepository.create(answer);
        const result = await useCase.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});
