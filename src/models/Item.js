/**
 * Topic model
 */
class Item {
  constructor(data = {}) {
    this.itemTopicId = null;
    this.itemname = null;
    this.itemId = null;
    this.itemIntroduction = null;
    Object.assign(this, data);
  }
}

export default Item;
