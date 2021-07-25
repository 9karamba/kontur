
function show(files, callback, arrComments, lastElement) {
        
    const regexp    = new RegExp('//\\s*TODO', 'ig');
    const separator = /;+[\s;]+;+|;+/ig;
    const date      = /((19[7-9]\d|20[0-2]\d|203[0-7])-((0[469]|11)-(0[1-9]|[12]\d|30)|(0[13578]|1[02])-(0[1-9]|[12]\d|3[01]))|(19(8[048]|[79][26])|20([02][048]|[13][26]))-02-(0[1-9]|1\d|2[0-9])|(19([79][01345789]|8[1235679])|20([02][1235679]|1[01345789]|3[013457]))-02-(0[1-9]|1\d|2[0-8]))/;

    let comments    = arrComments || [];

    files.forEach( (file) => {

        if(Array.isArray(file)){

            if(file==lastElement){
                return show(file,callback,comments,file[file.length-1]);
            }
            return show(file,callback,comments,lastElement);
        }
        
        if (file!=undefined && file.search(regexp) != -1){

            var linesFile = file.split(/\r\n?|\n/);

            linesFile.forEach( (line) => {

                if (line.search(regexp) != -1){
            
                    let importantComment = "", 
                        userName         = "", 
                        dateComment      = "", 
                        userComment      = "",
                        fName            = linesFile[0];
                        
                    const comment      = line.substring( line.toUpperCase().indexOf("TODO",line.search(regexp))+4 );
                    const commentParts = comment.split(separator); 
                    

                    switch(true){
                        case comment.match(separator)==null:
                            userComment = comment.trim();
                            break;

                        case comment.match(separator).length==1:
                            userName    = commentParts[0].trim(); 
                            userComment = comment.slice(comment.lastIndexOf(commentParts[1])).trim();
                            
                            if (date.test(commentParts[0])){
                                userName    = "";
                                dateComment = (commentParts[0].match(date) || [""])[0]; 
                            }
                            else if (date.test(commentParts[1])){
                                dateComment = (commentParts[1].match(date) || [""])[0];
                                userComment = ""; 
                            }
                            break;

                        default:
                            userName    = commentParts[0].trim();
                            userComment = comment.slice(comment.lastIndexOf(commentParts[1])).trim();

                            if (date.test(commentParts[0])){
                                userName    = "";
                                dateComment =(commentParts[0].match(date) || [""])[0]; 
                            }
                            else if (date.test(commentParts[1])){
                                dateComment = (commentParts[1].match(date) || [""])[0];
                                userComment = comment.slice(comment.lastIndexOf(commentParts[2])).trim();
                            }
                            break;
                    }

                    importantComment = (userComment.match( /!/ig ) || []).length;
                    
                    comments.push({
                        importantComment: importantComment, 
                        userName: userName, 
                        dateComment: dateComment, 
                        userComment: userComment, 
                        fileName: fName
                    }); 
                }   

            });
            
        }
        
        if(file==lastElement){
            return callback(comments);
        }
        
    });
    
}

module.exports = {
    show,
};