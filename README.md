# ts-transform-node-env-inline

* :flashlight: Inline environment variables, e.g. `process.env.NODE_ENV`

Inline environment variables.

## Example

**In**

```ts
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
```

```js 
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2015",
    "plugins": [
      {
        "transform": "../lib",
        "type": "config",
        "env": { "NODE_ENV": "hello-world" }
      }
    ]
  }
}
```

**Out**

```ts
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
```

## Installation

```sh
npm install ts-transform-node-env-inline ttypescript --save-dev
```

## Usage


```js 
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2015",
    "plugins": [
      {
        "transform": "../lib",
        "type": "config",
        "env": { "NODE_ENV": "production" }
      }
    ]
  }
}
```

See [TTypeScript](https://github.com/cevek/ttypescript#how-to-use) for docs about integration with other toolchains.

---

See [./example](./example) for a basic setup based on [TTypeScript](https://github.com/cevek/ttypescript)

## Prior art

* [abel-plugin-transform-node-env-inline](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-node-env-inline)

## License

MIT