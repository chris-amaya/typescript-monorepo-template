import fs from 'fs-extra';
import path from 'path';
import { Feature, InstalledFeature } from '../types';

export async function getAvailableFeatures(): Promise<Feature[]> {
  // This would typically load from a registry or local feature definitions
  // For now, returning mock data
  return [
    {
      id: 'authentication-jwt',
      name: 'JWT Authentication',
      description: 'Add JWT-based authentication with refresh tokens',
      version: '1.0.0',
      author: 'Monorepo Tools',
      category: 'authentication',
      tags: ['auth', 'jwt', 'security'],
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isActive: true,
      minNodeVersion: '16.0.0',
      license: 'MIT',
    },
    {
      id: 'database-postgres',
      name: 'PostgreSQL Integration',
      description: 'Add PostgreSQL database with Prisma ORM',
      version: '1.0.0',
      author: 'Monorepo Tools',
      category: 'database',
      tags: ['database', 'postgres', 'prisma'],
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isActive: true,
      minNodeVersion: '16.0.0',
      license: 'MIT',
    },
  ];
}

export async function getInstalledFeatures(): Promise<InstalledFeature[]> {
  const configPath = path.join(process.cwd(), '.monorepo-features', 'config.json');

  if (!(await fs.pathExists(configPath))) {
    return [];
  }

  const config = await fs.readJson(configPath);
  return config.installedFeatures || [];
}

export async function validateFeatureIntegrity(): Promise<{
  issues: Array<{ feature: string; message: string; severity: 'error' | 'warning' }>;
  missingDependencies: string[];
}> {
  // This would check each installed feature's files and dependencies
  return {
    issues: [],
    missingDependencies: [],
  };
}
