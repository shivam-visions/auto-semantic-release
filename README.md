
```markdown
# Semantic Release Helper

This tool simplifies the setup of Semantic Release in your projects by automating the initial configuration.

## Installation

**Globally:**

```bash
npm install -g semantic-release-helper
```

**As a development dependency:**

```bash
npm install --save-dev semantic-release-helper
```

## Usage

This package helps you set up Semantic Release in your project by creating a default `.releaserc.json` configuration file. This file is essential for Semantic Release to manage versioning and changelogs automatically.

**Prerequisites:**

* Node.js (version 10 or later)
* npm package manager
* A GitHub repository where you want to configure Semantic Release

## Installation

There are two ways to install `semantic-release-helper`:

1. **Globally:**

   This allows you to run the setup script from any project directory.

   ```bash
   npm install -g semantic-release-helper
   ```

2. **As a development dependency:**

   This installs the package only for your current project and adds it to your `package.json` file.

   ```bash
   npm install --save-dev semantic-release-helper
   ```

## Running the Setup Script

1. Navigate to your project directory.
2. Run the following command:

   ```bash
   npx semantic-release-helper
   ```

   The setup script will guide you through a few interactive prompts:

   * **Which branches should trigger releases?**

     - Enter the branches that should trigger a release when changes are pushed (e.g., `main`, `develop`). Separate multiple branches with commas.

   * **Do you want to customize plugins?**

     - This allows you to choose which plugins to include in your release process. By default, the script uses the following plugins:

       * `@semantic-release/commit-analyzer`
       * `@semantic-release/release-notes-generator`
       * `@semantic-release/changelog`
       * `@semantic-release/npm`
       * `@semantic-release/github`
       * `@semantic-release/git` (for managing the `CHANGELOG.md` file)

     - If you choose to customize, you can select specific plugins from the list.

## Configuration File

After running the setup script, a `.releaserc.json` file will be created in your project's root directory with the following default structure:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    ["@semantic-release/git", { "assets": ["CHANGELOG.md"] }]
  ]
}
```

## Running Semantic Release

With the `.releaserc.json` file configured, integrate Semantic Release into your CI pipeline by adding the following command to your CI configuration file (e.g., GitHub Actions, GitLab CI):

```bash
npx semantic-release
```

This command will trigger Semantic Release to automatically:

* Analyze commit messages to determine the next version.
* Generate release notes and update the changelog.
* Publish the release to npm (if applicable).
* Create a GitHub release with the version information.

## Troubleshooting

If you encounter issues during setup, check the following:

* **GitHub token permissions:** Ensure your GitHub token has write permissions to push tags and releases to your repository.
* **CI environment credentials:** Verify that your CI environment has the correct credentials set up for GitHub or other hosting services.

## Configuring the CI Workflow (e.g., GitHub Actions)

Here's an example workflow for GitHub Actions:

**Create a `.github/workflows/release.yml` file with the following content:**

```yaml
name: Release

on:
  push:
    branches:
      - main  # Change this to your release branch (e.g., 'master' or 'main')

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '16'  # Adjust Node.js version as needed

      - run: npm install

      - env:
          GH_TOKEN: ${{ secrets.GH_