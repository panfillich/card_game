const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let i = 0;

function* fibonacci() {
    var a = 0, b = 1, c = 0;

    while (true) {
        yield a;
        c = a;
        a = b;
        b = c + b;
    }
}

function run() {
    var seq = fibonacci();
    console.log(seq.next().value); // 0
    console.log(seq.next().value); // 1
    console.log(seq.next().value); // 1
    console.log(seq.next().value); // 2
    console.log(seq.next().value); // 3
    console.log(seq.next().value); // 5
}

function run(){
    rl.question('What do you think of Node.js? ', (answer) => {
        // TODO: Log the answer in a database
        console.log(`Thank you for your valuable feedback: ${answer}`);
        //rl.close();
        run();
    });
}


run();