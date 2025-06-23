"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const initializer_1 = require("../utils/initializer");
const validator_1 = require("../utils/validator");
exports.initCommand = new commander_1.Command('init')
    .description('Initialize feature tracking in your project')
    .option('-f, --force', 'force initialization even if already initialized')
    .action(async (options) => {
    try {
        console.log(chalk_1.default.bold('\nInitializing feature tracking...\n'));
        // Validate project first
        const validation = await (0, validator_1.validateProject)(process.cwd());
        if (!validation.isValid) {
            console.error(chalk_1.default.red('✗ Not a valid monorepo project'));
            console.error(chalk_1.default.gray(validation.error));
            console.log(chalk_1.default.yellow('\nMake sure you are in a TypeScript monorepo project directory.'));
            process.exit(1);
        }
        // Initialize feature tracking
        const result = await (0, initializer_1.initializeFeatureTracking)(process.cwd(), options.force);
        if (result.alreadyInitialized && !options.force) {
            console.log(chalk_1.default.yellow('✓ Feature tracking already initialized'));
            console.log(chalk_1.default.gray('Use --force to reinitialize'));
        }
        else {
            console.log(chalk_1.default.green('✓ Feature tracking initialized successfully'));
            console.log(chalk_1.default.gray(`  Created: ${result.configPath}`));
        }
        console.log(chalk_1.default.bold('\nNext steps:'));
        console.log('  1. Run', chalk_1.default.cyan('monorepo-features list'), 'to see available features');
        console.log('  2. Run', chalk_1.default.cyan('monorepo-features add <feature>'), 'to install a feature');
        console.log('  3. Run', chalk_1.default.cyan('monorepo-features status'), 'to check installed features');
    }
    catch (error) {
        console.error(chalk_1.default.red('Error during initialization:'), error);
        process.exit(1);
    }
});
//# sourceMappingURL=init.js.map