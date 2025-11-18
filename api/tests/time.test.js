const { addMinutes, toHHMM } = require("../src/time");

describe("time utils", () => {
  test("addMinutes basic", () => {
    const d = new Date(2025, 0, 1, 10, 0, 0);
    const r = addMinutes(d, 5);
    expect(r.getHours()).toBe(10);
    expect(r.getMinutes()).toBe(5);
  });

  test("toHHMM basic", () => {
    const d = new Date(2025, 0, 1, 3, 7, 0);
    const s = toHHMM(d);
    expect(s).toBe("03:07");
  });
});
