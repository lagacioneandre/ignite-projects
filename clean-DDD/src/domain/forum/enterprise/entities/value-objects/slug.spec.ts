import { Slug } from './slug';

test('it should be able to create a slug from a text', () => {
    const slug = Slug.createFromtext('Example question title');
    expect(slug.value).toEqual('example-question-title');
});
