"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const features_1 = require("../utils/features");
const validator_1 = require("../utils/validator");
exports.statusCommand = new commander_1.Command('status')
    .description('Show installed features and project status')
    .action(async () => {
    try {
        // Validate project
        const validation = await (0, validator_1.validateProject)(process.cwd());
        if (!validation.isValid) {
            console.error(chalk_1.default.red('Not a valid monorepo project'));
            console.error(chalk_1.default.gray(validation.error));
            process.exit(1);
        }
        console.log(chalk_1.default.bold('\nProject Status\n'));
        console.log(chalk_1.default.gray('Project:'), validation.projectName);
        console.log(chalk_1.default.gray('Type:'), validation.projectType);
        console.log(chalk_1.default.gray('Location:'), process.cwd());
        // Get installed features
        const installedFeatures = await (0, features_1.getInstalledFeatures)();
        console.log(chalk_1.default.bold('\nInstalled Features:\n'));
        if (installedFeatures.length === 0) {
            console.log(chalk_1.default.gray('  No features installed yet.'));
            console.log(chalk_1.default.gray('  Run'), chalk_1.default.cyan('monorepo-features list'), chalk_1.default.gray('to see available features.'));
        }
        else {
            installedFeatures.forEach((feature) => {
                console.log(chalk_1.default.green('  ✓'), chalk_1.default.cyan(feature.id), chalk_1.default.gray(`(v${feature.version})`));
                console.log(`    ${feature.description}`);
                if (feature.installedAt) {
                    console.log(chalk_1.default.gray(`    Installed: ${new Date(feature.installedAt).toLocaleDateString()}`));
                }
            });
        }
        console.log();
    }
    catch (error) {
        console.error(chalk_1.default.red('Error checking status:'), error);
        process.exit(1);
    }
});
//# sourceMappingURL=status.js.map