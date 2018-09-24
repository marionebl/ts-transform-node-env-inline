import * as Test from "./test";
import * as MemFs from "memfs";

beforeEach(() => {
  MemFs.vol.reset();
});

test("noop if no env is passed", () => {
  MemFs.vol.fromJSON({ "/index.ts": "console.log(process.env.NODE_ENV)" });
  Test.compile(["/index.ts"], undefined, MemFs.fs);
  expect(String(MemFs.fs.readFileSync("/index.js"))).toContain("console.log(process.env.NODE_ENV)");
});

test("replaces passed env", () => {
  MemFs.vol.fromJSON({ "/index.ts": "console.log(process.env.NODE_ENV)" });
  Test.compile(["/index.ts"], { NODE_ENV: "development" }, MemFs.fs);
  expect(String(MemFs.fs.readFileSync("/index.js"))).toContain("console.log(\"development\")");
});

test("works with other keys and values", () => {
  MemFs.vol.fromJSON({ "/index.ts": "console.log(process.env.NODE_DEBUG)" });
  Test.compile(["/index.ts"], { NODE_ENV: "development", NODE_DEBUG: "patternplate" }, MemFs.fs);
  expect(String(MemFs.fs.readFileSync("/index.js"))).toContain("console.log(\"patternplate\")");
});