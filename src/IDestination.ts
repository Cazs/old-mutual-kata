export interface IDestination {
  character: string;

  WriteChar(char: string);
  WriteChars(chars: string[]);
}
