
//**************************************************************
//Neuron

function Robot(){
	
	this.Mind={};
	this.max=0;
	this.example={};
	
	this.neuron = function(name,x){

		var a=0.03;
		let y=0;
		for(let i=0;i<x.length;i++){

			
			y+=x[i]* this.Mind[name].weight[i];
		}

		let result=0;
		if(y!=0){
			result=1/(1 + Math.exp(-a*y));
		}
		return  result;
	};
	//Create new neuron
	this.add = function (name){

		this.Mind[name]={'weight':[]};
		for(let i=0;i<this.max;i++){
			this.Mind[name].weight[i]=Math.random();
		}

	};
	
	this.Output = function (name,val){
		let result=this.neuron(name,val);
		let f=Math.abs(0 - result);
		let t=Math.abs(1 - result);
		if(f>t){
			return 1;
		}else{
			return 0;
		}
	};
	
	this.Input = function  (val){
		
		let think=[];
		
		for(name in this.Mind){
			think[name]=this.Output(name,val);
		}
		
		return think;

		
	};
	
	this.Train = function (data){
		this.max=data[0].input.length;
		
		for(key in data){
			
			let name=data[key].name;
			let input=data[key].input;
			let output=data[key].output;
			if(this.Mind[name]==undefined){
				this.add(name);
				this.example[name]=[];
			}
			this.example[name].push({'input':input,'output':output});
			
			
			
			
		}
		console.log(this.Mind);
		//******************************************************
		console.log(this.example);
		var lesson=0;
		for(name in this.example){
			let _TR=this.example[name];
			
			var j=0;

			var trained=0;
			
			while(trained<_TR.length){
				this.Teach(name);
				lesson++;
				trained=0;
			
				for (let x=0;x<_TR.length;x++){
					//console.log(_TR[x].input);
					
					let res=this.Output(name,_TR[x].input);
					//console.log(res);
					if(res==_TR[x].output ){
						trained++;
					}
				}

				if(trained==_TR.length) break;
				j++;
				if(j>500) break;

				
			}
		
		
		}
		

		
		console.log(lesson);
		console.log(this.Mind);
		
	};
	
	this.Teach = function  (name){
		let _TR=this.example[name];

		var n=0.1;
		var k =_TR.length;
		for(let i=0;i<k;i++){
			let b=_TR[i].output - this.neuron(name,_TR[i].input);
			for (let x=0;x<this.max;x++){
				

				this.Mind[name].weight[x]+=n * b * _TR[i].input[x];

				
			}
			

		}
	}
		
		

	
	
}


