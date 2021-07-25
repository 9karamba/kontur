
function compare (comments, sign, callback){
	if (sign=='importance'){
		callback(
			comments.sort((a,b) => {
				if (a.importantComment > b.importantComment) return -1;
	  			if (a.importantComment < b.importantComment) return 1;
			})
		);
	}
	else if (sign=='user'){
		callback(
			comments.sort((a,b) => {
				if (b.userName.trim() == "") return -1;
				if (a.userName.trim() == "") return 1;
				if(a.userName.toLowerCase() < b.userName.toLowerCase())  return -1; 
	    		if(a.userName.toLowerCase() > b.userName.toLowerCase())  return 1; 
			})
		);
	}
	else if (sign=='date'){
		callback(
			comments.sort((a,b) => {
				if (a.dateComment > b.dateComment) return -1;
	  			if (a.dateComment < b.dateComment) return 1;
			})
		);
	}
	else callback("enter sort {importance | user | date}");
}


module.exports = {
    compare,
};