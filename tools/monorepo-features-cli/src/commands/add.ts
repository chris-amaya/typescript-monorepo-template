import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { installFeature } from '../utils/installer';
import { validateProject } from '../utils/validator';
import { checkConflicts } from '../utils/conflicts';

export const addCommand = new Command('add')
  .description('Install a feature to your project')
  .argument('<feature>', 'feature ID to install')
  .option('-d, --dry-run', 'preview changes without installing')
  .option('-f, --force', 'force installation even with conflicts')
  .option('-y, --yes', 'skip confirmation prompts')
  .action(async (featureId: string, options) => {
    const spinner = ora();

    try {
      // Validate project compatibility
      spinner.start('Validating project...');
      const validation = await validateProject(process.cwd());

      if (!validation.isValid) {
        spinner.fail('Project validation failed');
        console.error(chalk.red(validation.error));
        process.exit(1);
      }
      spinner.succeed('Project validated');

      // Check for conflicts
      if (!options.force) {
        spinner.start('Checking for conflicts...');
        const conflicts = await checkConflicts(featureId);

        if (conflicts.length > 0) {
          spinner.fail('Conflicts detected');
          console.log(chalk.yellow('\nThe following conflicts were found:'));
          conflicts.forEach((conflict) => {
            console.log(chalk.yellow(`  - ${conflict}`));
          });
          console.log('\nUse --force to install anyway.');
          process.exit(1);
        }
        spinner.succeed('No conflicts found');
      }

      // Install feature
      if (options.dryRun) {
        console.log(chalk.blue('\n[DRY RUN] Would install feature:'), featureId);
        // Show what would be done
        return;
      }

      spinner.start(`Installing feature: ${featureId}`);
      const result = await installFeature(featureId, options);
      spinner.succeed(`Feature installed: ${featureId}`);

      // Show post-installation instructions
      if (result.instructions) {
        console.log(chalk.green('\n✓ Installation complete!'));
        console.log(chalk.bold('\nNext steps:'));
        console.log(result.instructions);
      }
    } catch (error) {
      spinner.fail('Installation failed');
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });
