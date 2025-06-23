import fs from 'fs-extra';
import path from 'path';

export interface InitResult {
  alreadyInitialized: boolean;
  configPath: string;
}

export async function initializeFeatureTracking(
  projectPath: string,
  force: boolean = false,
): Promise<InitResult> {
  const configDir = path.join(projectPath, '.monorepo-features');
  const configPath = path.join(configDir, 'config.json');

  const exists = await fs.pathExists(configPath);

  if (exists && !force) {
    return {
      alreadyInitialized: true,
      configPath,
    };
  }

  // Create config directory
  await fs.ensureDir(configDir);

  // Create initial config
  const initialConfig = {
    version: '1.0.0',
    installedFeatures: [],
    projectMetadata: {
      initializedAt: new Date().toISOString(),
      cliVersion: '0.1.0',
    },
  };

  await fs.writeJson(configPath, initialConfig, { spaces: 2 });

  // Add to .gitignore if it exists
  const gitignorePath = path.join(projectPath, '.gitignore');
  if (await fs.pathExists(gitignorePath)) {
    const gitignore = await fs.readFile(gitignorePath, 'utf-8');
    if (!gitignore.includes('.monorepo-features/')) {
      await fs.appendFile(gitignorePath, '\n# Monorepo features tracking\n.monorepo-features/\n');
    }
  }

  return {
    alreadyInitialized: false,
    configPath,
  };
}
