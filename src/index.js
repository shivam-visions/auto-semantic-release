#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { prompt } = require('enquirer');

const defaultPlugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  "@semantic-release/changelog",
  "@semantic-release/npm",
  "@semantic-release/github",
  ["@semantic-release/git", { assets: ["CHANGELOG.md"] }]
];

const setupSemanticRelease = async () => {
  console.log(chalk.green("Welcome to Semantic Release Helper!"));

  // Check if .releaserc.json already exists
  const releasercPath = path.join(process.cwd(), '.releaserc.json');
  if (fs.existsSync(releasercPath)) {
    console.log(chalk.red("Semantic Release is already configured in this project."));
    return;
  }

  // Prompt user for setup options
  const response = await prompt([
    {
      type: 'input',
      name: 'branches',
      message: 'Which branches should trigger releases? (comma-separated)',
      initial: 'main', // Default to 'main'
    },
    {
      type: 'confirm',
      name: 'addPlugins',
      message: 'Do you want to customize plugins?',
      initial: false,
    }
  ]);

  // Process branches input
  let branches = response.branches.split(',').map(branch => branch.trim()).filter(Boolean); // Remove empty entries

  // Ensure that at least one branch is specified
  if (branches.length === 0) {
    console.log(chalk.yellow("No branches specified. Using default 'main' branch."));
    branches = ['main']; // Default to 'main' if no valid branches are provided
  }

  let plugins = defaultPlugins;

  if (response.addPlugins) {
    const pluginChoices = defaultPlugins.map(plugin => (typeof plugin === 'string' ? plugin : plugin[0]));
    const pluginResponse = await prompt({
      type: 'multiselect',
      name: 'selectedPlugins',
      message: 'Select plugins to include:',
      choices: pluginChoices,
      initial: pluginChoices,
    });
    plugins = defaultPlugins.filter(plugin =>
      pluginResponse.selectedPlugins.includes(typeof plugin === 'string' ? plugin : plugin[0])
    );
  }

  // Write the configuration file
  const releaseConfig = { branches, plugins };
  fs.writeFileSync(releasercPath, JSON.stringify(releaseConfig, null, 2));
  console.log(chalk.green("Semantic Release setup is complete!"));
};

setupSemanticRelease().catch(err => {
  console.error(chalk.red("Error during setup:", err.message));
});
