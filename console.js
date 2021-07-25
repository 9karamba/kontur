const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function readLine(callback) {
	rl.on('line', (line) =>{
        callback ( line.split(/\s+/) );
    });
}

function writeLine(data) {
    
    if(Array.isArray(data)){
    	let str = [];

        let countName    = 4, 
            countDate    = 4, 
            countComment = 7, 
            countFile    = 8;
        
        for (let i = 0; i < data.length; i++){
            if (data[i].userName.length>10) countName = 10; 
            else if (data[i].userName.length>countName)
                countName = data[i].userName.length;

            if (data[i].dateComment.length>10) countDate = 10; 
            else if (data[i].dateComment.length>countDate)
                countDate = data[i].dateComment.length;

            if (data[i].userComment.length>50) countComment = 50;
            else if (data[i].userComment.length>countComment)
                countComment = data[i].userComment.length;
            
            if (data[i].fileName.length>15) countFile = 15;
            else if (data[i].fileName.length>countFile) 
                countFile = data[i].fileName.length;
        }

        str.push('  !  |  user'+" ".repeat(countName-4)+'  |  date'+" ".repeat(countDate-4)+'  |  comment'+" ".repeat(countComment-7)+'  |  fileName'+" ".repeat(countFile-6));
        str.push("-".repeat(countName+countDate+countComment+countFile+25));

        for (let i = 0; i < data.length; i++) {
            let arr =[];
            
            if(data[i].importantComment == 0) arr.push("     "); else arr.push("  !  ");
            if(data[i].userName.length>10)    arr.push("  "+data[i].userName.substr(0,7)+"...  ");     else arr.push("  "+data[i].userName+(" ".repeat(countName-data[i].userName.length))+"  ");
            if(data[i].dateComment.length>10) arr.push("  "+data[i].dateComment.substr(0,7)+"...  ");  else arr.push("  "+data[i].dateComment+(" ".repeat(countDate-data[i].dateComment.length))+"  ");
            if(data[i].userComment.length>50) arr.push("  "+data[i].userComment.substr(0,47)+"...  "); else arr.push("  "+data[i].userComment+(" ".repeat(countComment-data[i].userComment.length))+"  ");
            if(data[i].fileName.length>15)    arr.push("  "+data[i].fileName.substr(0,12)+"...  ");    else arr.push("  "+data[i].fileName+(" ".repeat(countFile-data[i].fileName.length))+"  ");
            
            str.push(arr.join('|'));
        }

        if (data.length!=0){ 
            str.push('-'.repeat(countName+countDate+countComment+countFile+25));
        }

        return console.log(str.join("\n"));
    }
    else return console.log(data);
}

module.exports = {
    readLine,
    writeLine,
};
