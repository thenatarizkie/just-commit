import { chooseLanguage, chooseType, enableEmoji, enableScope, setApiKey } from '../utils.js';

export async function handleConfigCommand(args) {
    const sub = args[0];

    switch (sub) {
        case 'set-api-key':
            await setApiKey();
            break;
        case 'enable-emoji':
            await enableEmoji();
            break;
        case 'enable-scope':
            await enableScope();
            break;
        case 'choose-language':
            await chooseLanguage();
            break;
        case 'choose-type':
            await chooseType();
            break;
        default:
            process.exit(1);
    }
}
