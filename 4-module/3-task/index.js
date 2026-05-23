function highlight(table) {
  const rows = table.tBodies[0].rows;

  for (let row of rows) {
    const statusCell = row.cells[3];
    const genderCell = row.cells[2];
    const ageCell = row.cells[1];

    
    if (statusCell.hasAttribute('data-available')) {
      const availableValue = statusCell.getAttribute('data-available');
      if (availableValue === 'true') {
        row.classList.add('available');
      } else if (availableValue === 'false') {
        row.classList.add('unavailable');
      }
    } else {
      row.hidden = true;
    }

    
    const genderText = genderCell.textContent.trim();
    if (genderText === 'm') {
      row.classList.add('male');
    } else if (genderText === 'f') {
      row.classList.add('female');
    }

    
    const age = Number(ageCell.textContent);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
