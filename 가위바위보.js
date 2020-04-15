var imgCoordinate = 0;
// 딕셔너리 자료구조 : 자바스크립트 객체는 딕셔너리 자료구조 역할을 할 수 있음. 1:1 매칭 표현
var dictionary = {
	바위: '0',
	가위: '-142px',
	보: '-284px'
};
/* 이렇게 여러가지 딕셔너리를 만드는 것은 비효율적이고 힘듦(하드 코딩)
var dictionary2 = {
	'0': 'rock',
	'-142px': 'scissor',
	'-284px' : 'paper'
};
*/

function comChoice(imgCoordinate){
	// Object.entries(dictionary) : 객체가 2차원 배열로 바뀜
	// 배열.find는 반복문 : 원하는 것을 찾으면(return true) 멈춤
	return  Object.entries(dictionary).find(function(v){
		return v[1] === imgCoordinate; // 좌표가 두번째 배열에 들어있어서 v[1]
	})[0]; // 이 배열의 0번째꺼를 가져와야하므로
}

// 비동기 함수
var interval;
function intervalMaker(){
	interval = setInterval(function(){ // 0.1초마다 계속 실행
	if(imgCoordinate === dictionary.바위){
		imgCoordinate = dictionary.가위;
	}else if(imgCoordinate === dictionary.가위){
		imgCoordinate = dictionary.보;
	}else{
		imgCoordinate = dictionary.바위;
	}
	document.querySelector('#computer').style.background = 
	 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoordinate + ' 0';
	}, 100);	
} 

intervalMaker();

var score = { // 딕셔너리 자료구조
	가위: 1,
	바위: 0,
	보: -1
};

// class는 제일 위 1개만 선택하기 때문에 querySelectorAll로 해야하며
document.querySelectorAll('.btn').forEach(function(btn){
	btn.addEventListener('click', function(){ // 비동기 함수
		clearInterval(interval); // clearInterval() : setInterval을 멈춤
		setTimeout(function(){ // 1초 뒤에 다시 그림 움직이게
			intervalMaker();
		}, 1000);
		
		var myChoice = this.textContent;
		var myScore = score[myChoice];
		var comScore = score[comChoice(imgCoordinate)];
		var scoreDifference = myScore - comScore;
		console.log(myChoice, comChoice(imgCoordinate));
		
		var result1 = document.querySelector('#result1');
		result1.textContent = "나 : " + myChoice + ", 컴퓨터 : " + comChoice(imgCoordinate);
		var result2 = document.querySelector('#result2');
		
		if(scoreDifference === 0){
			result2.textContent = "비겼어요! :-)";	
		}else if([-1, 2].includes(scoreDifference)){
			// includes : score[myChoice] - score[comChoice(imgCoordinate)] === -1 || score[myChoice] - score[comChoice(imgCoordinate)] === 2
			result2.textContent = "이겼어요! ^_^";	
		}else{
			result2.textContent = "졌어요! ㅠㅠ";	
		}	
	});
});



