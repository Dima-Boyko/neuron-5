
var max=20;

paint();

var TR=Example();
//console.log(TR);
var R=new Robot;
R.Train(TR);

function paint(){
	var canvas = document.getElementById('eyes');
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
    var h=canvas.height;
	ctx.beginPath();
	ctx.moveTo(w/2, 0);
	ctx.lineTo(w/2, h);
	ctx.stroke();

	canvas.addEventListener("click", function(e){
		let x = e.pageX - this.offsetLeft;
		let y = e.pageY - this.offsetTop;
		ctx.beginPath();
		ctx.fillStyle ='#ff0000';
		ctx.arc(x, y, 10, 0, 2 * Math.PI);
		ctx.fill();
		let input_x=Math.floor(x/20);




		let res=R.Input(Receptor(input_x));
		if(res.right>res.left){
			document.getElementById('output').innerHTML= "Right / Правий";
		}
		if(res.right<res.left){
			document.getElementById('output').innerHTML= "Left / Лівий";
		}
		if(res.right==res.left){
			document.getElementById('output').innerHTML= "Center / Серединна";
		}
		
	});
	

}

function Receptor(n){
	let list_receptors=[];
	for (let x=0;x<max;x++){
		if(x==n){
			list_receptors.push(1);
		}else{
			list_receptors.push(0);
		}
		
	}
	return list_receptors;
}


function Example(){
	var _example=[];
	var tr=[];
	var def=[];
	
	for (let x=0;x<max;x++){
		let r=0;
		let l=0;
		if(x>=10){
			r=1;
		}else{
			l=1;
		}
	


		let item=Receptor(x);

		

		_example.push({'name':'right','input':item,'output':r});
		_example.push({'name':'left','input':item,'output':l});
	}

	while(_example.length>0){
		tr.push(_example.pop());
		tr.push(_example.shift());
	}
	
	return tr;
	
}

//***************************************************
//***************************************************

