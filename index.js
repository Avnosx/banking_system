import inquirer from 'inquirer';
import pool from './db.js'; // Assuming your db file is named db.js and uses ES module syntax

// Function to transfer funds
async function transferFunds(fromAccountId, toAccountId, amount) {
  try {
    const res = await pool.query('SELECT transfer_funds($1, $2, $3)', [fromAccountId, toAccountId, amount]);
    console.log('Transfer successful:', res.rows);
  } catch (err) {
    console.error('Error executing transfer:', err.message);
  }
}

// Function to display account balances
async function displayBalances() {
  try {
    const res = await pool.query('SELECT * FROM accounts');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching balances:', err.message);
  }
}

// Function to prompt the user
async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['Transfer Funds', 'Display Balances', 'Exit'],
    },
    {
      type: 'input',
      name: 'fromAccountId',
      message: 'From Account ID:',
      when: (answers) => answers.action === 'Transfer Funds',
    },
    {
      type: 'input',
      name: 'toAccountId',
      message: 'To Account ID:',
      when: (answers) => answers.action === 'Transfer Funds',
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Amount:',
      when: (answers) => answers.action === 'Transfer Funds',
    },
  ]);

  if (answers.action === 'Transfer Funds') {
    await transferFunds(answers.fromAccountId, answers.toAccountId, answers.amount);
  } else if (answers.action === 'Display Balances') {
    await displayBalances();
  } else if (answers.action === 'Exit') {
    console.log('Goodbye!');
    process.exit();
  }

  await promptUser();
}

promptUser();
