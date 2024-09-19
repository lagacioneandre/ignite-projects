import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<null, { question: Question }>;

export class GetQuestionBySlugUseCase {

    constructor (
        private questionRepository: QuestionRepository
    ) {}

    async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionRepository.findBySlug(slug);
        if (!question) throw new Error('Question not found');
        return right({ question });
    }
}