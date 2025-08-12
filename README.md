# Just Commit

A simple and automated CLI tool for generating meaningful Git commit messages following the Conventional Commits standard. With support for AI-generated commit messages, it ensures clarity and consistency in your version control workflow. Perfect for developers who want quick, smart, and descriptive commit messages with minimal effort.

## Key Features

Generate AI-powered commit messages, follow Conventional Commits, and streamline your Git workflow with ease.

- **Automated Commit Message Generation**: Generate commit messages effortlessly using AI with support for the Conventional Commits standard
- **Conventional Commits Support**: Automatically format commit messages with prefixes like `feat`, `fix`, `chore`, and more to align with industry best practices
- **One File, One Commit**: Automatically generates commit messages tailored to each modified file, ensuring precise tracking of changes
- **AI-Powered Customization**: Leverages Google Gemini AI to craft commit messages intelligently, saving time and improving message quality
- **Global CLI Tool**: Install the package globally via npm and use it across projects seamlessly with simple commands
- **Easy-to-Use CLI**: Intuitive and user-friendly command-line interface for effortless usage, even for beginners

## Prerequisites

### 1. Node.js

To run this bot, you need Node.js. You can download and install it from the official Node.js website.

- **Download**: [Node.js Official Website](https://nodejs.org/en)
- **Version**: The bot requires Node.js version 16 or higher
- **Verify**: Once you have Node.js installed, open your terminal or command prompt and check the version using the following commands:

    ```bash
    node -v
    npm -v
    ```

### 2. Gemini API Key

Gemini API keys are used to generate commit messages by following the Conventional Commits guidelines. To get your Gemini API key, follow these steps:

- **Visit the Google AI Studio Website**: Open your browser and go to [Google AI Studio](https://aistudio.google.com/)
- **Log In to Your Google Account**: Access your account to proceed

    - Click Sign in to Google AI Studio
    - Use your Google credentials to log in

- **Navigate to the API Key Section**: Find the option to generate your API key

    - After logging in, look for and click the Get API Key button
    - Click the Create API Key button

- **Copy and Save the API Key**: Once the key is generated, copy it to a safe location for later use in your bot configuration

## Installation

To install the `just-commit` package globally on your system, use the following command:

```bash
npm install -g just-commit
```

## Setup

Before using `just-commit`, you need to set your Gemini API key to enable AI-powered commit message generation. Run this command to configure your API key:

```bash
just-commit setApiKey <your-gemini-api-key>
```

Replace `<your-gemini-api-key>` with your actual Gemini API key.

## Usage

Once the API key is set, you can generate commit messages easily by running:

```bash
just-commit
```

This command will:

- Detect changes in your Git repository
- Automatically generate a commit message following the Conventional Commits standard
- Commit the changes to your repository with the generated message

## Testing

The project includes basic tests for each feature using Mocha and Chai. To run tests, use the following command:

```bash
npm run test
```

## How to Contribute

Please check our [CONTRIBUTING.md](CONTRIBUTING.md) guide for more details.

## Support & Donation

If you found this bot helpful, consider supporting the project:

- **Solana**: `8og5rA7ptJWDVPRnh1iWkLrXrGK5M3iTLccH624B5vhr`
- **EVM**: `0xfc9cf57e5b0D78d6ee85b313C658d757D1c39Ad4`
- **BTC**: `bc1p728j34y46jsn7y38gne3ggm7gdhl22kxf3v327tj9ez52xmcpsmqa9um9a`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Feel free to use and modify it for your own purposes.
