"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const validator_1 = require("../utils/validator");
const features_1 = require("../utils/features");
exports.validateCommand = new commander_1.Command('validate')
    .description('Validate installed features and check for issues')
    .option('-f, --fix', 'attempt to fix issues automatically')
    .action(async (options) => {
    try {
        console.log(chalk_1.default.bold('\nValidating project...\n'));
        // Validate project structure
        const projectValidation = await (0, validator_1.validateProject)(process.cwd());
        if (!projectValidation.isValid) {
            console.error(chalk_1.default.red('✗ Project validation failed'));
            console.error(chalk_1.default.gray(projectValidation.error));
            process.exit(1);
        }
        console.log(chalk_1.default.green('✓ Project structure is valid'));
        // Validate installed features
        console.log(chalk_1.default.bold('\nValidating installed features...\n'));
        const featureValidation = await (0, features_1.validateFeatureIntegrity)();
        if (featureValidation.issues.length === 0) {
            console.log(chalk_1.default.green('✓ All features are properly installed'));
        }
        else {
            console.log(chalk_1.default.yellow(`Found ${featureValidation.issues.length} issue(s):\n`));
            featureValidation.issues.forEach((issue, index) => {
                console.log(chalk_1.default.yellow(`${index + 1}. ${issue.feature}: ${issue.message}`));
                if (issue.severity === 'error') {
                    console.log(chalk_1.default.red('   Severity: ERROR'));
                }
                else {
                    console.log(chalk_1.default.yellow('   Severity: WARNING'));
                }
            });
            if (options.fix) {
                console.log(chalk_1.default.bold('\nAttempting to fix issues...\n'));
                // Implement fix logic
                console.log(chalk_1.default.gray('Fix functionality not yet implemented'));
            }
            else {
                console.log(chalk_1.default.gray('\nUse --fix to attempt automatic fixes'));
            }
        }
        // Check for dependency issues
        console.log(chalk_1.default.bold('\nChecking dependencies...\n'));
        if (featureValidation.missingDependencies.length === 0) {
            console.log(chalk_1.default.green('✓ All dependencies satisfied'));
        }
        else {
            console.log(chalk_1.default.red('✗ Missing dependencies:'));
            featureValidation.missingDependencies.forEach(dep => {
                console.log(chalk_1.default.red(`  - ${dep}`));
            });
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error during validation:'), error);
        process.exit(1);
    }
});
//# sourceMappingURL=validate.js.map