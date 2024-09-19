import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface FetchQuestionAnswersCaseRequest {
    page: number;
    questionId: string;
}

type FetchQuestionAnswersCaseResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersCase {

    constructor (
        private answerRepository: AnswerRepository
    ) {}

    async execute({ page, questionId }: FetchQuestionAnswersCaseRequest): Promise<FetchQuestionAnswersCaseResponse> {
        const answers = await this.answerRepository.findManyByQuestionId(questionId, { page });
        return right({ answers });
    }
}