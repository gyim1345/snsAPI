import { getScrappedPostings } from '../../services/scrap';
import userStore from '../../repository/userStore';
import postingStore from '../../repository/postingStore';

describe('scrap service', () => {
    describe('getScrappedPostings', () => {
        let userName = 'username';
        describe('with input userName of username', () => {
            beforeAll(() => {
                userStore.getUserScrapIds = jest.fn().mockResolvedValue([1,3,5]);
                postingStore.getPostsFromArrayId = jest.fn().mockResolvedValue([
                    {
                        id: 1,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'whatever',
                        like: ['whatever'],
                        tag: ['whatever']                        
                    },
                    {
                        id: 3,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'whatever',
                        like: ['whatever'],
                        tag: ['whatever']                        
                    },
                    {
                        id: 5,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'whatever',
                        like: ['whatever'],
                        tag: ['whatever']                        
                    },
                ])
            })
            
            it('returns posts scrapped by name', async () => {
                const posts = await getScrappedPostings(userName);
                expect(posts[0].id).toBe(1);
                expect(posts[1].id).toBe(3);
                expect(posts[2].id).toBe(5); 
             });
        });
    });
});