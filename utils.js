const fs = require('node:fs');

const writePostToFile = (filepath, content) =>
{
  fs.writeFileSync(filepath, JSON.stringify(content), 'utf-8', (err) => {
    if (err) console.log(err);
  })
}

const UpdateFile = (filepath, content) =>
{
  fs.writeFileSync(filepath, JSON.stringify(content), 'utf-8', (err) => {
    if (err) console.log(err);
  })
}


module.exports = {
  writePostToFile,
  UpdateFile
}