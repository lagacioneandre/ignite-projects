export class Slug {
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(slug: string) {
        return new Slug(slug);
    }

    static createFromtext(text: string) {
        const slugText = text
            .normalize('NFKD')
            .toLocaleLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '');
        return new Slug(slugText);
    }
}
