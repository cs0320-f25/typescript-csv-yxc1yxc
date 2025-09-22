import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
// Define an interface for the parser result
export interface ParseResult<T> {
  data: T[];
  errors: Array<{
    line: string;
    lineNumber: number;
    error: z.ZodError;
  }>;
}


/**
 * @param path The path to the file being loaded.
 * @param schema Optional Zod schema to validate each row against.
 * @returns either a list of ParseResult if schema is provided, or a 2-d array of strings otherwise.
 */
export async function parseCSV<T>(path: string, schema?: z.ZodType<T>): Promise<ParseResult<T> | string[][]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create arrays to hold the results and errors
  let data = []
  let oldData = []
  let errors: Array<{ line: string; lineNumber: number; error: z.ZodError }> = [];
  let lineNumber = 0;
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    lineNumber++;
    const values = line.split(",").map((v) => v.trim());
    
    if(schema) {
      const parseResult = schema.safeParse(values);
      if(parseResult.success) {
        data.push(parseResult.data);
      } else {
        errors.push({
          line,
          lineNumber,
          error: parseResult.error
        });
      }
    } else {
      oldData.push(values);
    }
  }
  
  if(schema) {
    return {
    data,
    errors
    }
  }else{
    return oldData;
  }
}