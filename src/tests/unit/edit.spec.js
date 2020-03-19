import edit from '../../services/edit';
import postingStore from '../../repository/postingStore';
import commentStore from '../../repository/commentStore';

describe('edit', () => {
    let currentUser;
    let posting;
    
    describe('checkOwnershipOfPost', () => {
        beforeEach(() => {
            currentUser = 'username';
    
            posting = {
                id: 2,
                title: 'testTitle',
                imageUrl: 'http://localhost:3000/test',
                userName: currentUser,
                like: ['test'],
                tag: ['test'],
            }
        })

        it('returns false when posting is owned by currentUser', async () => {
            currentUser = 'asdas'
            const response = edit.checkOwnershipOfPost(posting, currentUser)
            expect(response).toBe(true)
        })

        it('returns false when posting is owned by currentUser', async () => {
            const response = edit.checkOwnershipOfPost(posting, currentUser)
            expect(response).toBe(false)
        })
    })
    
    describe('editPost', () => {
        let input;

        beforeEach(() => {
            input = 'newInput';
            postingStore.editPostTitle = jest.fn().mockResolvedValue(
                posting = 
                {
                    id: 2,
                    title: input,
                    imageUrl: 'http://localhost:3000/test',
                    userName: currentUser,
                    like: ['test'],
                    tag: ['test'],
                }
            )
        })
        
        it('returns post with title modified to input', async() => {
            const [post] = await edit.editPost(input, posting);
            expect(post.title).toBe(input)
        })
    })

    describe('editComment', () => {
        let input;
        let commentId;
        let indexOfCommentOnThisPosting; 
        let comment;
        beforeEach(() => {
            input = 'newInput';
            commentId = 2;
            indexOfCommentOnThisPosting = 0;
            posting = [ {
                id: 2,
                postLId: 1,
                title: input,
                userName: currentUser,
                like: ['test'],
                isUnder: 1
            },
            {
                id: 1,
                postLId: 1,
                title: input,
                userName: currentUser,
                like: ['test'],
                isUnder: 2
            }
        ];
            commentStore.editCommentTitle = jest.fn().mockResolvedValue(
                comment = 
                {
                    id: commentId,
                    postLId: 1,
                    title: input,
                    userName: currentUser,
                    like: ['test'],
                    isUnder: 1
                }
            )
        })
        
        it('returns postings including the comment with title modified to input', async() => {
            const post = await edit.editComment(input, posting, indexOfCommentOnThisPosting);
            expect(posting[indexOfCommentOnThisPosting].title).toBe(input)
        })
    })

    describe('checkIfPostOrComment', () => {
        let indexOfCommentOnThisPosting

        it('returns true which means it is not a comment when given input indexofCommentOnThisPosting is undefined', async () => {
            const response = await edit.checkIfPostOrComment(indexOfCommentOnThisPosting)
            expect(response).toBe(true)
        })

        it('returns false which means it is a comment when given input indexofCommentOnThisPosting of anything defined', async () => {
            indexOfCommentOnThisPosting = 1;
            const response = await edit.checkIfPostOrComment(indexOfCommentOnThisPosting)
            expect(response).toBe(false)
        })
    })

    describe('editThis', () => {
        let input;
        let indexOfCommentOnThisPosting;
        beforeEach(() => {
            input = 'input of whatever';
            edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(true)
        })

        it('returns message and status when checkOwnershipOfPost returns false ', async () => {
            const response = await edit.editThis(input, posting, currentUser, indexOfCommentOnThisPosting)
            expect(response).toEqual(expect.objectContaining({ Message: "you don't have permission", owned: false }))
        })

        describe('when it has ownership of that post or comment', () => {

            beforeEach(() => {
                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
            })
            
            it('returns post with edited title changed to input considering its a post', async() => {
                edit.checkIfPostOrComment = jest.fn().mockResolvedValue(true)
                edit.editPost = jest.fn().mockResolvedValue(
                posting = {
                    id: '2',
                    title: input,
                    imageUrl: 'http://localhost:3000/test',
                    userName: currentUser,
                    like: ['test'],
                    tag: ['test'],
                })

                const response = await edit.editThis(input, posting, currentUser, indexOfCommentOnThisPosting)
                expect(response.title).toBe(input)
            })

            it('returns posts with edited title changed to input considering its a comment', async() => {
                indexOfCommentOnThisPosting = 1;
                posting = [ {
                    id: 2,
                    postLId: 1,
                    title: input,
                    userName: currentUser,
                    like: ['test'],
                    isUnder: 1
                },
                {
                    id: 1,
                    postLId: 1,
                    title: input,
                    userName: currentUser,
                    like: ['test'],
                    isUnder: 2
                }
            ];
                edit.checkIfPostOrComment = jest.fn().mockResolvedValue(false)
                edit.editComment = jest.fn().mockResolvedValue(
                    posting = [ {
                        id: 2,
                        postLId: 1,
                        title: input,
                        userName: currentUser,
                        like: ['test'],
                        isUnder: 1
                    },
                    {
                        id: 1,
                        postLId: 1,
                        title: input,
                        userName: currentUser,
                        like: ['test'],
                        isUnder: 2
                    }
                ]
                )

                const response = await edit.editThis(input, posting, currentUser, indexOfCommentOnThisPosting)
                expect(response[indexOfCommentOnThisPosting].title).toBe(input)
            })
        })
    })

})
