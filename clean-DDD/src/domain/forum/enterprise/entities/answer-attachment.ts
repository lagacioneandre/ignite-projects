import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface AnswerAttachmentProps {
    answerId: UniqueEntityId;
    attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
    get answerId() {
        return this.props.answerId;
    }

    get attachmentId() {
        return this.props.attachmentId;
    }

    static create(props: AnswerAttachmentProps) {
        const attachment = new AnswerAttachment(props);
        return attachment;
    }
}