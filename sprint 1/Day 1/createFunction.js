

function run(n) {

    let i = 1;

    while (i <= n) {
        console.log(i);
        i++;
    }

}

function square(n){
    console.log(`${n} x ${n} = ${n*n}`)
}

module.exports = {run, square};
 