import Copier from './Copier.js';
import { IDestination } from './IDestination.js';
import { ISource } from './ISource.js';
import { mock, instance } from 'ts-mockito';

// Declare ISource Global Instance
let source: ISource;

// Declare IDestination Global Instance
let destination: IDestination;

// Declare Copier Global Instance
let copier: Copier;

export const initSource = (): ISource => {
  // Create Source Mocks
  const mockedSource: ISource = mock<ISource>();

  // Mock Source Instance
  const source: ISource = instance(mockedSource);

  // Bind Read Character method
  source.ReadChar = readCharacter;

  // Return ISource Instance
  return source;
};

export const initDestination = (): IDestination => {
  // Create Destination Mocks
  const mockedDestination: IDestination = mock<IDestination>();

  // Mock Destination Instance
  const destination: IDestination = instance(mockedDestination);

  // Bind Write Character method
  destination.WriteChar = writeCharacter;

  // Return IDestination Instance
  return destination;
};

// ISource Stubs
export const readCharacter = (): string | undefined => {
  const minPos = /\n/g.test(source?.character?.toString()) ? 1 : 0;

  return source?.character?.toString()?.length > minPos &&
  !/\n/g.test(source?.character?.toString()?.substring(minPos, 1))
    ? source.character.toString().charAt(0)
    : undefined;
}

export const readCharacters = (count: number): string[] => {
  const charLen = source?.character?.toString()?.length;

  const newLineDelimeterPos = source?.character?.toString()?.indexOf('\n');

  let maxLength = count >= 0 && count < charLen ? count : charLen;
  maxLength = newLineDelimeterPos > maxLength ? newLineDelimeterPos : maxLength;

  return source?.character?.toString()?.substring(0, maxLength)?.split('');
};

// IDestination Stubs
export const writeCharacter = (char: string) => {
  destination.character += char;
  console.log('> IDestination Current Character Name: ', destination?.character);
};

export const writeCharacters = (chars: string[]) => writeCharacter(chars.join(''));

export const initGlobals = (character: string) => {
  // Init ISource and IDestination
  source = initSource();
  destination = initDestination();

  // Init defaults
  source.character = character;
  destination.character = '';

  // Init Copier
  copier = new Copier(source, destination);
}

export const copyCharacter = (character?: string) => {
  initGlobals(character || process.env.OM_CHAR_NAME || 'Super\nman\n');

  // Copy from ISource to IDestination
  copier.Copy();

  console.log('\n>>> IDestination Final Character Name: ', destination?.character, ' <<<');
  return destination?.character;
};

export const copyCharacters = (character?: string) => {
  initGlobals(character || process.env.OM_CHAR_NAME || 'Super\nman\n');

  writeCharacters(readCharacters(Number(process.env.OM_CHAR_NAME_ARBITRARY_LEN || '0')));

  console.log('\n>>> IDestination Final Character Name (Arbitrary Length): ', destination?.character, ' <<<');
  return destination?.character;
};

export default Number(process.env.OM_CHAR_NAME_ARBITRARY_LEN || '0') > 0 ? copyCharacters() : copyCharacter();
