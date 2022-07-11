export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(cards){
    cards.forEach(this.addItem);
  }

  addItem = (data) =>  {
    this._container.prepend(this._renderer(data));
  }
}
