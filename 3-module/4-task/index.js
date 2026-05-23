
function showSalary(users, age) {
  const result = [];
  for (let i = 0;  i < users.length; i++) { 
    let user = users[i];
    if (user.age <= age) { 
      result.push(`${user.name}, ${user.balance}`);
    }

  }
  return result.join('\n');
}
