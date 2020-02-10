const commentStore = require('./commentStore');
const postingStore = require('./postingStore');

const remove = {
    checkOwnershipOfComment() {
        return currentUser === commentOwner;
      },
    
    removeCommentFromStore() {
        return commentStorage.removeComment(postingId, thisComment.id);
      },
      
    checkIsComment() {
        return isComment === false;
      },
      
    checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting) {
        return indexOfCommentOnThisPosting === undefined
        ? user === posting.userName
        : user === posting[indexOfCommentOnThisPosting].userName
      },
    
    RemovePostingFromPostStore() {
        return postingStorage.removePost(posting.id);
      },

    removeThis (id) {
        postingStore.removePost(id);
        // console.log(postingStore.postList)
        postingStore.postList = postingStore.postList.filter(posts => posts.id !== id)
        const post = postingStore.postList;
        const status = true;
        const posts = { post, status}
        return posts

        
        // if (this.checkOwnerShipOfPost(posting, user, indexOfCommentOnThisPosting) !== true)
        //   return {Message: "You don't have permission"}

        // if (indexOfCommentOnThisPosting === undefined)
        //   return postingStore.postList = postingStore.postList.filter(posts => posts.id !== id)
        

        // if (indexOfCommentOnThisPosting !== undefined){
        //   const theComment = posting[indexOfCommentOnThisPosting];          
          
        //   commentStore.commentList = commentStore.commentList.filter(comment => comment !== theComment);
        //   console.log(commentStore.commentList)
        //   return posting.filter(comment => comment !== theComment);
        // }

        return "what the fuck"
    }

    // removeThis (id) {
    //     postingStore.removePost(id);
    //     // console.log(postingStore.postList)
    //     postingStore.postList = postingStore.postList.filter(posts => posts.id !== id)
    //     const post = postingStore.postList;
    //     const status = true;
    //     const posts = { post, status}
    //     return posts
    // }


}


module.exports = remove;
