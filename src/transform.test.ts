import * as Test from "./test";
import * as MemFs from "memfs";

beforeEach(() => {
  MemFs.vol.reset();
});

test("noop if no env is passed", () => {
  MemFs.vol.fromJSON({ "/index.ts": "console.log(process.env.NODE_ENV)" });
  Test.compile(["/index.ts"], {}, MemFs.fs);
  expect(String(MemFs.fs.readFileSync("/index.js"))).toContain("console.log(process.env.NODE_ENV)");
});

test("replaces passed env", () => {
  MemFs.vol.fromJSON({ "/index.ts": "console.log(process.env.NODE_ENV)" });
  Test.compile(["/index.ts"], { NODE_ENV: "development" }, MemFs.fs);
  expect(String(MemFs.fs.readFileSync("/index.js"))).toContain("console.log(\"development\")");
});
