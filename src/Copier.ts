import { IDestination } from "./IDestination.js";
import { ISource } from "./ISource.js";

export default class Copier {
  private _source: ISource;
  private _destination: IDestination;

  constructor(src: ISource, dest: IDestination) {
    this._source = src;
    this._destination = dest;
  }

  Copy(): void {
    const tempSourceChar: string = new String(this._source.character).toString();

    while (this._source.ReadChar()) {
      this._destination.WriteChar(this._source.ReadChar().toString());
      this._source.character = this._source.character
        .toString()
        .substring(1, this._source.character.toString().length);
    }
    
    this._source.character = tempSourceChar;
  }
}
