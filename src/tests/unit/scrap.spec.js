import { getScrappedPostings } from '../../services/scrap';
import userStore from '../../repository/userStore';
import postingStore from '../../repository/postingStore';

describe('scrap service', () => {
    describe('getScrappedPostings', () => {
        let userName = 'gibong@gmail.com';
        let posts = [
            {
                id: 1,
                title: 'whatever',
                imageUrl: 'whatever',
                userName: 'gibong@gmail.com',
                like: ['whatever'],
                tag: ['whatever']                        
            },
            {
                id: 3,
                title: 'whatever',
                imageUrl: 'whatever',
                userName: 'gibong@gmail.com',
                like: ['whatever'],
                tag: ['whatever']                        
            },
            {
                id: 5,
                title: 'whatever',
                imageUrl: 'whatever',
                userName: 'gibong@gmail.com',
                like: ['whatever'],
                tag: ['whatever']                        
            },
        ]
        describe('with input userName of username', () => {
            beforeAll(() => {
                userStore.getUserScrapIds = jest.fn().mockResolvedValue([1,3,5]);
                postingStore.getPostsFromArrayId = jest.fn().mockResolvedValue(posts)
            })
            
            it('returns posts scrapped by name', async () => {
                const returnedPosts = await getScrappedPostings(userName);

                expect(returnedPosts).toEqual(posts)
             });
        });
    });
});