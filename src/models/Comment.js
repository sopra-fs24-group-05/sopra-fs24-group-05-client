/**
 * Comment model
 */
class Comment {
  constructor(data = {}) {
    this.content = null;
    this.commentitemId=null;
    this.commentOwnerId = null;
    this.commentId = null;
    this.commentRate = null;
    this.commentThumbsUpNum = null;
    this.commentThumbsUpStatus = null;
    Object.assign(this, data);
  }
}

export default Comment;
