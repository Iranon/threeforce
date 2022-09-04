#! /usr/bin/env node

import { helpMessage, successMessage } from './messages';
import { generateTemplate } from './generation';
import install from './install';
import setJsons from './setJsons';


//const args = process.argv.slice(2); // command line arguments start at position 2
const projectName = (process.argv[2] && /^[a-zA-Z0-9][a-zA-Z0-9_\/-]*$/.test(process.argv[2])) ? process.argv[2] : "";
const urlInputString = process.argv[3] || undefined;
const flags: string[] = process.argv.slice(3).filter(flag => /^[-][a-zA-Z]$/.test(flag));


// Running
//-------------
(async () => {
    //if the help flag is called print help and exit
    if (flags.includes('-h')) { console.log(helpMessage); process.exit(0); };
    
    if (projectName) {
        generateTemplate(projectName, urlInputString)
        .then(() => install(projectName)
            .then(() => setJsons(projectName)
                .then(() => console.log(successMessage)))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
    } else {
        console.log('\n' + helpMessage + '\n');
        process.exit(0);
    }
})();
