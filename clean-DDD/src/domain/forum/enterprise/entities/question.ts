import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "./value-objects/slug";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { QuestionAttachmentList } from "./question-attachment-list";
import { QuestionBestAnswerChoosenEnvet } from "../../events/question-best-answer-choosen-envet";

export interface QuestionProps {
    title: string;
    content: string;
    authorId: UniqueEntityId;
    slug: Slug;
    createdAt: Date;
    attachments: QuestionAttachmentList;
    updatedAt?: Date;
    bestAnswerId?: UniqueEntityId;
}

export class Question extends AggregateRoot<QuestionProps> {
    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get authorId() {
        return this.props.authorId;
    }

    get slug() {
        return this.props.slug;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get attachments() {
        return this.props.attachments;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get bestAnswerId() {
        return this.props.bestAnswerId;
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3;
    }

    get excerpt() {
       return this.content.substring(0, 120).trimEnd().concat('...');
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    set title(title: string) {
        this.props.title = title;
        this.props.slug = Slug.createFromtext(title);
        this.touch();
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
        if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
            this.addDomainEvent(new QuestionBestAnswerChoosenEnvet(this, bestAnswerId));
        }
        this.props.bestAnswerId = bestAnswerId;
        this.touch();
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }


    static create(
        props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
        id?: UniqueEntityId
    ) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromtext(props.title),
            createdAt: props.createdAt ?? new Date(),
            attachments: props.attachments || new QuestionAttachmentList(),
        }, id);
        return question;
    }
}
