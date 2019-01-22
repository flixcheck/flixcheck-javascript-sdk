const flixcheck = require("../index");
const fs = require("fs");

const userId = process.env.FLIXCHECK_TEST_USER_ID;
const apiKey = process.env.FLIXCHECK_TEST_API_KEY;
const testCheckId = process.env.FLIXCHECK_TEST_CHECK_ID;
const testAccountId = process.env.FLIXCHECK_TEST_ACCOUNT_ID;
const testFileId = process.env.FLIXCHECK_TEST_FILE_ID;

const client = new flixcheck.FlixcheckClient(userId, apiKey);

async function test() {
    try {

        /* Test getCheck */
        const check = await client.getCheck(testCheckId);
        console.log(check.subject);

        /* Test getCheckPdf */
        const pdfBuffer = await client.getCheckPdf(testCheckId);
        fs.writeFileSync(__dirname + "/check.pdf", pdfBuffer);

        /* Test putCheck */
        await client.putCheck(testCheckId, {
            notes: "Great!"
        });
        const checkAfterUpdate = await client.getCheck(testCheckId);
        console.log(checkAfterUpdate.notes);

        /* Test getAccount */
        const account = await client.getAccount(testAccountId);
        console.log(account.company.name);

        /* Test getFile */
        const fileBuffer = await client.getFile(testFileId);
        fs.writeFileSync(__dirname + "/file.pdf", fileBuffer);

    } catch (error) {
        throw error;
    }
}

test()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });