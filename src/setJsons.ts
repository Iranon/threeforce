import {readFile, writeFile} from 'fs/promises';

const setJsons = async (projectName: string) => {
    const projectRoot = `${process.cwd()}/${projectName}`;
    try {
        //- Set package.json
        //========================================================================================
        let packageJson = JSON.parse( await readFile(`${projectRoot}/package.json`, 'utf-8') );
        packageJson["name"] = projectName;
        packageJson["description"] = "A Three.js project generated with Threeforce.js";
        packageJson["author"] = "";
        packageJson["keywords"] = ["threemplate"];
        delete packageJson["repository"];
        await writeFile(`${projectRoot}/package.json`, JSON.stringify(packageJson, null, 2));
    }
    catch (err) {
        console.log(err);
    }
};

export default setJsons;
