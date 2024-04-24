/**
 * Comment model
 */
class Comment {
  constructor(data = {}) {
    this.comment = null;
    this.commentitemId=null;
    this.commentOwnerId = null;
    this.commentId = null;
    this.commentRate = null;
    this.commentThumbupss = null;
    // this.commentStatus = null;
    Object.assign(this, data);
  }
}

export default Comment;
