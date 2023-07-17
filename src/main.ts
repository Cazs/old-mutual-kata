import Copier from './Copier.js';
import { IDestination } from './IDestination.js';
import { ISource } from './ISource.js';
import { mock, instance } from 'ts-mockito';

export const runCopier = (character?: string) => {
  console.log('init..');
  // Create mocks
  const mockedSource: ISource = mock<ISource>();
  const mockedDestination: IDestination = mock<IDestination>();

  // Mock Source
  const source: ISource = instance(mockedSource);
  source.character = character || 'Super\nman\n';

  source.ReadChar = () =>
    source.character.toString().length > 1 &&
    !/\n/g.test(source.character.toString().substring(0, 1))
      ? source.character.toString().charAt(0)
      : null;

  // Mock Destination
  const destination: IDestination = instance(mockedDestination);
  mockedDestination.character = '';

  destination.WriteChar = (char: string) => {
    console.log('char: ', char);
    mockedDestination.character += new String(char);
  };

  const copier: Copier = new Copier(source, destination);
  copier.Copy();

  console.log('Destination character: ', mockedDestination.character);
  return mockedDestination.character;
};

export default runCopier();
