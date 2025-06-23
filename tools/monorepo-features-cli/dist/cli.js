#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = require("../package.json");
const list_1 = require("./commands/list");
const add_1 = require("./commands/add");
const status_1 = require("./commands/status");
const validate_1 = require("./commands/validate");
const init_1 = require("./commands/init");
const program = new commander_1.Command();
program
    .name('monorepo-features')
    .description('CLI tool to add pre-defined features to TypeScript monorepo projects')
    .version(package_json_1.version)
    .addHelpText('after', `
${chalk_1.default.gray('Examples:')}
  $ monorepo-features list
  $ monorepo-features add authentication
  $ monorepo-features status
  
${chalk_1.default.gray('For more information, visit:')} ${chalk_1.default.blue('https://github.com/yourusername/monorepo-features-cli')}
  `);
// Add commands
program.addCommand(list_1.listCommand);
program.addCommand(add_1.addCommand);
program.addCommand(status_1.statusCommand);
program.addCommand(validate_1.validateCommand);
program.addCommand(init_1.initCommand);
// Error handling
program.on('command:*', () => {
    console.error(chalk_1.default.red('Invalid command: %s'), program.args.join(' '));
    console.log('See --help for a list of available commands.');
    process.exit(1);
});
program.parse(process.argv);
// Show help if no command is provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=cli.js.map