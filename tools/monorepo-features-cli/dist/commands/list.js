"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = void 0;
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const features_1 = require("../utils/features");
exports.listCommand = new commander_1.Command('list')
    .description('List all available features')
    .option('-c, --category <category>', 'filter by category')
    .option('-v, --verbose', 'show detailed information')
    .action(async (options) => {
    try {
        const features = await (0, features_1.getAvailableFeatures)();
        if (features.length === 0) {
            console.log(chalk_1.default.yellow('No features available.'));
            return;
        }
        console.log(chalk_1.default.bold('\nAvailable Features:\n'));
        const filteredFeatures = options.category
            ? features.filter((f) => f.category === options.category)
            : features;
        filteredFeatures.forEach((feature) => {
            console.log(chalk_1.default.cyan(`  ${feature.id}`) + chalk_1.default.gray(` (v${feature.version})`));
            console.log(`    ${feature.description}`);
            if (options.verbose) {
                console.log(chalk_1.default.gray(`    Category: ${feature.category}`));
                console.log(chalk_1.default.gray(`    Author: ${feature.author}`));
                if (feature.tags?.length) {
                    console.log(chalk_1.default.gray(`    Tags: ${feature.tags.join(', ')}`));
                }
            }
            console.log();
        });
        if (options.category && filteredFeatures.length === 0) {
            console.log(chalk_1.default.yellow(`No features found in category: ${options.category}`));
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error listing features:'), error);
        process.exit(1);
    }
});
//# sourceMappingURL=list.js.map