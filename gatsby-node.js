const path = require("path")
const fs = require("fs")
const { execSync } = require("child_process")
const { isCI, getCIName } = require(`gatsby-core-utils`)
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
function exec(cmd) {
  return execSync(cmd).toString('utf8')
}
exports.onPreBuild = function () {
  console.log(`aw yeah`)

  console.log(JSON.stringify({
    is: isCI(),
    name: getCIName(),
  }, null, 2))
  console.log(exec(`env`))
  console.log(exec(`cat $HOME/.config/gatsby/config.json`))
  console.log(exec(`git remote -v`))

  console.log(`aw yeah`)
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  fs.writeFileSync(
    `./public/debug.txt`,
    JSON.stringify(
      {
        sessionID: process.gatsbyTelemetrySessionId,
        lol: 1,
        env: JSON.stringify(process.env),
      },
      null,
      2
    )
  )
}
