import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from '@faker-js/faker';

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityId
) {
    const question = Question.create({
        authorId: new UniqueEntityId('1'),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        slug: Slug.create('nova-pergunta'),
        ...override
    }, id);
    return question;
}
