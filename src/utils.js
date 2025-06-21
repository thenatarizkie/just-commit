import 'dotenv/config';

import { execSync } from 'child_process';
import { execa } from 'execa';
import * as fs from 'fs';
import os from 'os';
import * as path from 'path';
import process from 'process';
import prompts from 'prompts';

const configPath = path.join(os.homedir(), '.just-commit-config.json');

const defaultConfig = {
    apiKey: '',
    enableEmoji: false,
    enableScope: false,
    language: 'en',
    type: 'without',
};

const onCancel = () => {
    console.log('Ongoing process has been canceled');
    process.exit(1);
};

const loadFileJson = (path = '', type = 'array') => {
    if (type === 'array') {
        if (fs.existsSync(path)) {
            const rawData = fs.readFileSync(path, 'utf-8');
            const jsonData = JSON.parse(rawData);
            return jsonData || [];
        }
        return [];
    } else if (type === 'map') {
        if (fs.existsSync(path)) {
            const rawData = fs.readFileSync(path, 'utf-8');
            const mapData = JSON.parse(rawData);
            return new Map(Object.entries(mapData));
        }
        return new Map();
    }
};

export async function readConfig() {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
        return { ...defaultConfig };
    }

    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    return {
        ...defaultConfig,
        ...userConfig,
    };
}

export async function saveConfig(newConfig) {
    const existingConfig = await readConfig();
    const mergedConfig = {
        ...existingConfig,
        ...newConfig,
    };
    fs.writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
}

export async function setApiKey() {
    const { input } = await prompts(
        {
            type: 'password',
            name: 'input',
            message: 'Enter API Key...',
            validate: (value) => (value.trim() === '' ? 'API Key is required' : true),
        },
        { onCancel },
    );

    await saveConfig({ apiKey: input });

    console.log(`Successfully store the API Key in ${configPath}`);
    process.exit(0);
}

export async function enableEmoji() {
    const { input } = await prompts(
        {
            type: 'toggle',
            name: 'input',
            message: 'Want to use emoji?',
            initial: true,
            active: 'Yes',
            inactive: 'No',
        },
        { onCancel },
    );

    await saveConfig({ enableEmoji: input });

    console.log(`Successfully store the API Key in ${configPath}`);
    process.exit(0);
}

export async function enableScope() {
    const { input } = await prompts(
        {
            type: 'toggle',
            name: 'input',
            message: 'Want to use scope?',
            initial: true,
            active: 'Yes',
            inactive: 'No',
        },
        { onCancel },
    );

    await saveConfig({ enableScope: input });

    console.log(`Successfully store the API Key in ${configPath}`);
    process.exit(0);
}

export async function chooseLanguage() {
    const filePath = './assets/listLanguage.json';
    const list = loadFileJson(filePath, 'array');

    let listPrompts = [];

    list.forEach((row) => {
        listPrompts.push({
            title: row.name,
            value: row.id,
        });
    });

    const { input } = await prompts(
        {
            type: 'select',
            name: 'input',
            message: 'Choose the language to be used',
            choices: listPrompts,
        },
        { onCancel },
    );

    const check = list.some((prompt) => prompt.id === input);

    if (check) {
        const selected = list.find((prompt) => prompt.id === input);
        await saveConfig({ language: selected.id });

        console.log(`Successfully store the API Key in ${configPath}`);
        process.exit(0);
    } else {
        console.log(`Language choice not found`);
        process.exit(0);
    }
}

export async function chooseType() {
    let listPrompts = [
        { title: 'With Description', value: 'with' },
        { title: 'Without Description', value: 'without' },
    ];

    const { input } = await prompts(
        {
            type: 'select',
            name: 'input',
            message: 'Choose the type to be used',
            choices: listPrompts,
        },
        { onCancel },
    );

    const check = listPrompts.some((prompt) => prompt.value === input);

    if (check) {
        const selected = listPrompts.find((prompt) => prompt.value === input);
        await saveConfig({ type: selected.value });

        console.log(`Successfully store the API Key in ${configPath}`);
        process.exit(0);
    } else {
        console.log(`Type choice not found`);
        process.exit(0);
    }
}

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
