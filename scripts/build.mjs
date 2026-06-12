import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  symlinkSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const args = process.argv.slice(2)
const viteBin = join('node_modules', 'vite', 'bin', 'vite.js')
const hasNonAscii = /[^\x00-\x7F]/.test(root)
const needsAsciiStage = process.platform === 'win32' && hasNonAscii

function runVite(cwd) {
  const result = spawnSync(process.execPath, [join(cwd, viteBin), 'build', ...args], {
    cwd,
    stdio: 'inherit',
    shell: false,
  })

  if (result.error) {
    console.error(result.error.message)
  }

  return result
}

function copyEntry(source, target) {
  const stat = statSync(source)

  if (stat.isDirectory()) {
    mkdirSync(target, { recursive: true })
    for (const child of readdirSync(source)) {
      copyEntry(join(source, child), join(target, child))
    }
    return
  }

  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(source, target)
}

function mirrorDist(source, target) {
  const result = spawnSync(
    'robocopy',
    [source, target, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'],
    { stdio: 'ignore', shell: false },
  )

  if (result.error) throw result.error
  if ((result.status ?? 1) >= 8) {
    throw new Error(`robocopy failed with exit code ${result.status}`)
  }
}

function removeWindowsPath(path) {
  spawnSync('cmd.exe', ['/c', 'rmdir', '/s', '/q', path], {
    stdio: 'ignore',
    shell: false,
  })
}

function copyIntoStage(stage) {
  const entries = [
    'index.html',
    'vite.config.js',
    'eslint.config.js',
    'package.json',
    'package-lock.json',
    'src',
    'public',
    '.env',
    '.env.local',
    '.env.production',
    '.env.production.local',
  ]

  for (const entry of entries) {
    const source = join(root, entry)
    if (!existsSync(source)) continue
    copyEntry(source, join(stage, entry))
  }

  const nodeModules = join(root, 'node_modules')
  if (!existsSync(nodeModules)) {
    throw new Error('node_modules not found. Run npm install before building.')
  }

  symlinkSync(nodeModules, join(stage, 'node_modules'), 'junction')
}

if (!needsAsciiStage) {
  const result = runVite(root)
  process.exit(result.status ?? 1)
}

const stage = join(tmpdir(), `duoback-vite-build-${process.pid}-${Date.now()}`)

try {
  mkdirSync(stage, { recursive: true })
  copyIntoStage(stage)

  console.log(`Using ASCII build stage: ${stage}`)
  const result = runVite(stage)
  if (result.status !== 0) process.exit(result.status ?? 1)

  const sourceDist = join(stage, 'dist')
  const targetDist = join(root, 'dist')
  mirrorDist(sourceDist, targetDist)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
} finally {
  removeWindowsPath(join(stage, 'node_modules'))
  removeWindowsPath(stage)
}
