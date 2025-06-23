import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'apps/web',
  'apps/api-server', 
  'packages/core',
  'packages/shared',
  'packages/database'
])