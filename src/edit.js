const commentStore = require('./commentStore');
const postingStore = require('./postingStore');


const edit = {
 checkOwnershipOfPost(posting, currentUser) {
    return posting.userName !== currentUser;
  },
  checkOwnershipOfComment(posting, currentUser, indexOfCommentOnThisPosting) {
    return posting[indexOfCommentOnThisPosting].userName !== currentUser
  },
   clickedIsPostAndIsMine(posting, currentUser) {
    return  posting.userName === currentUser;
  },
  
   clickedIsCommentAndIsMine() {
    return commentStore.getComment(thisComment.id) === posting[indexOfCommentOnThisPosting] && commentStore.getComment(thisComment.id).userWritten === currentUser;
  },
  
   editPost(input, posting) {
       postingStore.getPost(posting.id).title = input;
        return postingStore.getPost(posting.id);
    },
  
    editComment(input,posting, indexOfCommentOnThisPosting) {
      const commentId =  posting[indexOfCommentOnThisPosting].id      
      commentStore.getComment(commentId).title = input
      posting[indexOfCommentOnThisPosting].title = input
         return posting;
     },
  checkIfPostOrComment(indexOfCommentOnThisPosting) {
      return indexOfCommentOnThisPosting === undefined
  },

   editThis(input, posting, currentUser, indexOfCommentOnThisPosting) {
     this.checkIfPostOrComment(indexOfCommentOnThisPosting)
     ?  this.checkOwnershipOfPost(posting, currentUser)
        ? posting = { Message:"you don't have permission", owned: false}
        : posting = this.editPost(input, posting)
     : this.checkOwnershipOfComment(posting, currentUser, indexOfCommentOnThisPosting)
       ? posting = { Message:"you don't have permission", owned: false}
       : posting = this.editComment(input, posting, indexOfCommentOnThisPosting)
       return posting;
  }
    // if(this.checkIfPostOrComment(indexOfCommentOnThisPosting)) {
    //   if(this.checkOwnershipOfPost(posting, currentUser))
    //     return posting = { Message:"you don't have permission", owned: false}
    //   else return posting = this.editPost(input, posting)
    // }
    // else { 
    //   if(this.checkOwnershipOfComment(posting, currentUser, indexOfCommentOnThisPosting))
    //   return  posting = { Message:"you don't have permission", owned: false}
    //   else return posting = this.editComment(input, posting, indexOfCommentOnThisPosting)
    // }
  
}
  module.exports =  edit;