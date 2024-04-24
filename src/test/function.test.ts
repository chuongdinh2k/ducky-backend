import { isEven } from "../utils/number";

describe("isEven", () => {
  test("returns true if number is even", () => {
    expect(isEven(2)).toBe(true);
  });
});
