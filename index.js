import inquirer from 'inquirer';
import chalk from 'chalk';
const numberValidator = (value) => {
    if (isNaN(parseFloat(value))) {
        return 'Enter a valid number';
    }
    return true;
};
async function calculator() {
    let continueCalculation = true;
    while (continueCalculation) {
        const questions = [
            {
                type: 'input',
                name: 'num1',
                message: 'Enter the first number:',
                validate: numberValidator
            },
            {
                type: 'list',
                name: 'operation',
                message: 'Choose operation:',
                choices: ['Add', 'Subtract', 'Multiply', 'Divide'],
            },
            {
                type: 'input',
                name: 'num2',
                message: 'Enter the second number:',
                validate: numberValidator
            },
        ];
        const answers = await inquirer.prompt(questions);
        const num1 = parseFloat(answers.num1);
        const num2 = parseFloat(answers.num2);
        let result;
        switch (answers.operation) {
            case 'Add':
                result = num1 + num2;
                console.log(chalk.green(`Result: ${result}`));
                break;
            case 'Subtract':
                result = num1 - num2;
                console.log(chalk.blue(`Result: ${result}`));
                break;
            case 'Multiply':
                result = num1 * num2;
                console.log(chalk.yellow(`Result: ${result}`));
                break;
            case 'Divide':
                if (num2 === 0) {
                    console.log(chalk.red('Error: Cannot divide by zero'));
                }
                else {
                    result = num1 / num2;
                    console.log(chalk.magenta(`Result: ${result}`));
                }
                break;
            default:
                console.log(chalk.red('Error: Invalid operation'));
        }
        const confirmation = await inquirer.prompt([{
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to perform another calculation?',
                default: false,
            }]);
        continueCalculation = confirmation.continue;
    }
}
calculator();
