#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { version } from '../package.json';
import { listCommand } from './commands/list';
import { addCommand } from './commands/add';
import { statusCommand } from './commands/status';
import { validateCommand } from './commands/validate';
import { initCommand } from './commands/init';

const program = new Command();

program
  .name('monorepo-features')
  .description('CLI tool to add pre-defined features to TypeScript monorepo projects')
  .version(version)
  .addHelpText(
    'after',
    `
${chalk.gray('Examples:')}
  $ monorepo-features list
  $ monorepo-features add authentication
  $ monorepo-features status
  
${chalk.gray('For more information, visit:')} ${chalk.blue('https://github.com/yourusername/monorepo-features-cli')}
  `,
  );

// Add commands
program.addCommand(listCommand);
program.addCommand(addCommand);
program.addCommand(statusCommand);
program.addCommand(validateCommand);
program.addCommand(initCommand);

// Error handling
program.on('command:*', () => {
  console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
  console.log('See --help for a list of available commands.');
  process.exit(1);
});

program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
