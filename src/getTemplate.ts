import http from 'http';
import https from 'https';
import AdmZip from 'adm-zip';
import { URL } from 'url';

const getTemplate = (projectName: string, urlString?: string) => new Promise<string | undefined>((resolve, reject) => {
    let url: URL;
    //Check if url (possibly dependent on the 'urlString' parameter) is valid
    try {
        url = new URL(`${urlString ? urlString : "https://codeload.github.com/Iranon/threemplate/zip/refs/heads/main"}`);
    } catch (err) {
        reject("NOT a valid URL");
        return;
    }
    const client = url.protocol === "https:" ? https : (url.protocol === "http:" ? http : undefined);
    if (!client) { reject("HTTPS or HTTP protocol only"); return; };
    client.get({
        host: url.host,
        port: url.port,
        path: url.pathname,
        method: "GET"
    }, (response) => {
        console.log("\nDownloading template from: ", urlString, "\n");
        console.log("Response Status Code: ", response.statusCode, '\n');
        if (response.statusCode === 200) {
            const data: Uint8Array[] = [];
            response.on('data', (chunk) => {
                data.push(chunk);
            }).on('end', () => {
                //Extracting
                console.log("Unzipping...\n");
                try {
                    const zipBuffer = new AdmZip(Buffer.concat(data));
                    const mainFolderName = zipBuffer.getEntries()[0].entryName.slice(0, -1); //removing trailing '/'
                    zipBuffer.extractAllToAsync(`${projectName}`, /*overwrite*/true, undefined, () => {
                        console.log("Extraction complete\n");
                        resolve(mainFolderName);
                    });
                } catch {
                    reject("ERROR: Invalid or unsupported zip format.");
                }
            });
        }
        else { console.log("Download failed\n"); reject("NOT 200"); }
    })
    .on('error', (err) => {
        console.log("ERROR downloading the template from: ", urlString, "\n");
        reject(err);
    })
});

export default getTemplate;
