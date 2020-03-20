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
                const post = remove.checkIsPost(indexOfComment)
                expect(post).toBe(true)
            })
        })

        describe('when it is a comment', () => {
            it('returns false', () => {
                indexOfComment = 1;
                const post = remove.checkIsPost(indexOfComment)
                expect(post).toBe(false)
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
            // beforeEach(() => {
            // remove.checkIsPost = jest.fn().mockResolvedValue(true);
            // })

            describe('with ownership', () => {
                it('returns true', async () => {
                    remove.checkIsPost = jest.fn().mockReturnValue(true);

                    const ownership = await remove.checkOwnerShipOfPost(post, userName, indexOfComment);
                    expect(ownership).toBe(true);
                });
            });

            describe('without ownership', () => {
                it('returns false', async () => {
                    remove.checkIsPost = jest.fn().mockReturnValue(true);

                    post.userName = 'name2@a.com'
                    const ownership = await remove.checkOwnerShipOfPost(post, userName, indexOfComment);
                    expect(ownership).toBe(false);
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
                    const ownership = await remove.checkOwnerShipOfPost(posts, userName, indexOfComment);
                    expect(ownership).toBe(true);
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
                    const ownership = await remove.checkOwnerShipOfPost(posts, userName, indexOfComment);
                    expect(ownership).toBe(false);
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
                    const response = await remove.removeThis(post, userName, indexOfComment)
                    expect(response).toBe(true);
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
                    const response = await remove.removeThis(posts, userName, indexOfComment)
                    expect(response).toEqual(
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

