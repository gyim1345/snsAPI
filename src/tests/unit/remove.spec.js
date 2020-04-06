// import { checkOwnerShipOfPost, removeThis } from '../../services/remove'
import remove from '../../services/remove'
import postingStore from '../../repository/postingStore'
import commentStore from '../../repository/commentStore'

describe('remove service', () => {
    let userName;
    let posts;
    let indexOfComment;
    let post;

    beforeEach(()=> {
        userName = 'name@a.com';

        post = {
            id: 0,
            title: 'whatever',
            imageUrl: 'whatever',
            userName: 'name@a.com',
            like: ['whatever'],
            tag: ['whatever']
        };

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
        ];

        indexOfComment = 0;
    })

    describe('checkIsPost', () => {
        describe('when it is a post', () => {
            it('returns true', () => {
                const isPost = remove.checkIsPost(indexOfComment)

                expect(isPost).toBe(true)
            })
        })

        describe('when it is a comment', () => {
            beforeEach(()=> {
                indexOfComment = 1;
            })

            it('returns false', () => {
                const isPost = remove.checkIsPost(indexOfComment)

                expect(isPost).toBe(false)
            })
        })
    });


    describe('checkOwnerShipOfPost', () => {
        describe('when it is a post', () => {
            describe('with ownership', () => {
                beforeEach(()=> {
                    remove.checkIsPost = jest.fn().mockReturnValue(true);
                })
                
                it('returns true', async () => {
                    const hasOwnership = await remove.checkOwnerShipOfPost(post, userName, indexOfComment);
                    
                    expect(hasOwnership).toBe(true);
                });
            });

            describe('without ownership', () => {
                beforeEach(()=> {
                    post.userName = 'name2@a.com'
                    remove.checkIsPost = jest.fn().mockReturnValue(true);
                })
                
                it('returns false', async () => {
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
                it('returns true', async () => {
                    const hasOwnership = await remove.checkOwnerShipOfPost(posts, userName, indexOfComment);
                   
                    expect(hasOwnership).toBe(true);
                });
            });

            describe('without ownership', () => {
                beforeEach(() => {
                    posts[0].userName = 'name2@a.com'
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
                    commentStore.removeComment = jest.fn().mockResolvedValue();
                })

                it('return posts with removed post', async () => {
                    const post = await remove.removeThis(posts, userName, indexOfComment)
                    
                    expect(post).toEqual(expect.not.objectContaining(posts[0]),
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

