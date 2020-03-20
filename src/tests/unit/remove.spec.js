// import { checkOwnerShipOfPost, removeThis } from '../../services/remove'
import remove from '../../services/remove'
import postingStore from '../../repository/postingStore'
import commentStore from '../../repository/commentStore'

describe('remove service', () => {
    let userName;
    let posts;
    let indexOfComment;
    let post;
    describe('checkIsPost', () => {

        describe('when it is a post', () => {
            it('returns true', () => {
                const isPost = remove.checkIsPost(indexOfComment)
                expect(isPost).toBe(true)
            })
        })

        describe('when it is a comment', () => {
            it('returns false', () => {
                indexOfComment = 1;
                const isPost = remove.checkIsPost(indexOfComment)
                expect(isPost).toBe(false)
            })
        })


    });


    describe('checkOwnerShipOfPost', () => {
        beforeEach(() => {
            userName = 'name@a.com';
            post = {
                id: 0,
                title: 'whatever',
                imageUrl: 'whatever',
                userName: 'name@a.com',
                like: ['whatever'],
                tag: ['whatever']
            };
        })

        describe('when it is a post', () => {

            describe('with ownership', () => {
                it('returns true', async () => {
                    remove.checkIsPost = jest.fn().mockReturnValue(true);

                    const hasOwnership = await remove.checkOwnerShipOfPost(post, userName, indexOfComment);
                    expect(hasOwnership).toBe(true);
                });
            });

            describe('without ownership', () => {
                it('returns false', async () => {
                    remove.checkIsPost = jest.fn().mockReturnValue(true);

                    post.userName = 'name2@a.com'
                    const hasOwnership = await remove.checkOwnerShipOfPost(post, userName, indexOfComment);
                    expect(hasOwnership).toBe(false);
                });
            });
        })

        describe('when it is a comment', () => {
            beforeEach(() => {
                remove.checkIsPost = jest.fn().mockResolvedValue(false);
            })

            describe('with ownership', () => {
                beforeEach(() => {
                    posts = [{
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
                    indexOfComment = 0;
                })
                it('returns true', async () => {
                    const hasOwnership = await remove.checkOwnerShipOfPost(posts, userName, indexOfComment);
                    expect(hasOwnership).toBe(true);
                });
            });

            describe('without ownership', () => {
                beforeEach(() => {
                    userName = 'name@asd.com'
                    posts =
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
                    indexOfComment = 0;

                })
                it('returns false', async () => {
                    const hasOwnership = await remove.checkOwnerShipOfPost(posts, userName, indexOfComment);
                    expect(hasOwnership).toBe(false);
                });
            });
        });
    });

    describe('removeThis', () => {

        describe('when it has ownership', () => {
            describe('when it is a post', () => {
                beforeEach(() => {
                    userName = 'name@a.com';
                    post = {
                        id: 0,
                        title: 'whatever',
                        imageUrl: 'whatever',
                        userName: 'name@a.com',
                        like: ['whatever'],
                        tag: ['whatever']
                    };
                    indexOfComment = undefined
                    remove.checkOwnerShipOfPost = jest.fn().mockResolvedValue(true);
                    postingStore.removePost = jest.fn().mockResolvedValue();
                })

                it('returns true and is removed', async () => {
                    const isRemoved = await remove.removeThis(post, userName, indexOfComment)
                    expect(isRemoved).toBe(true);
                })
            })

            describe('when it not a post meaning it is a comment', () => {
                beforeEach(() => {
                    indexOfComment = 0;
                    posts =
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
                    commentStore.removeComment = jest.fn().mockResolvedValue();
                })
                it('return posts with removed post', async () => {
                    const posts = await remove.removeThis(posts, userName, indexOfComment)
                    expect(posts).toEqual(
                        expect.not.objectContaining(posts[0]),
                    );
                })
            })
        })


        describe('without ownership', () => {

            beforeEach(() => {
                remove.checkOwnerShipOfPost = jest.fn().mockResolvedValue(false)
            })
            it('returns Message: you dont have permission', async () => {
                const { Message } = await remove.removeThis(post, userName, indexOfComment);
                expect(Message).toBe("You don't have permission")
            })
        })
    })
})

