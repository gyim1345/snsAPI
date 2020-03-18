import { getTaggedPosts } from '../../services/tag';
import postingStore from '../../repository/postingStore';

describe('tag service', () => {
    describe('getTaggedPosts', () => {
        let username;

        describe('with initial value that has username in tag', () => {
            beforeEach(() => {
                username = 'username';

                postingStore.getUserTaggedPosts = jest.fn().mockResolvedValue([{
                    id: '2',
                    title: 'testTitle',
                    imageUrl: 'http://localhost:3000/test',
                    userName: 'nameTest',
                    like: ['test'],
                    tag: [username],
                }]);
            });

            it('returns posts with user tagged', async () => {
                const taggedPosts = await getTaggedPosts(username);
                expect(taggedPosts[0].tag).toContain(username);
            });
        });

        describe('with username not exist', () => {
            beforeEach(() => {
                username = 'NOT_EXISTING_USERNAME';

                postingStore.getUserTaggedPosts = jest.fn().mockResolvedValue([]);
            });
            
            it('returns empty array', async () => {
                const taggedPosts = await getTaggedPosts(username);
                expect(taggedPosts).toEqual([]);
            })
        });
    });
});