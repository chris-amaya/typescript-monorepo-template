import { Command } from 'commander';
import chalk from 'chalk';
import { validateProject } from '../utils/validator';
import { validateFeatureIntegrity } from '../utils/features';

export const validateCommand = new Command('validate')
  .description('Validate installed features and check for issues')
  .option('-f, --fix', 'attempt to fix issues automatically')
  .action(async (options) => {
    try {
      console.log(chalk.bold('\nValidating project...\n'));

      // Validate project structure
      const projectValidation = await validateProject(process.cwd());

      if (!projectValidation.isValid) {
        console.error(chalk.red('✗ Project validation failed'));
        console.error(chalk.gray(projectValidation.error));
        process.exit(1);
      }

      console.log(chalk.green('✓ Project structure is valid'));

      // Validate installed features
      console.log(chalk.bold('\nValidating installed features...\n'));

      const featureValidation = await validateFeatureIntegrity();

      if (featureValidation.issues.length === 0) {
        console.log(chalk.green('✓ All features are properly installed'));
      } else {
        console.log(chalk.yellow(`Found ${featureValidation.issues.length} issue(s):\n`));

        featureValidation.issues.forEach((issue, index) => {
          console.log(chalk.yellow(`${index + 1}. ${issue.feature}: ${issue.message}`));
          if (issue.severity === 'error') {
            console.log(chalk.red('   Severity: ERROR'));
          } else {
            console.log(chalk.yellow('   Severity: WARNING'));
          }
        });

        if (options.fix) {
          console.log(chalk.bold('\nAttempting to fix issues...\n'));
          // Implement fix logic
          console.log(chalk.gray('Fix functionality not yet implemented'));
        } else {
          console.log(chalk.gray('\nUse --fix to attempt automatic fixes'));
        }
      }

      // Check for dependency issues
      console.log(chalk.bold('\nChecking dependencies...\n'));

      if (featureValidation.missingDependencies.length === 0) {
        console.log(chalk.green('✓ All dependencies satisfied'));
      } else {
        console.log(chalk.red('✗ Missing dependencies:'));
        featureValidation.missingDependencies.forEach((dep) => {
          console.log(chalk.red(`  - ${dep}`));
        });
      }
    } catch (error) {
      console.error(chalk.red('Error during validation:'), error);
      process.exit(1);
    }
  });
