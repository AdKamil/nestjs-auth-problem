import fs from 'fs';

export const logToFile = (data) => {
  fs.writeFile('loggggggggg.json', JSON.stringify(data, null, 2), err => console.log(err))
}
