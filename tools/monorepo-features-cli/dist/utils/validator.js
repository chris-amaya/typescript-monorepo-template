"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProject = validateProject;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function validateProject(projectPath) {
    try {
        // Check for package.json
        const packageJsonPath = path_1.default.join(projectPath, 'package.json');
        if (!(await fs_extra_1.default.pathExists(packageJsonPath))) {
            return {
                isValid: false,
                error: 'No package.json found in project directory',
            };
        }
        const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
        // Check for monorepo indicators
        const hasWorkspaces = !!packageJson.workspaces;
        const hasPnpmWorkspace = await fs_extra_1.default.pathExists(path_1.default.join(projectPath, 'pnpm-workspace.yaml'));
        const hasLernaJson = await fs_extra_1.default.pathExists(path_1.default.join(projectPath, 'lerna.json'));
        const hasTurboJson = await fs_extra_1.default.pathExists(path_1.default.join(projectPath, 'turbo.json'));
        if (!hasWorkspaces && !hasPnpmWorkspace && !hasLernaJson) {
            return {
                isValid: false,
                error: 'Project does not appear to be a monorepo (no workspaces configuration found)',
            };
        }
        // Check for TypeScript
        const hasTsConfig = await fs_extra_1.default.pathExists(path_1.default.join(projectPath, 'tsconfig.json'));
        if (!hasTsConfig) {
            return {
                isValid: false,
                error: 'No TypeScript configuration found (tsconfig.json missing)',
            };
        }
        // Determine project type
        let projectType = 'Unknown monorepo';
        if (hasPnpmWorkspace)
            projectType = 'pnpm workspace';
        else if (hasLernaJson)
            projectType = 'Lerna monorepo';
        else if (hasTurboJson)
            projectType = 'Turborepo';
        else if (hasWorkspaces)
            projectType = 'Yarn/npm workspaces';
        return {
            isValid: true,
            projectName: packageJson.name || 'Unnamed project',
            projectType,
        };
    }
    catch (error) {
        return {
            isValid: false,
            error: `Error validating project: ${error}`,
        };
    }
}
//# sourceMappingURL=validator.js.map