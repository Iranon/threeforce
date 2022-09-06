import { stat, rename } from 'fs/promises';
import getTemplate from './getTemplate';

export const generateTemplate = async (projectName: string, urlString: string | undefined) => {
    //check if the directory exists (if not fs.stat throw an error and trigger the catch branch)
    try {
        await stat(`./${projectName}`);
        console.log("\nERROR: A directory with the same name already exists\n");
        process.exit(-1);
    }
    catch { //if the directory not exists yet
        try {
            const mainFolderName = await getTemplate(`${process.cwd()}`, urlString);
            mainFolderName && rename(mainFolderName, projectName);
        }
        catch (err) {
            console.log(err);
            process.exit(-1);
        }
    }
};
