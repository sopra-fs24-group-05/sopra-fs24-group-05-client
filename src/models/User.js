/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.userId = null;
    this.name = null;
    this.username = null;
    this.token = null;
    this.status = null;
    this.identity = null;
    this.avator=null;
    Object.assign(this, data);
  }
}

export default User;
