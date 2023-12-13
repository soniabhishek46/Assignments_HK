let fs = require("fs");

//Easy

let count = 0;
function counter_01(){
    setInterval(()=>{console.log(count++)}, 1000)
}


function counter_02(){
    setTimeout(()=>{console.log(count++); counter();}, 1000)
}

function read_file(){
    fs.readFile("1-counter.md", 'utf-8', (err, data)=>{
        console.log(data);
    })
}

function write_file(){
    fs.writeFile('abc.txt', 'This is text written by write_file function.', 'utf-8', ()=>{console.log('Inside file_write...')})
}

//Medium
function edit_file(){
    fs.readFile('abc.txt', 'utf-8', (err, data)=>{
        let space_count = 0;
        let cleaned_string = '';
        let pch = '';
        data = data.trim();

        for(let ch of data){
            if ((pch == ' ') && (ch != ' ')){
                space_count = 0;
            }

            if(ch == ' '){
                space_count++;

                if(space_count > 1)
                    continue;
            }

            cleaned_string += ch;
            pch = ch;
        }
        console.log(cleaned_string);
        fs.writeFile('abc.txt', cleaned_string, 'utf-8', ()=>{console.log('Inside file_write...')})
    })
}


function print_time(){
    setInterval(()=>{
        let now = new Date();
        let currtm = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        console.log(currtm);
        console.log(now.toLocaleTimeString());
    }, 1000)
}

//counter_01();
//counter_02();
//read_file();
//write_file();
//edit_file();
print_time();
