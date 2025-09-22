import { parseCSV, ParseResult } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const test_file_path = path.join(__dirname, "../data/test.csv");
const test_file_path2 = path.join(__dirname, "../data/test2.csv");

export const PersonRowSchema = z.tuple([z.string(), z.coerce.number()]).transform( tup => ({name: tup[0], age: tup[1]}));


test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][]
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][]
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("comma within quotes", async () => {
  const results = await parseCSV(test_file_path) as string[][]
  expect(results).toHaveLength(2);
  console.log(results[1])
  expect(results[1]).toEqual(["Alice", "test, test"]);
});

test("next line character", async () => {
  const results = await parseCSV(test_file_path2) as string[][]
  expect(results).toHaveLength(2);
});

test("parseCSV with schema", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema) as ParseResult<{name: string; age: number}>
  
  expect(results.data).toHaveLength(3);
  expect(results.data[0].name).toEqual("Alice");
  expect(results.data[0].age).toEqual(23);
  expect(results.data[1].name).toEqual("Charlie");
  expect(results.data[1].age).toEqual(25);
  expect(results.data[2].name).toEqual("Nim");
  expect(results.data[2].age).toEqual(22);

  expect(results.errors).toHaveLength(2);
  expect(results.errors[0].lineNumber).toEqual(1);
  expect(results.errors[0].line).toEqual("name,age");
  expect(results.errors[1].lineNumber).toEqual(3);
  expect(results.errors[1].line).toEqual("Bob,thirty");
});




type LinkedListNode = {
  data: string;
  next: LinkedListNode | null;
};

const LinkedListSchema: z.ZodType<LinkedListNode> = z.object({
  data: z.string(),  // or whatever type your data is
  next: z.lazy(() => LinkedListSchema.nullable())
});

test("LinkedListSchema validates correct structure", () => {
  // Valid single node
  const singleNode = {
    data: "only node",
    next: null
  };
  expect(LinkedListSchema.safeParse(singleNode).success).toBe(true);

  // Valid two nodes
  const twoNodes = {
    data: "first",
    next: {
      data: "second",
      next: null
    }
  };
  expect(LinkedListSchema.safeParse(twoNodes).success).toBe(true);

  // Invalid: missing data field
  const missingData = {
    next: null
  };
  expect(LinkedListSchema.safeParse(missingData).success).toBe(false);

  // Invalid: wrong data type
  const wrongDataType = {
    data: 123, // should be string
    next: null
  };
  expect(LinkedListSchema.safeParse(wrongDataType).success).toBe(false);

  // Invalid: wrong next type
  const wrongNextType = {
    data: "test",
    next: "not a node or null"
  };
  expect(LinkedListSchema.safeParse(wrongNextType).success).toBe(false);
});







