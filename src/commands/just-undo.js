import { execSync } from 'child_process';

export async function handleUndoCommand() {
    try {
        const symbolicRef = execSync('git symbolic-ref HEAD').toString().trim();

        const remoteBranch = execSync(`git for-each-ref --format="%(upstream:short)" ${symbolicRef}`)
            .toString()
            .trim()
            .replace(/'/g, '');

        if (!remoteBranch) {
            console.warn('⚠️ No remote tracking branch found.');
            console.log('Nothing to undo.');
            return;
        }

        const aheadCount = parseInt(execSync(`git rev-list --count ${remoteBranch}..HEAD`).toString().trim(), 10);

        console.log('📌 Tracking Branch:', remoteBranch);
        console.log('🔢 Commit Ahead Count:', aheadCount);

        if (aheadCount > 0) {
            execSync(`git reset --soft HEAD~${aheadCount}`);
            execSync('git restore --staged .');

            console.log(`✅ Reverted ${aheadCount} local commit(s) on top of ${remoteBranch}`);
        } else {
            console.log('✅ Nothing to undo. No local commits ahead of remote.');
        }
    } catch (err) {
        console.error('❌ Failed to undo commits:', err.message);
        console.log('👉 Make sure your branch is tracking a remote (use git push -u)');
    }
}
