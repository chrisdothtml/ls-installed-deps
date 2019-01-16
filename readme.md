# ls-installed-deps

[![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![travis-ci build status](https://api.travis-ci.org/chrisdothtml/ls-installed-deps.svg?branch=master)](https://travis-ci.org/chrisdothtml/ls-installed-deps)
[![Coverage status](https://coveralls.io/repos/github/chrisdothtml/ls-installed-deps/badge.svg)](https://coveralls.io/github/chrisdothtml/ls-installed-deps)

> Recursively gathers names and versions of installed dependencies

The different between this package and similar existing packages is it relies entirely on your `package.json` and that of your dependencies installed in `node_modules`. Other packages (e.g. [lsmod](https://www.npmjs.com/package/lsmod)) use things like `require.cache` which is dependent on runtime of your app.

## Install

```shell
yarn add ls-installed-deps

# or npm
npm install ls-installed-deps
```

## Use

```javascript
const lsDeps = require('ls-installed-deps')

lsDeps(opts)
//> { lodash: '4.17.11' }
```

### Options

#### cwd

`String`

Default: `process.cwd()`

#### devDeps

`Boolean`

Default: `false`

Include devDependencies in the result

#### shallow

`Boolean`

Default: `false`

Instead of recursively finding all deps and sub-deps, only find top-level deps of the cwd

## License

[MIT](LICENSE)
