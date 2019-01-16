// @flow
const fs = require('fs')
const path = require('path')

/*::
type Opts = {
  // $FlowFixMe: flow can't tell I'm handling undefined value for this
  cwd?: string,
  devDeps?: boolean,
  shallow?: boolean,
};
*/

function getPackage (dirpath /*: string */) /*: Object | null */ {
  try {
    const pkgPath = path.join(dirpath, 'package.json')
    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  } catch (e) {
    return null
  }
}

module.exports = function lsDeps (opts /*: Opts */ = {}) /*: Object */ {
  opts.cwd = opts.cwd || process.cwd()

  const nodeModulesPath = path.join(opts.cwd, 'node_modules')
  const result = {}
  const seen = []

  ;(function getDeps (dirpath /*: string */, pkgName /* ?: string */) {
    if (pkgName && seen.includes(pkgName)) {
      return
    }

    const pkgJSON = getPackage(dirpath)

    if (pkgJSON) {
      if (pkgName) {
        seen.push(pkgName)
        result[pkgName] = pkgJSON.version
      }

      if (!pkgName || !opts.shallow) {
        let deps = Object.keys(pkgJSON.dependencies || {})

        if (opts.devDeps) {
          deps = deps.concat(
            Object.keys(pkgJSON.devDependencies || {})
          )
        }

        for (const depName of deps) {
          getDeps(path.join(nodeModulesPath, depName), depName)
        }
      }
    }
  })(opts.cwd)

  return result
}
