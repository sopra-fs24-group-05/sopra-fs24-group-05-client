/**
 * Item model
 */
class Topic {
  constructor(data = {}) {
    this.topicname = null;
    this.topicId = null;
    this.topicIntroduction = null;
    Object.assign(this, data);
  }
}

export default Topic;
