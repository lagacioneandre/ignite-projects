import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(
    override: Partial<QuestionAttachmentProps> = {},
) {
    const questionAttachment = QuestionAttachment.create({
        questionId: new UniqueEntityId(),
        attachmentId: new UniqueEntityId(),
        ...override
    });
    return questionAttachment;
}
