import 'dotenv/config';

import minimist from 'minimist';
import process from 'process';

import { handleCommitCommand } from '../src/commands/just-commit.js';
import { handleConfigCommand } from '../src/commands/just-config.js';

const args = process.argv.slice(2);
const command = args[0];

(async () => {
    switch (command) {
        case 'just-config': {
            await handleConfigCommand(args.slice(1));
            break;
        }
        case 'just-commit': {
            const parsed = minimist(args.slice(1), {
                string: ['mode', 'date'],
                alias: { m: 'mode', d: 'date' },
                default: {
                    mode: 'one-file-one-commit',
                },
            });
            await handleCommitCommand(parsed);
            break;
        }
        default: {
            process.exit(1);
        }
    }
})();
