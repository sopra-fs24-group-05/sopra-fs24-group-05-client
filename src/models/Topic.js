/**
 * Item model
 */
class Topic {
  constructor(data = {}) {
    this.topicname = null;
    this.topicId = null;
    Object.assign(this, data);
  }
}

export default Topic;
