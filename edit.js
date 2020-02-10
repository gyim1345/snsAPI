const commentStore = require('./commentStore');
const postingStore = require('./postingStore');


const edit = {
 checkOwnershipOfPost(posting, currentUser) {
    return posting.userName !== currentUser;
  },
  
   clickedIsPostAndIsMine(posting, currentUser) {
    return  posting.userName === currentUser;
  },
  
   clickedIsCommentAndIsMine() {
    return commentStore.getComment(thisComment.id) === posting[indexOfCommentOnThisPosting] && commentStore.getComment(thisComment.id).userWritten === currentUser;
  },
  
   editPost(input, posting) {
    //    console.log('this id ', posting.id)
       postingStore.getPost(posting.id).title = input;
        return postingStore.getPost(posting.id);
    },
  
    editComment(input,posting, indexOfCommentOnThisPosting) {
        // console.log('this id ', posting)
            posting[indexOfCommentOnThisPosting].title = input;     
         return posting;
     },
  checkIfPostOrComment(indexOfCommentOnThisPosting) {
    //   console.log('indexOfCommentOnThisPosting', indexOfCommentOnThisPosting)
      return indexOfCommentOnThisPosting === undefined
  },
  //input, posting, user
   editThis(input, posting, currentUser, indexOfCommentOnThisPosting) {
       this.checkOwnershipOfPost(posting, currentUser)
         ? posting = { Message:"you don't have permission", owned: false} // 바꿀것.
         : this.checkIfPostOrComment(indexOfCommentOnThisPosting)
           ? posting = this.editPost(input, posting)
           : posting = this.editComment(input, posting, indexOfCommentOnThisPosting)
        return posting;
         //    : this.clickedIsPostAndIsMine(posting, currentUser)
        // console.log(postingStore.getPost(posting.id).title)
    //     : clickedIsCommentAndIsMine()
    //       ? editComment() 
    //       : alert(`you dont have permission ${currentUser}`);
    // setGlobalState(Date.now());
  }

}
  module.exports =  edit;