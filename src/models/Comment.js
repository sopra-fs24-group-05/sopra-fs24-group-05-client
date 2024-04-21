/**
 * Comment model
 */
class Comment {
  constructor(data = {}) {
    this.comment = null;
    this.commentownerId = null;
    this.commentId = null;
    this.commentRate = null;
    this.commentThumbups = null;
    Object.assign(this, data);
  }
}

export default Comment;
