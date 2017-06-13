function run(){
	var program = document.forms[0].codebox.value;
	var result = document.getElementById("output");

	var params = document.getElementById("argv").value;
	result.innerHTML += interpret(program, params);
	result.innerHTML += "<br>";
}
	function clear(frm) {
	switch (frm){
	case 'codebox':
		document.forms[0].codebox.value = '';
		break;
	case 'argv':
		document.forms[0].argv.value = '';
		break;
	case 'output':
		document.getElementById("output").innerHTML = "";
		break;
	default:
		return 0;
	}
	return false;
}

function getLoops(src){
	var opened = [];
	var loops = {};
	for(var i = 0;i<src.length;i++){
		if(src[i] == '{')
			opened.push(i);
		else if (src[i] == '}'){
			loops[i] = opened.pop();
			loops[loops[i]] = i;
		}
	}
	return loops;
}
function getConditions(src){
	var opened = [];
	var conds = {};
	for(var i = 0;i<src.length;i++){
		if(src[i] == '(')
			opened.push(i);
		else if (src[i] == ')'){
			conds[i] = opened.pop();
			conds[conds[i]] = i;
		}
	}
	return conds;
}
function getElses(src){
	var opened = [];
	var elses = {};
	for(var i = 0;i<src.length;i++){
		if(src[i] == ')')
			opened.push(i);
		else if (src[i] == '\\'){
			elses[i] = opened.pop();
			elses[elses[i]] = i;
		}
	}
	return elses;
}

function interpret(prog, params){
	var max_val = 1<<16;//65536=2^16
	var IterCounter = 1<<14;//16384=2^14
	var FuckTheLogicdict = [];
	FuckTheLogicdict[0] = 0;
	var x = 0;
	var l = 0;
	var argi = 0;

	var filt = function(st){
		if(isNaN(parseInt(st, 16))) return 0;
		else return parseInt(st, 16);
	}

	params = (params.split(' ')).map(filt);
	console.log(params);
	var result = '';

	var LoopBlocks = getLoops(prog);
	var CondBlocks = getConditions(prog);
	var ElseBlocks = getElses(prog);
	
	for (i = 0; i < prog.length; i++) {
		switch (prog.charAt(i)) {
			case ">":
				x++;
				if(FuckTheLogicdict[x]==undefined) FuckTheLogicdict[x] = 0;
			break;
			case "<":
				x--; if(x<0) x = 0;
			break;
			case "+":
				FuckTheLogicdict[x]++;
			break;
			case "-":
				FuckTheLogicdict[x]--;
			break;
			case ";":
				FuckTheLogicdict[x] = FuckTheLogicdict[x] << 1;
			break;
			case ":":
				FuckTheLogicdict[x] = FuckTheLogicdict[x] >> 1;
			case "~":
				if(x>0)
					FuckTheLogicdict[x] = FuckTheLogicdict[x-1];
			case "!":
				result += String.fromCharCode(FuckTheLogicdict[x]);
			break;
			case "@":
				result += (FuckTheLogicdict[x].toString(16)).toUpperCase() + "<br/>";
			break;
			case "?":
				FuckTheLogicdict[x] = params[argi];
				argi++;
			break;
			case "{":
				if(!FuckTheLogicdict[x])
					i = LoopBlocks[i];
			break;
			case "}":
				if(FuckTheLogicdict[x])
					i = LoopBlocks[i];
			break;
			case "(":
				if(!FuckTheLogicdict[x])
					i = CondBlocks[i];
			break;
			case ")":
				if(FuckTheLogicdict[x])
					i = ElseBlocks[i];
			break;
		}
	FuckTheLogicdict[x] %= max_val;
	IterCounter--;
	if(!IterCounter) return result;	
	}
	return result;
}

function showFileInput() {
	var fileInput = document.getElementById("fileInput");
	fileInput.click();
}

function processFiles(files){
	var file = files[0];
	var reader = new FileReader();
	reader.onload = function (e) {
		document.forms[0].codebox.value = e.target.result;
	};
	reader.readAsText(file);
}


function SaveFile(){
	var text = document.forms[0].codebox.value;
	var BlobBlob = new Blob([text], {type : 'text/plain'});
	ww = URL.createObjectURL(BlobBlob);
	dl.href = ww;
}

function newFile(){
	clear('codebox');
	clear('argv');
	clear('output');
	return false;
}
