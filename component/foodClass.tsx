export default class Food {
  constructor(
    private _id: number,
    private _name: string,
    private _manual: string[],
    private _image: string[]
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get manual() {
    return this._manual;
  }

  get image() {
    return this._image;
  }
}
