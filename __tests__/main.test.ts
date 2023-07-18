import { copyCharacter, copyCharacters } from "../src/main.js";

describe("Old Mutual Code Kata Unit Tests", () => {
  it("Should expect the response to be Batman", () => {
    process.env.OM_CHAR_NAME = "Batman\nSuperman";
    process.env.OM_CHAR_NAME_ARBITRARY_LEN = "0";
    expect(copyCharacter(process.env.OM_CHAR_NAME)).toBe("Batman");
  });

  it("Should expect the response to be Super", () => {
    process.env.OM_CHAR_NAME = "Super\nman";
    process.env.OM_CHAR_NAME_ARBITRARY_LEN = "0";
    expect(copyCharacter()).toBe("Super");
  });

  it("Should expect the response to be Ironman", () => {
    process.env.OM_CHAR_NAME = "Ironman\n";
    process.env.OM_CHAR_NAME_ARBITRARY_LEN = "0";
    expect(copyCharacter()).toBe("Ironman");
  });

  it("Should expect the response to be empty", () => {
    process.env.OM_CHAR_NAME = "\nSpiderman";
    process.env.OM_CHAR_NAME_ARBITRARY_LEN = "0";
    expect(copyCharacter()).toBe("");
  });

  it("Should expect the response to be Spider", () => {
    process.env.OM_CHAR_NAME = "Spider\nman";
    process.env.OM_CHAR_NAME_ARBITRARY_LEN = "5";
    expect(copyCharacters("Spider\nman")).toBe("Spider");
  });
});
