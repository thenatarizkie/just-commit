#!/usr/bin/env node

/**
 * @license Just Commit
 * index.js
 *
 * Copyright (c) 2025 - Present Natarizkie
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import process from 'process';
import 'dotenv/config';
import { getDiffForFile, getGitChanges, stageFile, commitFile } from '../src/utils.js';
import { generateCommitMessage } from '../src/generateCommitMessage.js';
import * as fs from 'fs';
import * as path from 'path';
import os from 'os';

const configPath = path.join(os.homedir(), '.just-commit-config.json');

const saveApiKey = (apiKey = '') => {
    fs.writeFileSync(configPath, JSON.stringify({ apiKey }, null, 2));
    console.log(`API Key saved at ${configPath}`);
};

const loadApiKey = () => {
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return config.apiKey;
    }
    return process.env.GEMINI_API_KEY;
};

const apiKey = loadApiKey();

if (process.argv[2] === 'setApiKey') {
    const inputApiKey = process.argv[3];
    if (!inputApiKey) {
        console.error('Please provide an API key.');
        process.exit(1);
    }
    saveApiKey(inputApiKey);
    process.exit(0);
}

if (!apiKey) {
    console.error('API key is required. Use the `setApiKey` command to store your API key.');
    process.exit(1);
}

async function autoCommit() {
    try {
        console.log(' ');
        console.log('=======================================================');
        console.log(' ');
        console.log('Welcome to Just Commit!');
        console.log('Copyright (c) 2025 - Present Natarizkie');
        console.log(`Web: https://natarizkie.com/ - E-mail: natarizkie@gmail.com`);
        console.log(' ');
        console.log('=======================================================');
        console.log(' ');

        const changedFiles = getGitChanges();

        if (changedFiles.length === 0) {
            console.log('No changes detected. Nothing to commit.');
            console.log(' ');
            console.log('=======================================================');
            console.log(' ');
            return;
        }

        for (const file of changedFiles) {
            console.log(`Processing file: ${file}`);

            stageFile(file);

            const diff = await getDiffForFile(file);

            if (!diff) {
                console.warn(`No diff found for file: ${file}. Skipping...`);
                continue;
            }

            const charLimit = 20000;
            let truncatedDiff = diff;

            if (diff.length > charLimit) {
                console.warn(
                    `The diff for file ${file} exceeds the character limit (${charLimit}). Truncating the diff.`,
                );
                truncatedDiff = diff.slice(0, charLimit);
            }

            const commitMessage = await generateCommitMessage(truncatedDiff, apiKey);

            console.log(`Generated Commit Message for ${file}: "${commitMessage}"`);

            commitFile(commitMessage);

            console.log(`Changes for ${file} committed successfully!`);

            console.log(' ');
            console.log('=======================================================');
            console.log(' ');
        }
    } catch (error) {
        console.error('Error during auto commit:', error.message);
        console.log(' ');
        console.log('=======================================================');
        console.log(' ');
    }
}

autoCommit();
