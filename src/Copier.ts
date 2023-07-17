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
        while(this._source.ReadChar()) {
            this._destination.WriteChar(this._source.ReadChar().toString());
            this._source.character = this._source.character.toString().substring(1, this._source.character.toString().length);
        }
        // this._destination.WriteChar(this._source.ReadChar());

        // new Promise(() => this._source.ReadChar())
        /*this._destination.WriteChar(this._source.ReadChar()
            .split('')
            .reduce((p, c, i, acc) => {
                return acc + c;
            }, ''));*/
        
        /*this._source.ReadChar()
            .split('')
            .forEach((char: string) => {
                this._destination.WriteChar(char);
            });*/
    }
}