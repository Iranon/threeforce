import { spawn } from 'child_process';

const install = (projectName: string) => new Promise((resolve, reject) => {
    const projectRoot = `${process.cwd()}/${projectName}`;
    console.log("Installing...\n");
    spawn("npm i", {
        shell:true,
        cwd:projectRoot,
        stdio: [process.stdin, process.stdout, process.stderr]
        })
        .on('close', (code: number) => {
            if (code === 0) {
                resolve(0);
                console.log("-> npm install: DONE!");
            }
            else {
                reject("ERROR executing npm install");
            }
        });
});

export default install;
