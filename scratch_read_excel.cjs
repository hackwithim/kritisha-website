const xlsx = require('xlsx');
const wb = xlsx.readFile('../../toll details.xlsx');
console.log(JSON.stringify(xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]), null, 2));
