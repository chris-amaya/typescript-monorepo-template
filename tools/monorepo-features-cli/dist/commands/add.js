"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const installer_1 = require("../utils/installer");
const validator_1 = require("../utils/validator");
const conflicts_1 = require("../utils/conflicts");
exports.addCommand = new commander_1.Command('add')
    .description('Install a feature to your project')
    .argument('<feature>', 'feature ID to install')
    .option('-d, --dry-run', 'preview changes without installing')
    .option('-f, --force', 'force installation even with conflicts')
    .option('-y, --yes', 'skip confirmation prompts')
    .action(async (featureId, options) => {
    const spinner = (0, ora_1.default)();
    try {
        // Validate project compatibility
        spinner.start('Validating project...');
        const validation = await (0, validator_1.validateProject)(process.cwd());
        if (!validation.isValid) {
            spinner.fail('Project validation failed');
            console.error(chalk_1.default.red(validation.error));
            process.exit(1);
        }
        spinner.succeed('Project validated');
        // Check for conflicts
        if (!options.force) {
            spinner.start('Checking for conflicts...');
            const conflicts = await (0, conflicts_1.checkConflicts)(featureId);
            if (conflicts.length > 0) {
                spinner.fail('Conflicts detected');
                console.log(chalk_1.default.yellow('\nThe following conflicts were found:'));
                conflicts.forEach(conflict => {
                    console.log(chalk_1.default.yellow(`  - ${conflict}`));
                });
                console.log('\nUse --force to install anyway.');
                process.exit(1);
            }
            spinner.succeed('No conflicts found');
        }
        // Install feature
        if (options.dryRun) {
            console.log(chalk_1.default.blue('\n[DRY RUN] Would install feature:'), featureId);
            // Show what would be done
            return;
        }
        spinner.start(`Installing feature: ${featureId}`);
        const result = await (0, installer_1.installFeature)(featureId, options);
        spinner.succeed(`Feature installed: ${featureId}`);
        // Show post-installation instructions
        if (result.instructions) {
            console.log(chalk_1.default.green('\n✓ Installation complete!'));
            console.log(chalk_1.default.bold('\nNext steps:'));
            console.log(result.instructions);
        }
    }
    catch (error) {
        spinner.fail('Installation failed');
        console.error(chalk_1.default.red('Error:'), error);
        process.exit(1);
    }
});
//# sourceMappingURL=add.js.map