import { Command } from 'commander';
import chalk from 'chalk';
import { getAvailableFeatures } from '../utils/features';

export const listCommand = new Command('list')
  .description('List all available features')
  .option('-c, --category <category>', 'filter by category')
  .option('-v, --verbose', 'show detailed information')
  .action(async (options) => {
    try {
      const features = await getAvailableFeatures();

      if (features.length === 0) {
        console.log(chalk.yellow('No features available.'));
        return;
      }

      console.log(chalk.bold('\nAvailable Features:\n'));

      const filteredFeatures = options.category
        ? features.filter((f) => f.category === options.category)
        : features;

      filteredFeatures.forEach((feature) => {
        console.log(chalk.cyan(`  ${feature.id}`) + chalk.gray(` (v${feature.version})`));
        console.log(`    ${feature.description}`);

        if (options.verbose) {
          console.log(chalk.gray(`    Category: ${feature.category}`));
          console.log(chalk.gray(`    Author: ${feature.author}`));
          if (feature.tags?.length) {
            console.log(chalk.gray(`    Tags: ${feature.tags.join(', ')}`));
          }
        }
        console.log();
      });

      if (options.category && filteredFeatures.length === 0) {
        console.log(chalk.yellow(`No features found in category: ${options.category}`));
      }
    } catch (error) {
      console.error(chalk.red('Error listing features:'), error);
      process.exit(1);
    }
  });
