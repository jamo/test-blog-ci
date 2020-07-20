const path = require("path")
const fs = require("fs")
const { execSync } = require("child_process")
const { isCI, getCIName } = require(`gatsby-core-utils`)
const multiIni = require('multi-ini')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
function exec(cmd) {
  console.log(`cmd:`, execSync(cmd).toString("utf8"))
}
exports.onPreBuild = function () {
  console.log(`aw yeah`)

  console.log(
    JSON.stringify(
      {
        is: isCI(),
        name: getCIName(),
      },
      null,
      2
    )
  )

  //exec(`env`)
  exec(`cat $HOME/.config/gatsby/config.json`)

  const gitConfigPath = `.git/config`
  if (!fs.existsSync(gitConfigPath)) {
    return null
  } else {
    const config = multiIni.read(`.git/config`)
    console.log(config)
    console.log(config[`remote "origin"`])
  }
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
