
function camelize(str) {
  let str1 = str.split('-');
  return str1.map((word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)).join('');
}

