global.parseTime = function(input){
	let keys = Object.keys(timeTable);
	let re = new RegExp('[('+keys.join(')(?:')+')]', 'g');
	let slicePos = 0;
	let val = 0;
	
	//Return Infinity
	if(input.includes("forever")) return Infinity;
	
	// Maximum of 32 time fields, so it doesn't lag if someone spams
	let matchesLeft = 32;
	while(--matchesLeft) {
		let res = re.exec(input);
		if(res == null) break;
		let timeType = input.charAt(res.index);
		if(keys.includes(timeType)) {
			let thisVal = Number(input.substring(slicePos, res.index));
			if(Number.isFinite(thisVal) && !Number.isNaN(thisVal)) {
				val += thisVal * timeTable[timeType];
			}
		}
		slicePos = res.index + 1;
	}
	
	return val;
}
global.timeTable = {
	's':1000,
	'm':60*1000,
	'h':60*60*1000,
	'd':24*60*60*1000,
	'w':7*24*60*60*1000,
	'y':365*24*60*60*1000
};