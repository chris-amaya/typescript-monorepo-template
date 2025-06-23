#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function setup() {
  console.log('🚀 Setting up your TypeScript monorepo...\n');

  const projectName = process.argv[2];
  const projectDescription = process.argv[3] || 'A TypeScript monorepo project';

  if (!projectName) {
    console.log('Usage: npm run setup <project-name> [description]');
    console.log('Example: npm run setup my-awesome-app "My awesome application"');
    process.exit(1);
  }

  console.log(`Project name: ${projectName}`);
  console.log(`Description: ${projectDescription}\n`);

  try {
    console.log('📝 Updating package.json files...');
    await replacePlaceholders('.', {
      '{{projectName}}': projectName,
      '{{ProjectName}}': projectName.charAt(0).toUpperCase() + projectName.slice(1),
      '{{projectDescription}}': projectDescription
    });

    console.log('📦 Installing dependencies...');
    execSync('pnpm install', { stdio: 'inherit' });

    console.log('🗄️  Setting up database...');
    execSync('pnpm --filter @' + projectName + '/database db:generate', { stdio: 'inherit' });

    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Set up your .env files');
    console.log('2. Configure your database connection');
    console.log('3. Run: pnpm dev');
    console.log('\nHappy coding! 🎉');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

async function replacePlaceholders(dir, replacements) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      await replacePlaceholders(filePath, replacements);
    } else if (stat.isFile() && (file.endsWith('.json') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.md'))) {
      try {
        let content = await fs.readFile(filePath, 'utf8');
        let changed = false;
        
        for (const [placeholder, replacement] of Object.entries(replacements)) {
          if (content.includes(placeholder)) {
            content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
            changed = true;
          }
        }
        
        if (changed) {
          await fs.writeFile(filePath, content);
        }
      } catch (err) {
        // Skip files that can't be read as text
      }
    }
  }
}

setup();