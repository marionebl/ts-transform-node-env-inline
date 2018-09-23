import * as MemFs from "memfs";
import * as ts from 'typescript';
import { getTransformer } from '../transform';

export interface Env { [key: string]: string }

export function compile(filePaths: string[], env: Env, fs: MemFs.IFs): void {
  const options = {
    strict: true,
    noEmitOnError: true,
    suppressImplicitAnyIndexErrors: true,
    target: ts.ScriptTarget.ES2015
  };

  const host = ts.createCompilerHost(options);

  const _fileExists = host.fileExists;
  host.fileExists = file => fs.existsSync(file) || _fileExists(file);

  const _getSourceFile = host.getSourceFile;
  host.getSourceFile = (filename, version) => fs.existsSync(filename) 
    ? ts.createSourceFile(filename, String(fs.readFileSync(filename)), version)
    : _getSourceFile(filename, version);

  host.writeFile = (filename, data) => fs.writeFileSync(filename, data);

  const program = ts.createProgram(filePaths, options, host);
  
  const transformers: ts.CustomTransformers = {
    before: [getTransformer({ env })],
    after: []
  };
  
  const { emitSkipped, diagnostics } = program.emit(undefined, undefined, undefined, false, transformers);

  if (emitSkipped) {
    throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
  }
}
