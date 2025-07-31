
//  It is a CJS module system => "Common Javascript Module System "

const { run, square } = require('./createFunction');  // Custom Module
//  inbuilt module : fs / http / crypto / DNS / OS
//  External Module : install from NPM
// run(5);
// square(10)

//  ===============================

const os = require("os");    // os is directly import from NodeJs.     //  inbuilt module 

const cpu = os.cpus();

// console.log(cpu.length)
// console.log(cpu)

                   //  ================================

const fs = require("fs");

console.log("Start reading");

fs.readFile("./data.txt","utf-8" ,(err, data) => {  // text store in  compress format to convert into human readable format convert into "utf-8"
    if (err) {
        console.log("Error is : ", err)
    }
    if (data) {
        console.log("Your Data is : ", data)
    }
})

console.log("End reading");


                  //  ========================================

fs.writeFile("./d.txt", "This is 1st file that i was created", (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("File are successfully Created !");
    }
})


                                       //  ===============================

