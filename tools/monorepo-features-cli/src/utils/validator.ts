import fs from 'fs-extra';
import path from 'path';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  projectName?: string;
  projectType?: string;
}

export async function validateProject(projectPath: string): Promise<ValidationResult> {
  try {
    // Check for package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!(await fs.pathExists(packageJsonPath))) {
      return {
        isValid: false,
        error: 'No package.json found in project directory',
      };
    }

    const packageJson = await fs.readJson(packageJsonPath);

    // Check for monorepo indicators
    const hasWorkspaces = !!packageJson.workspaces;
    const hasPnpmWorkspace = await fs.pathExists(path.join(projectPath, 'pnpm-workspace.yaml'));
    const hasLernaJson = await fs.pathExists(path.join(projectPath, 'lerna.json'));
    const hasTurboJson = await fs.pathExists(path.join(projectPath, 'turbo.json'));

    if (!hasWorkspaces && !hasPnpmWorkspace && !hasLernaJson) {
      return {
        isValid: false,
        error: 'Project does not appear to be a monorepo (no workspaces configuration found)',
      };
    }

    // Check for TypeScript
    const hasTsConfig = await fs.pathExists(path.join(projectPath, 'tsconfig.json'));
    if (!hasTsConfig) {
      return {
        isValid: false,
        error: 'No TypeScript configuration found (tsconfig.json missing)',
      };
    }

    // Determine project type
    let projectType = 'Unknown monorepo';
    if (hasPnpmWorkspace) projectType = 'pnpm workspace';
    else if (hasLernaJson) projectType = 'Lerna monorepo';
    else if (hasTurboJson) projectType = 'Turborepo';
    else if (hasWorkspaces) projectType = 'Yarn/npm workspaces';

    return {
      isValid: true,
      projectName: packageJson.name || 'Unnamed project',
      projectType,
    };
  } catch (error) {
    return {
      isValid: false,
      error: `Error validating project: ${error}`,
    };
  }
}
