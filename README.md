# ts-transform-node-env-inline

* :flashlight: Inline environment variables, e.g. `process.env.NODE_ENV`
* :construction: **WIP** Statically evaluate resulting binary expressions

Inline the `NODE_ENV` environment variable and if it's a part of a binary expression
(eg. `process.env.NODE_ENV === "development"`) then statically evaluate and replace it.

## Example

**In**

```ts
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
```

**Out**

:construction: Work in progress

## Installation

```sh
npm install ts-transform-node-env-inline --save-dev
```

## Usage

:construction: Work in progress

## Prior art

* [abel-plugin-transform-node-env-inline](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-node-env-inline)

## License

MIT