// @noflow
const lsDeps = require('../index.js')
const path = require('path')
const pkg = require('../package.json')
const test = require('ava')

const FIXTURE_PATH = path.join(__dirname, 'fixture')

test('lsDeps', (t) => {
  const depsNoDev = Object.keys(pkg.dependencies || {})
  const allDeps = Object.keys(pkg.devDependencies || {}).concat(depsNoDev)
  const noDevResult = lsDeps()
  const devResult = lsDeps({ devDeps: true })

  for (const depName of depsNoDev) {
    t.true(noDevResult.hasOwnProperty(depName))
  }

  for (const depName of allDeps) {
    t.true(devResult.hasOwnProperty(depName))
  }
})

test('opts.cwd', (t) => {
  t.deepEqual(lsDeps({ cwd: FIXTURE_PATH }), {
    foo: '0.0.0',
    bar: '0.0.0',
    baz: '0.0.0'
  })
})

test('opts.devDeps', (t) => {
  t.deepEqual(lsDeps({ cwd: FIXTURE_PATH, devDeps: true }), {
    foo: '0.0.0',
    bar: '0.0.0',
    baz: '0.0.0',
    qux: '0.0.0'
  })
})

test('opts.shallow', (t) => {
  t.deepEqual(lsDeps({ cwd: FIXTURE_PATH, shallow: true }), {
    foo: '0.0.0',
    bar: '0.0.0'
  })
})
