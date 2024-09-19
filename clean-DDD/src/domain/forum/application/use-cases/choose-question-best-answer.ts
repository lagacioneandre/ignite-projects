import { AnswerRepository } from '../repositories/answer-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question; }>;

export class ChooseQuestionBestAnswerUseCase {

    constructor (
        private answersRepository: AnswerRepository,
        private questionRepository: QuestionRepository,
    ) {}

    async execute({ authorId, answerId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);
        if (!answer) return left(new ResourceNotFoundError());
        const question = await this.questionRepository.findById(answer.questionId.toString());
        if (!question) return left(new NotAllowedError());
        if (authorId !== question.authorId.toString()) throw new Error('not allowed.');
        question.bestAnswerId = answer.id;
        await this.questionRepository.save(question);
        return right({ question });
    }
}