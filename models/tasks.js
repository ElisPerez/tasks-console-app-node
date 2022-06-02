require('colors');
const Task = require('./task');

class Tasks {
  _list = {};

  get listArray() {
    const list = [];
    Object.keys(this._list).forEach(key => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  loadTaskFromArray(tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task;
    });
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  listCompleted() {
    this.listArray.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completedIn } = task;
      const state = completedIn ? 'Completed'.green : 'Pending'.red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listPendingCompleted(completed = true) {
    let count = 0;
    this.listArray.forEach(task => {
      const { desc, completedIn } = task;
      const state = completedIn ? 'Completed'.green : 'Pending'.red;

      if (completed) {
        // show only completed
        if (completedIn) {
          count += 1;
          console.log(`${(count + '.').green} ${desc} :: ${completedIn.green}`);
        }
      } else {
        // show only pending
        if (!completedIn) {
          count += 1;
          console.log(`${(count + '.').green} ${desc} :: ${state.red}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach(id => {
      const task = this._list[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArray.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedIn = null;
      }
    });
  }
} // end class Tasks

module.exports = Tasks;
