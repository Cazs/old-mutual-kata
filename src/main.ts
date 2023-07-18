import Copier from "./Copier.js";
import { IDestination } from "./IDestination.js";
import { ISource } from "./ISource.js";
import { mock, instance } from "ts-mockito";

// Declare ISource Global Instance
let source: ISource;

// Declare IDestination Global Instance
let destination: IDestination;

// Declare Copier Global Instance
let copier: Copier;

// Instantiate Global ISource Mock Variable
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

// Instantiate Global IDestination Mock Variable
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

// ISource ReadChar Stub
export const readCharacter = (): string | undefined => {
  return source?.character?.toString()?.length > 1 &&
    /\n/g.test(source?.character?.toString()?.substring(0, 1))
    ? undefined
    : source.character.toString().charAt(0)?.trim();
};

// ISource ReadChar Bonus Stub
export const readCharacters = (count: number): string[] => {
  const charLen = source?.character?.toString()?.length;

  const newLineDelimeterPos = source?.character?.toString()?.indexOf("\n");

  let maxLength = count >= 0 && count < charLen ? count : charLen;
  maxLength = newLineDelimeterPos > maxLength ? newLineDelimeterPos : maxLength;

  return source?.character?.toString()?.substring(0, maxLength)?.split("");
};

// IDestination WriteChar Stub
export const writeCharacter = (char: string) => {
  destination.character += char;
  console.log(
    "> IDestination Current Character Name: ",
    destination?.character,
    " <"
  );
};

// IDestination WriteChar Bonus Stub
export const writeCharacters = (chars: string[]) =>
  writeCharacter(chars.join(""));

// Instantiate Global Variables
export const initGlobals = (character: string) => {
  // Init ISource and IDestination
  source = initSource();
  destination = initDestination();

  // Init Defaults
  source.character = character;
  destination.character = "";

  // Init Copier
  copier = new Copier(source, destination);
};

// Execute Phase One Of The Kata
export const copyCharacter = (character?: string) => {
  const c =
    character?.toString() ||
    process.env?.OM_CHAR_NAME?.toString() ||
    "Super\nman\n";
  initGlobals(c);

  // Copy from ISource to IDestination
  copier.Copy();

  console.log(
    "\n>>> IDestination Final Character Name: ",
    destination?.character,
    " <<<"
  );

  return destination?.character;
};

// Execute Phase Two (Bonus) Of The Kata
export const copyCharacters = (character?: string) => {
  const c =
    character?.toString() ||
    process.env?.OM_CHAR_NAME?.toString() ||
    "Super\nman\n";
  initGlobals(c);

  writeCharacters(
    readCharacters(Number(process.env?.OM_CHAR_NAME_ARBITRARY_LEN || "0"))
  );

  console.log(
    "\n>>> IDestination Final Character Name (Arbitrary Length): ",
    destination?.character,
    " <<<"
  );
  return destination?.character;
};

export default Number(process.env?.OM_CHAR_NAME_ARBITRARY_LEN || "0") > 0
  ? copyCharacters()
  : copyCharacter();
