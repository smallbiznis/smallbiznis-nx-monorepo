#!/usr/bin/env node

// Lightweight build orchestrator that respects BUILD_TARGET for tenant-only deploys
const { execSync } = require("node:child_process")
const { existsSync } = require("node:fs")
const path = require("node:path")

const workspaceRoot = path.resolve(__dirname, "../../")
const buildTarget = process.env.BUILD_TARGET ?? "platform"
const projects = ["console"]

const adminPath = path.join(workspaceRoot, "apps", "admin")
if (buildTarget !== "tenant" && existsSync(adminPath)) {
  projects.push("admin")
}

const command = `npx nx run-many -t build --projects=${projects.join(",")}`

console.log(`🏗️  BUILD_TARGET=${buildTarget} → ${projects.join(", ")}`)

try {
  execSync(command, { stdio: "inherit", cwd: workspaceRoot })
} catch (error) {
  console.error("Build failed", error)
  process.exit(1)
}
