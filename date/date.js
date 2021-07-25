
function date(comments, reg, callback){
	const date = /(^(19[7-9]\d|20[0-2]\d|203[0-7])(-((0[469]|11)(-(0[1-9]|[12]\d|30))?$|(0[13578]|1[02])(-(0[1-9]|[12]\d|3[01]))?$))?$|^(19(8[048]|[79][26])|20([02][048]|[13][26]))(-02(-(0[1-9]|1\d|2[0-9]))?$)?$|^(19([79][01345789]|8[1235679])|20([02][1235679]|1[01345789]|3[013457]))(-02(-(0[1-9]|1\d|2[0-8]))?$)?$)/;
        
	if(!date.test(reg))
		callback('true format { date yyyy-mm-dd }');
	else {

		let arr = comments.filter((comment) => {
			if(RegExp(reg,'i').test(comment.dateComment.trim()) || comment.dateComment.trim()>reg)
				return comment;
		});

		if(arr.length==0) callback([]);
		else callback(
			arr.sort((a,b) => {
				if (a.dateComment > b.dateComment) return 1;
				if (a.dateComment < b.dateComment) return -1;
			})
		);
			
	}
	
}


module.exports = {
    date,
};