/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
    let p = new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve();}, seconds)
    });
    return p;
}

module.exports = sleep;
