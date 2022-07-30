const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const render = require('./render');

const ignorarPastas = ['node_modules', 'outrapasta'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.gray(`---- ${file.shortName}`));
            const beforeEaches = []; 
            global.render = render;

            global.beforeEach = (fn) => { //injeta a função beforeEach em todos os arquivos do projeto
                beforeEaches.push(fn);        
            };

            global.it = async (desc, fn) => { //injeta a função it em todos os arquivos do projeto
                beforeEaches.forEach(func => func());
                try {
                    await fn();
                    console.log(chalk.green(`\tOK - ${desc}`));
                } catch (err) {
                    const message = err.message.replace(/\n/g, '\n\t\t'); //replace e regex para localizar \n e substituir por \n\t\t
                    console.log(chalk.red(`\tX - ${desc}`));
                    console.log(chalk.red('\t', message));
                }
            };

            try {
                require(file.name); //localiza, carrega e executa os arquivos .js em sequencia
            } catch (err) {
                console.log(chalk.red(err));
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);
        for (let file of files) {
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filepath, shortName: file });
            } else if (stats.isDirectory() && !ignorarPastas.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath);

                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
    }
}

module.exports = Runner;