import { execSync } from 'child_process';

import { logError, logInfo, logSuccess } from '../utils.js';

export async function handleUndoCommand() {
    try {
        const symbolicRef = execSync('git symbolic-ref HEAD').toString().trim();

        const remoteBranch = execSync(`git for-each-ref --format="%(upstream:short)" ${symbolicRef}`)
            .toString()
            .trim()
            .replace(/'/g, '');

        if (!remoteBranch) {
            logError(`No remote tracking branch found`);
            return;
        }

        const aheadCount = parseInt(execSync(`git rev-list --count ${remoteBranch}..HEAD`).toString().trim(), 10);

        logInfo(`Current Branch: ${remoteBranch}`);
        logInfo(`Total Commit: ${aheadCount}`);

        if (aheadCount > 0) {
            execSync(`git reset --soft HEAD~${aheadCount}`);
            execSync('git restore --staged .');

            logSuccess(`Reverted ${aheadCount} local commits on top of ${remoteBranch}`);
        } else {
            logError(`Nothing to undo`);
        }
    } catch (err) {
        logError(`Failed to cancel commit: ${err.message}`);
    }
}
