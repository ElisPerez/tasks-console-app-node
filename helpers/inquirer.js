const inquirer = require('inquirer');
require('colors');

const { questionsMenu, questionsPause, questionsReadInput } = require('./questionsInquirer');

const inquirerMenu = async () => {
  console.clear();
  console.log('==============='.green);
  console.log('  Select an option'.white);
  console.log('===============\n'.green);

  const { option } = await inquirer.prompt(questionsMenu);

  return option;
};

const pause = async () => {
  console.log('\n');
  await inquirer.prompt(questionsPause);
};

const readInput = async message => {
  const questionsRI = questionsReadInput(message);

  const { desc } = await inquirer.prompt(questionsRI);

  return desc;
};

const deleteTaskList = async tasks => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async message => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedIn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select tasks to mark as completed',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showCheckList,
};
