/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let punctuation = /[\.,?! ]/g;
  str = str.toLowerCase().replace(punctuation, '');
  let word_a = str;
  let word_b = str.split('').reverse().join('')
  return word_a === word_b;
}

console.log('')
module.exports = isPalindrome;
