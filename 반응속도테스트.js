var 스크린 = document.querySelector('#screen');
var 시작시간;
var 끝시간;
var 기록 = [];
var 타임아웃;
var sum=0;
var avg=0;
var n=0;
//var 시작시간 = new Date(); // 시간 구하기 1
//console.time('시간'); // 시간 구하기 2
//var 시작시간 = performance.now(); // 시간 구하기 3

스크린.addEventListener('click', function(){
	//var 끝시간 = new Date(); // 시간 구하기 1 -> 보통은 제일 많이 씀
	//console.timeEnd('시간'); // 시간 구하기 2
	//var 끝시간 = performance.now(); // 시간 구하기 3 -> 정밀한 시간
	// console.log((끝시간-시작시간)/1000); // 밀리초이기 때문에 1000으로 나눔
	if(스크린.classList.contains('waiting')){ // classList.contains : 현재 클래스 파악 가능
		스크린.classList.remove('waiting');
		스크린.classList.add('ready');
		스크린.textContent = '초록색이 되면 클릭하세요.';
		타임아웃 = setTimeout(function(){
			시작시간 = new Date(); 
			스크린.click();
		}, Math.floor(Math.random() * 1000) + 2000); // 2000~3000 사이의 랜덤한 수
	
	} else if(스크린.classList.contains('ready')){ // classList.contains : 현재 클래스 파악 가능
		if(!시작시간){ // 부정 클릭 - undefined, 0, NaN, null, false, ''
			clearTimeout(타임아웃); // setTimeout을 clearTimeout으로 취소할 수 있음
			스크린.classList.remove('ready');
			스크린.classList.add('waiting');
			스크린.textContent = '너무 성급하시군요! 다시 클릭하세요.';
		}else{
			스크린.classList.remove('ready');
			스크린.classList.add('now');
			스크린.textContent = '클릭하세요!';
		}	
	} else if(스크린.classList.contains('now')){ // classList.contains : 현재 클래스 파악 가능
		끝시간 = new Date();
		console.log('반응속도',끝시간-시작시간);
		기록.push(끝시간-시작시간);
		n++;
		시작시간 = null;
		끝시간 = null;
		스크린.classList.remove('now');
		스크린.classList.add('waiting');
		스크린.textContent = '클릭해서 시작하세요.';
		
		for(var i=0;i<기록.length;i++){
			sum = sum + 기록[i];
			avg = (sum/기록.length)/1000;
		}
		console.log(avg, '초');
		document.querySelector('#result');
		result.textContent = n + "회 성공했으며, 평균 기록은 " + avg.toFixed(2) + "초 입니다.";
	}
	
});

