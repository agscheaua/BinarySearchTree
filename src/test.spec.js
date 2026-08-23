import {mergeSort} from "./index.js";

describe("mergeSort test to see its behaivour with multiple numbers", () => {
  test("test with 3 numbers", () => {
    const arr1 = mergeSort([3,2,1]);
    expect(arr1).toEqual([1,2,3]);
  });
});