
function user(comments, name, callback){
	if (name=="") name = " ";
	
	if (comments.length==0) callback([]);
	else{

		comments = comments.filter( (comment) => {
			return RegExp('^'+name,'i').test(comment.userName.split(/\s+/).join(" "));
		});

		callback(comments);

	}
}


module.exports = {
    user,
};