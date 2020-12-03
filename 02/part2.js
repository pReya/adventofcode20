
const fs = require('fs');

let input = fs.readFileSync(__dirname + '/input', 'utf8');
input = input.split('\n');

let validPasswords = 0;
input.forEach((candidate) => {
  const [rule, password] = candidate.split(": ");
  const [positions, char] = rule.split(' ');
  const [first, second] = positions.split('-').map((boundString) => Number(boundString));
  const charAtFirstPosition = password.charAt(first-1) === char;
  const charAtSecondPosition = password.charAt(second-1) === char;
  // console.log({candidate,rule,password,bounds,char,upper,lower,regex:regex.toString(),charCount});
  
  if (charAtFirstPosition != charAtSecondPosition)
  {
    validPasswords++;
    // console.log("Valid password: ", password);
  }
})
console.log("Valid password count: ", validPasswords);