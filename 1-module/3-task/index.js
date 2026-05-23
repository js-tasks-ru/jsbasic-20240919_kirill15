function ucFirst(str) { 
  if (str.length === 0) { 
    return str;
  }

  let str1 = str[0].toUpperCase() + str.slice(1);
  return str1; 
}
