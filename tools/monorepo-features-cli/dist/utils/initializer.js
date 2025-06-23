"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFeatureTracking = initializeFeatureTracking;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function initializeFeatureTracking(projectPath, force = false) {
    const configDir = path_1.default.join(projectPath, '.monorepo-features');
    const configPath = path_1.default.join(configDir, 'config.json');
    const exists = await fs_extra_1.default.pathExists(configPath);
    if (exists && !force) {
        return {
            alreadyInitialized: true,
            configPath
        };
    }
    // Create config directory
    await fs_extra_1.default.ensureDir(configDir);
    // Create initial config
    const initialConfig = {
        version: '1.0.0',
        installedFeatures: [],
        projectMetadata: {
            initializedAt: new Date().toISOString(),
            cliVersion: '0.1.0'
        }
    };
    await fs_extra_1.default.writeJson(configPath, initialConfig, { spaces: 2 });
    // Add to .gitignore if it exists
    const gitignorePath = path_1.default.join(projectPath, '.gitignore');
    if (await fs_extra_1.default.pathExists(gitignorePath)) {
        const gitignore = await fs_extra_1.default.readFile(gitignorePath, 'utf-8');
        if (!gitignore.includes('.monorepo-features/')) {
            await fs_extra_1.default.appendFile(gitignorePath, '\n# Monorepo features tracking\n.monorepo-features/\n');
        }
    }
    return {
        alreadyInitialized: false,
        configPath
    };
}
//# sourceMappingURL=initializer.js.map