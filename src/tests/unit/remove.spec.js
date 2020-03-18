// import { checkOwnerShipOfPost, removeThis } from '../../services/remove'
import remove from '../../services/remove'
import postingStore from '../../repository/postingStore'

describe('remove service', () => {
    let user;
    let posting;
    let indexOfCommentOnThisPosting;
    describe('checkOwnerShipOfPost', () => {
        beforeEach(() => {
            user = 'name@a.com';
            posting = {
                id: 0,
                title: 'whatever',
                imageUrl: 'whatever',
                userName: 'name@a.com',
                like: ['whatever'],
                tag: ['whatever']
            };
        })

        describe('with inputs of posting, user, and undefined indexOfCommentOnThisPosting', () => {

            it('is owner of post or comment ', async () => {
                const ownership = remove.checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting);
                expect(ownership).toBe(true);
            });
        });

        describe('with inputs of posting, user of userName sameUser, and undefined indexOfCommentOnThisPosting when you have no ownership', () => {
            it('is owner of post or comment', async () => {
                posting.userName = 'name2@a.com'
                console.log(posting.userName, user)
                const ownership = remove.checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting);
                expect(ownership).toBe(false);
            });
        });

        describe('with inputs of postings, user, and indexOfCommentOnThisPosting', () => {
            it('is owner of post or comment', async () => {
                posting =
                    [{
                        id: 0,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'name@a.com',
                        like: ['whatever'],
                        tag: ['whatever']
                    },
                    {
                        id: 0,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'name@a.com',
                        like: ['whatever'],
                        tag: ['whatever']
                    }
                    ]
                indexOfCommentOnThisPosting = 0;
                const ownership = remove.checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting);
                expect(ownership).toBe(true);
            });
        });

        describe('with inputs of postings, user, and indexOfCommentOnThisPosting when you have no ownership', () => {
            it('is owner of post or comment', async () => {
                posting =
                    [{
                        id: 0,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'name2@a.com',
                        like: ['whatever'],
                        tag: ['whatever']
                    },
                    {
                        id: 0,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'name2@a.com',
                        like: ['whatever'],
                        tag: ['whatever']
                    }
                    ]
                indexOfCommentOnThisPosting = 0;
                const ownership = remove.checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting);
                expect(ownership).toBe(false);
            });
        });

    });

    describe('removeThis', () => {

        describe('has ownership of post or commnet', () => {

            beforeEach(() => {
                user = 'name@a.com';
                posting = {
                    id: 0,
                    title: 'whatever',
                    imageUrl: 'whatever',
                    userName: 'name@a.com',
                    like: ['whatever'],
                    tag: ['whatever']
                };
                indexOfCommentOnThisPosting = undefined
                remove.checkOwnerShipOfPost = jest.fn().mockResolvedValue(true);
                postingStore.removePost = jest.fn().mockResolvedValue();
            })

            it('is post and is removed', async () => {
                const response = await remove.removeThis(posting, user, indexOfCommentOnThisPosting)
                expect(response).toBe(true);
            })
            
            it('is comment and is removed', async () => {
                indexOfCommentOnThisPosting = 0;
                posting =
                [{
                    id: 0,
                    title: 'whatever',
                    imageUrl: 'whatever',
                    userName: 'name2@a.com',
                    like: ['whatever'],
                    tag: ['whatever']
                },
                {
                    id: 1,
                    title: 'whatever',
                    imageUrl: 'whatever',
                    userName: 'name2@a.com',
                    like: ['whatever'],
                    tag: ['whatever']
                }
                ]
                const response = await remove.removeThis(posting, user, indexOfCommentOnThisPosting)
                expect(response).toEqual(
                    expect.not.objectContaining(posting[0]),
                  );
            })
        })
    })
})

