/**
 * Topic model
 */
class Item {
  constructor(data = {}) {
    this.itemOwnerId = null;
    this.itemname = null;
    this.itemId = null;
    this.itemIntroduction = null;
    Object.assign(this, data);
  }
}

export default Item;
