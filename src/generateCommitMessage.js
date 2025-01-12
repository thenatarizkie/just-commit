/**
 * @license Just Commit
 * generateCommitMessage.js
 *
 * Copyright (c) 2025 - Present Natarizkie
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const listRandomCommit = [
    'feat: implement user profile picture upload functionality',
    'fix: resolve issue causing incorrect timestamps on notifications',
    'perf: optimize database query for faster user search results',
    'style: update button styling to match the latest design guidelines',
    'docs: update README to include setup instructions for new contributors',
    'refactor: simplify error handling logic in authentication service',
    'test: add unit tests for user role permission logic',
    'ci: configure GitHub Actions to run tests on all pull requests',
    'build: include analytics tracking script in production builds',
    'chore: update dependencies to the latest versions to improve security',
    'feat: add dark mode toggle to user settings',
    'fix: correct display issue in mobile navigation on smaller screens',
    'perf: cache static assets to improve page load times',
    'style: align input fields and buttons for consistent spacing',
    'docs: create contribution guidelines for open-source contributors',
    'refactor: reorganize folder structure for better modularity',
    'test: add integration tests for payment processing flow',
    'ci: add automated deployment to staging environment on successful builds',
    'feat: implement email verification process during user registration',
    'fix: prevent users from submitting forms with invalid email addresses',
    'perf: optimize image loading with lazy loading technique',
    'style: clean up CSS code to remove unused styles',
    'docs: update API documentation to reflect the latest endpoint changes',
    'refactor: extract utility functions to a separate helper module',
    'test: write test cases for new email notification feature',
    'build: update webpack configuration for smaller bundle sizes',
    'ci: integrate linting into the CI pipeline for consistent code quality',
    'feat: add multi-language support to the platform',
    'fix: resolve crash issue when user tries to access deleted content',
    'chore: archive old branches that are no longer in use',
];

const noResponseFromAI = (error = '') => {
    const randomCommit = listRandomCommit[Math.floor(Math.random() * listRandomCommit.length)];
    return error != '' ? randomCommit : randomCommit;
};

export async function generateCommitMessage(diff, apiKey) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const prompt = `
        Generate a Conventional Commit message based on the following diff: ${diff}.
        The message should:
        - Start with a type (e.g., feat, fix, chore, docs, refactor, style, or test).
        - Include a description that explains what the change does in more detail (mid-long, 1 sentence, at least 6-12 words).
        - Be specific, informative, and clearly communicate the purpose of the change.
        - Example format: "feat: enhance user input handling by adding validation and error handling, improving UX".
        - Do not add a period at the end of the message.
        `;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(prompt, {
            temperature: 0.7,
            top_p: 0.95,
            top_k: 64,
            max_output_tokens: 50,
        });

        const responses = await result.response;
        let response = responses.text() || noResponseFromAI();
        response = response.trim();

        if (response.endsWith('.')) {
            response = response.slice(0, -1);
        }

        return response.toLowerCase();
    } catch (error) {
        return noResponseFromAI(error.message);
    }
}
