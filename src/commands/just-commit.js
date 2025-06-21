import { generateCommitMessage } from '../generateCommitMessage.js';
import { commitFile, getDiffForFile, getGitChanges, stageFile } from '../utils.js';
import { logInfo } from '../utils.js';

export async function handleCommitCommand(options) {
    const { date, mode } = options;
    void date;
    void mode;

    try {
        logInfo('Welcome to Just Commit! 📦 v1.0.0');
        logInfo('Copyright (c) 2025 - Present Natarizkie');
        logInfo(`Web: https://natarizkie.com/ - E-mail: natarizkie@gmail.com`);
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

            const commitMessage = await generateCommitMessage(truncatedDiff);

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
