import { Command } from 'commander';
import chalk from 'chalk';
import { getInstalledFeatures } from '../utils/features';
import { validateProject } from '../utils/validator';

export const statusCommand = new Command('status')
  .description('Show installed features and project status')
  .action(async () => {
    try {
      // Validate project
      const validation = await validateProject(process.cwd());

      if (!validation.isValid) {
        console.error(chalk.red('Not a valid monorepo project'));
        console.error(chalk.gray(validation.error));
        process.exit(1);
      }

      console.log(chalk.bold('\nProject Status\n'));
      console.log(chalk.gray('Project:'), validation.projectName);
      console.log(chalk.gray('Type:'), validation.projectType);
      console.log(chalk.gray('Location:'), process.cwd());

      // Get installed features
      const installedFeatures = await getInstalledFeatures();

      console.log(chalk.bold('\nInstalled Features:\n'));

      if (installedFeatures.length === 0) {
        console.log(chalk.gray('  No features installed yet.'));
        console.log(
          chalk.gray('  Run'),
          chalk.cyan('monorepo-features list'),
          chalk.gray('to see available features.'),
        );
      } else {
        installedFeatures.forEach((feature) => {
          console.log(
            chalk.green('  ✓'),
            chalk.cyan(feature.id),
            chalk.gray(`(v${feature.version})`),
          );
          console.log(`    ${feature.description}`);
          if (feature.installedAt) {
            console.log(
              chalk.gray(`    Installed: ${new Date(feature.installedAt).toLocaleDateString()}`),
            );
          }
        });
      }

      console.log();
    } catch (error) {
      console.error(chalk.red('Error checking status:'), error);
      process.exit(1);
    }
  });
