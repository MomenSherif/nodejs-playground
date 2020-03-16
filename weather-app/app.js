const chalk = require('chalk');
const getWeather = require('./utils/weather');

const address = process.argv[2];

if (address) {
  getWeather(address).then(
    ({ location, summary, temperature, precipProbability }) => {
      console.log(
        chalk.green(`Temp: ${temperature}, It's ${precipProbability}% to rain`)
      );
      console.log(chalk.keyword('orange')(`${location} is ${summary}`));
    }
  );
} else {
  console.log(chalk.red('Enter an address!'));
}
