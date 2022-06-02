require('colors');

const { saveDB, readDB } = require('./helpers/dbInteractions');
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showCheckList,
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTaskFromArray(tasksDB);
  }

  do {
    // show menu
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // create task
        const desc = await readInput('Enter task description:');
        tasks.createTask(desc);
        break;

      case '2':
        // list all tasks
        tasks.listCompleted();
        break;

      case '3':
        // list completed tasks
        tasks.listPendingCompleted(true);
        break;

      case '4':
        // list pending tasks
        tasks.listPendingCompleted(false);
        break;

      case '5':
        // Complete | Pending task
        const ids = await showCheckList(tasks.listArray);
        tasks.toggleCompleted(ids);
        break;

      case '6':
        // delete task
        const id = await deleteTaskList(tasks.listArray);
        if (id !== '0') {
          const ok = await confirm('Are you sure to delete this task?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Task deleted successfully.'.green);
          }
        }
        break;
    }

    // save tasks to db
    saveDB(tasks.listArray);
    if (opt !== '0') {
      await pause();
    }
  } while (opt !== '0');
};

main();
