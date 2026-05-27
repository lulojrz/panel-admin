const fs = require('fs');

const files = [
  './src/Context/AuthContext.jsx',
  './src/Context/AdminContext.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match single quote, double quote or backtick followed by http://localhost:8080 then anything until the matching quote
  content = content.replace(/(['"`])http:\/\/localhost:8080(.*?)\1/g, "`\\${import.meta.env.VITE_API_URL}$2`");
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
