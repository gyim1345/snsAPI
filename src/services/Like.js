const Like = {
     findIfIClickedLike () {
        return posting.like.includes(currentUser)
      },
      
       deleteLike () {
        return posting.like = posting.like.filter(el => el !== currentUser);
      },
      
       addLike () {
        return posting.like = [...posting.like, currentUser];
      },
      
       increaseLike () {
        !findIfIClickedLike() ? addLike() : deleteLike();
      },
}

module.exports = Like

