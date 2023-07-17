import Copier from "./Copier.js";
import { IDestination } from "./IDestination.js";
import { ISource } from "./ISource.js";
import { mock, instance } from "ts-mockito";

let source: ISource;
let destination: IDestination;

export const initSource = () => {
  // Create Source Mocks
  const mockedSource: ISource = mock<ISource>();
  // Mock Source Instance
  const source: ISource = instance(mockedSource);

  source.ReadChar = readCharacter;

  return source;
};

export const initDestination = () => {
  // Create Destination Mocks
  const mockedDestination: IDestination = mock<IDestination>();

  // Mock Destination Instance
  const destination: IDestination = instance(mockedDestination);

  destination.WriteChar = writeCharacter;

  return destination;
};

export const readCharacter = () =>
  source?.character?.toString()?.length > 1 &&
  !/\n/g.test(source?.character?.toString()?.substring(0, 1))
    ? source.character.toString().charAt(0)
    : null;

export const writeCharacter = (char: string) => {
  destination.character += new String(char);
};

export const copyCharacter = (character: string = 'Super\nman\n') => {
  source = initSource();
  destination = initDestination();

  source.character = character;
  destination.character = '';

  // Init Copier
  const copier: Copier = new Copier(source, destination);

  // Copy from ISource to IDestination
  copier.Copy();

  console.log("Destination character: ", destination?.character);
  return destination?.character;
};

export default copyCharacter();
