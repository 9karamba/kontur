
function important(comments, callback){
	
	if(comments.length==0) callback([]);
	else{
		
		comments = comments.filter( (comment) => {
			return comment.importantComment!=0
		});
		
		callback(comments);
	}
}


module.exports = {
    important,
};