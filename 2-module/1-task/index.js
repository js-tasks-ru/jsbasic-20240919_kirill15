let salaries = {
    Jonh: 1000,
    Ann: 1600,
    Pete: 1300,
    month: 'December',
    currency: 'USD',
    isPayed: false
}

function sumSalary(salaries){
    let sum = 0
    for(let s1 in salaries){
    if ( typeof salaries[s1] === 'number' && !isNaN (salaries[s1]) && salaries[s1] !== Infinity && salaries[s1] !== -Infinity){
         sum = sum +  salaries[s1]
    }
    }
    return sum
}
