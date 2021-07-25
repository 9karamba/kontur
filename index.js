try{
    const { readFiles } = require('./fileSystem');
    const { readLine, writeLine } = require('./console');
    const { show } = require('./show/show');
    const { important } = require('./important/important');
    const { user } = require('./user/user');
    const { compare } = require('./sort/sort');
    const { date } = require('./date/date');

    app();

    function app () {

        console.log('Please, write your command!');
        readLine(processCommand);

    }

    function getResult(func, arg, output){

        return readFiles(process.cwd()) 
            .then(file => { 
                var files = [];

                for(var i=0;i<file.length;i++){
                    files.push(file[i]);
                }

                show(files, function(comments){

                    func(comments, arg, output);

                },null,files[files.length-1]);

            }, error => console.log(error));

    }

    function processCommand (command) {

        switch (command[0]) {
            case 'exit':
                process.exit(0);
                break;

            case 'show':
                getResult(writeLine);
                break;

            case 'important':
                getResult(important, writeLine);
                break;

            case 'user':
                getResult(user, command.slice(1).join(" "), writeLine);
                break;

            case 'sort':
                getResult(compare, command[1], writeLine);
                break;

            case 'date':
                getResult(date, command[1], writeLine);
                break;

            default:
                console.log('wrong command');
                break;

        }
    }
}
catch(err){
    console.log(err.message);
    process.exit(0);
}