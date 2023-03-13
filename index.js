const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());

//out gitlab application will send data to the specified webhook
//this end point will be written in the reposiotry as a webhook which we are aiming to trigger the events
app.post('/webhook', async (req, res) => {
  const payload = req.body;

  if (payload.object_kind === 'merge_request' && payload.object_attributes.action === 'merge') {
    console.log(`PR ${payload.object_attributes.iid} merged!`);
    const message = `PR ${payload.object_attributes.iid} merged by ${payload.user.name}!`;
    await sendNotification(message);
  }

  res.send('Received GitLab webhook!');
});

// //Add a new File
// const axios = require('axios');

// const projectId = '<your-project-id>';
// const filePath = 'path/to/new/file.txt';
// const fileContent = 'This is the content of the new file';

// const apiUrl1 = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filePath}`;
// const headers1 = {
//   'PRIVATE-TOKEN': '<your-personal-access-token>'
// };
// const data1 = {
//   content: Buffer.from(fileContent).toString('base64'),
//   commit_message: 'Add new file'
// };

// axios.post(apiUrl1, data1, { headers1 })
//   .then(response => {
//     console.log(`New file added: ${response.data.file_name}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//   //update the File
//   const newFileContent = 'This is the updated content of the file';

// const apiUrl2 = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filePath}`;
// const headers2 = {
//   'PRIVATE-TOKEN': '<your-personal-access-token>'
// };
// const data2 = {
//   content: Buffer.from(newFileContent).toString('base64'),
//   commit_message: 'Update file'
// };

// axios.put(apiUrl2, data, { headers2 })
//   .then(response => {
//     console.log(`File updated: ${response.data.file_name}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//   //for creating a new branch
// const mergeRequestIid = '<merge-request-iid>';
// const commitSha = '<commit-sha>';
// const commentBody = 'This is a comment on the commit';

// const apiUrl3 = `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestIid}/notes`;
// const headers3 = {
//   'PRIVATE-TOKEN': '<your-personal-access-token>'
// };
// const data = {
//   body: commentBody,
//   commit_id: commitSha
// };

// axios.post(apiUrl3, data2, { headers3 })
//   .then(response => {
//     console.log(`Comment added: ${response.data.body}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});