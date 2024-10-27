function camelize(str) {
let str1 = str.split('-') 
return str1[0]+str1.slice(1).map(item => item[0].toUpperCase()+ item.slice(1)).join('');


}
