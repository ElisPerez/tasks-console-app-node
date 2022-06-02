const inquirer = require('inquirer');
require('colors');

const questionsMenu = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`,
      },
      {
        value: '2',
        name: `${'2.'.green} List tasks`,
      },
      {
        value: '3',
        name: `${'3.'.green} List completed tasks`,
      },
      {
        value: '4',
        name: `${'4.'.green} List pending tasks`,
      },
      {
        value: '5',
        name: `${'5.'.green} Mark task as completed`,
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`,
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`,
      },
    ],
  },
];

const questionsPause = [
  {
    type: 'input',
    name: 'enter',
    message: `Press ${'Enter'.green} to continue`,
  },
];

const questionsReadInput = message => {
  return [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];
};

module.exports = {
  questionsMenu,
  questionsPause,
  questionsReadInput,
};
