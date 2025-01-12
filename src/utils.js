/**
 * @license Just Commit
 * utils.js
 *
 * Copyright (c) 2025 - Present Natarizkie
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { execSync } from 'child_process';
import { execa } from 'execa';

export async function getDiffForFile(file) {
    const { stdout: diff } = await execa('git', ['diff', '--staged', '--', file]);
    return diff;
}

export function getGitChanges() {
    const gitDiff = execSync('git diff --name-only').toString().trim();

    if (gitDiff) {
        return gitDiff.split('\n');
    } else {
        const gitStatus = execSync('git status --porcelain').toString().trim();
        const listDiff = [];

        gitStatus.split('\n').forEach((line) => {
            const [status, file] = line.trim().split(' ');
            if (status === 'M' || status === '??') {
                listDiff.push(file);
            }
        });

        return listDiff;
    }
}

export function stageFile(file) {
    execSync('git add ' + file, { stdio: 'inherit' });
}

export function commitFile(commitMessage) {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
}
