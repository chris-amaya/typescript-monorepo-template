import { Command } from 'commander';
import chalk from 'chalk';
import { initializeFeatureTracking } from '../utils/initializer';
import { validateProject } from '../utils/validator';

export const initCommand = new Command('init')
  .description('Initialize feature tracking in your project')
  .option('-f, --force', 'force initialization even if already initialized')
  .action(async (options) => {
    try {
      console.log(chalk.bold('\nInitializing feature tracking...\n'));

      // Validate project first
      const validation = await validateProject(process.cwd());

      if (!validation.isValid) {
        console.error(chalk.red('✗ Not a valid monorepo project'));
        console.error(chalk.gray(validation.error));
        console.log(
          chalk.yellow('\nMake sure you are in a TypeScript monorepo project directory.'),
        );
        process.exit(1);
      }

      // Initialize feature tracking
      const result = await initializeFeatureTracking(process.cwd(), options.force);

      if (result.alreadyInitialized && !options.force) {
        console.log(chalk.yellow('✓ Feature tracking already initialized'));
        console.log(chalk.gray('Use --force to reinitialize'));
      } else {
        console.log(chalk.green('✓ Feature tracking initialized successfully'));
        console.log(chalk.gray(`  Created: ${result.configPath}`));
      }

      console.log(chalk.bold('\nNext steps:'));
      console.log('  1. Run', chalk.cyan('monorepo-features list'), 'to see available features');
      console.log(
        '  2. Run',
        chalk.cyan('monorepo-features add <feature>'),
        'to install a feature',
      );
      console.log(
        '  3. Run',
        chalk.cyan('monorepo-features status'),
        'to check installed features',
      );
    } catch (error) {
      console.error(chalk.red('Error during initialization:'), error);
      process.exit(1);
    }
  });
