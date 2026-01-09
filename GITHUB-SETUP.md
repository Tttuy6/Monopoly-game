# GitHub Setup and Installation Instructions

## Overview
This document provides step-by-step instructions for setting up the Monopoly-game repository and getting started with development.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Git** - Version control system ([Download](https://git-scm.com))
- **Node.js** - JavaScript runtime (v14 or higher) ([Download](https://nodejs.org))
- **npm** - Node Package Manager (usually comes with Node.js)
- **GitHub Account** - Required to clone and contribute

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Tttuy6/Monopoly-game.git
cd Monopoly-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npm test
```

## GitHub Workflow

### Creating a Feature Branch
When working on a new feature or fix, create a dedicated branch:
```bash
git checkout -b feature/your-feature-name
```

### Making Changes
1. Make your changes to the codebase
2. Test your changes locally
3. Stage your changes:
   ```bash
   git add .
   ```
4. Commit with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```

### Pushing to GitHub
```bash
git push origin feature/your-feature-name
```

### Creating a Pull Request
1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch and provide a clear description
4. Submit the pull request for review

## Development

### Running the Application
```bash
npm start
```

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Code Style and Linting
```bash
npm run lint
```

## Keeping Your Fork Updated

### Adding Upstream Remote
```bash
git remote add upstream https://github.com/Tttuy6/Monopoly-game.git
```

### Syncing with Main Branch
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Common Issues and Solutions

### Issue: "Permission denied (publickey)"
**Solution:** Ensure your SSH keys are properly configured:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```
Add your public key to GitHub settings.

### Issue: "Failed to connect to GitHub"
**Solution:** Check your internet connection and verify your GitHub credentials are correct.

### Issue: Merge Conflicts
**Solution:** When pulling from main, if conflicts occur:
```bash
git status
# Resolve conflicts in your editor
git add .
git commit -m "resolve: merge conflicts"
```

## Commit Message Convention
Follow conventional commits for clarity:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code refactoring
- `test:` for tests
- `chore:` for maintenance

Example:
```bash
git commit -m "feat: add dice rolling functionality"
```

## Contributing Guidelines

1. **Create meaningful commits** - Keep commits focused and logical
2. **Write clear PR descriptions** - Explain what and why
3. **Test thoroughly** - Run all tests before pushing
4. **Follow code style** - Maintain consistency with existing code
5. **Update documentation** - Keep docs in sync with changes

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://docs.github.com)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Getting Help

If you encounter issues:
1. Check existing issues on GitHub
2. Review the documentation in the repository
3. Create a new issue with detailed information
4. Reach out to the maintainers

---

**Happy coding!** 🎲
