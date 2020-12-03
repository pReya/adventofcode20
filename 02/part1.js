const fs = require('fs');

let input = fs.readFileSync(__dirname + '/input', 'utf8');
input = input.split('\n');

let validPasswords = 0;

input.forEach((candidate) => {
  const [rule, password] = candidate.split(": ");
  const [bounds, char] = rule.split(' ');
  const [lower, upper] = bounds.split('-').map((boundString) => Number(boundString));
  const regex = new RegExp(`${char}`, 'g');
  const charCount = password.match(regex)?.length || 0;
  // console.log({candidate,rule,password,bounds,char,upper,lower,regex:regex.toString(),charCount});
  
  if (charCount >= lower && charCount <= upper)
  {
    validPasswords++;
    // console.log("Valid password: ", password);
  }
})

console.log("Valid password count: ", validPasswords);
