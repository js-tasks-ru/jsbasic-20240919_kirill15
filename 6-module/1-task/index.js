/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');

    this.createHeader();
    this.createElement();
    this.addListener();
  }

  createHeader() {
    this.thead = document.createElement('thead');
    const tr = document.createElement('tr');

    if (this.rows.length > 0) {
      for (let key in this.rows[0]) {
        const th = document.createElement('th');
        th.textContent = key; 
        tr.appendChild(th);
      }
      const thButton = document.createElement('th');
      tr.appendChild(thButton); 
    }

    this.thead.appendChild(tr);
    this.elem.appendChild(this.thead);
  }

  createElement() {
    this.tbody = document.createElement('tbody');

    for (const row of this.rows) {
      const tr = document.createElement('tr');

      for (let key in row) {
        const td = document.createElement('td');
        td.textContent = row[key]; 
        tr.appendChild(td);
      }

      const tdButton = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = 'X'; 
      tdButton.appendChild(button);
      tr.appendChild(tdButton);

      this.tbody.appendChild(tr);
    }

    this.elem.appendChild(this.tbody);
  }

  addListener() {
    this.elem.addEventListener('click', (event) => {
      const target = event.target;  
      if (target.tagName === 'BUTTON') {
        const row = target.closest('tr');
        if (row) {
          row.remove();
        }
      }
    });
  }
}
