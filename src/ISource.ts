export interface ISource {
  character: string;

  ReadChar(): string;
  ReadChars(count: number): string;
}
