/**
 * Topic model
 */
class Item {
  constructor(data = {}) {
    this.itemTopicId = null;
    this.itemname = null;
    this.itemId = null;
    this.itemIntroduction = null;
    this.itemAverageScore = null;
    this.popularity = 0;
    Object.assign(this, data);
  }
}

export default Item;
