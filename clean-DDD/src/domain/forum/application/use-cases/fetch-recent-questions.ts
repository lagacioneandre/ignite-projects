import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

interface FetchRecentQuestionsCaseRequest {
    page: number;
}

type FetchRecentQuestionsCaseResponse = Either<null, { questions: Question[] }>;

export class FetchRecentQuestionsCase {

    constructor (
        private questionRepository: QuestionRepository
    ) {}

    async execute({ page }: FetchRecentQuestionsCaseRequest): Promise<FetchRecentQuestionsCaseResponse> {
        const questions = await this.questionRepository.findManyRecent({ page });
        return right({ questions });
    }
}