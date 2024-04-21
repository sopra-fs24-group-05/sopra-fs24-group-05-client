/**
 * Topic model
 */
class Item {
  constructor(data = {}) {
    this.itemownerId = null;
    this.itemname = null;
    this.itemId = null;
    this.itemintroduction = null;
    Object.assign(this, data);
  }
}

export default Item;
