/*
var Array1 = Array(45); // empty : 반복문 불가
var fill = Array1.fill();
*/
/* forEach를 이용하면 억지로 끼워맞춰 넣는 것
fill.forEach(function(e, index){
	console.log(e, index+1);
	fill[index] = index+1;
});

console.log(fill);
*/

// 45개 숫자를 배열에 넣었음
// mapping 맵 : 1대1로 짝 지어주기
var Array1 = Array(45)
	.fill()
	.map(function(e, index){
	return index+1;
});
console.log(Array1);

var shuffle = [];
// for : 정확하게 몇 번 반복문을 돌아야하는지 알 때, while : 몇 번 반복문을 돌아야하는지 모를 때, 기준값이 바뀔 때
while(Array1.length > 0){
	var moving = Array1.splice(Math.floor(Math.random() * Array1.length), 1)[0]; // Math.floor(Math.random() * Array1.length :  0~44까지 나옴
	shuffle.push(moving); 
}
console.log(shuffle);

var bonus = shuffle[shuffle.length - 1];
var number = shuffle
	.slice(0, 6) // 0번째 자리에서부터 6번째 자리까지 자르기
	.sort(function (p, c){ // number.sort(function (p, c){ return p-c; }) : 오름차순으로 정렬
		return p-c; 
	}); 
console.log('당첨',number,'보너스',bonus);

// 자바스크립트로 HTML 태그 선택하기

//var result = document.getElementById('result');
var result = document.querySelector('#result'); // css처럼 태그 찾기

function coloring(ballNumber, result) {
	var ball = document.createElement('div');
	ball.textContent = ballNumber; //number[ballNumber]
	ball.style.display = 'inline-block';
	ball.style.border = '1px solid black';
	ball.style.borderRadius = '10px'; // 자바스크립트에서 border-radius는 빼기가 되기 때문에 대문자로 표기
	ball.style.width = '20px';
	ball.style.height = '20px';
	ball.style.textAlign = 'center';
	ball.style.marginRight = '10px';
	ball.style.fontSize = '16px';
	ball.className = 'ballID' + ballNumber; // html : class, javascript : classname
	var backgroundcolor;
	if(ballNumber <= 10){
		backgroundcolor = 'red';
	}else if(ballNumber <= 20){
		backgroundcolor = 'orange';
	}else if(ballNumber <= 30){
		backgroundcolor = 'yellow';
	}else if(ballNumber <= 40){
		backgroundcolor = 'blue';
	}else{
		backgroundcolor = 'green';
	}
	ball.style.background = backgroundcolor;
	result.appendChild(ball);
}

/*
setTimeout(function asynchronous(){
	coloring(number[0], result);
}, 1000); // 1000밀리초 = 1초
setTimeout(function asynchronous(){
	coloring(number[1], result);
}, 2000); // 1000밀리초 = 1초
setTimeout(function asynchronous(){
	coloring(number[2], result);
}, 3000); // 1000밀리초 = 1초
setTimeout(function asynchronous(){
	coloring(number[3], result);
}, 4000); // 1000밀리초 = 1초
setTimeout(function asynchronous(){
	coloring(number[4], result);
}, 5000); // 1000밀리초 = 1초
setTimeout(function asynchronous(){
	coloring(number[5], result);
}, 6000); // 1000밀리초 = 1초
*/

for(var i=0; i<number.length; i++){
	(function 클로저(j) {
		setTimeout(function () {
			coloring(number[j], result);
		}, (j+1) * 1000);
	})(i);
}

setTimeout(function asynchronous(){
	//var bonus1 = document.getElementsByClassName('bonus1')[0]; // 클래스는 여러번 쓸 수 있기 때문에 [0] 붙이는 것
	var bonus1 = document.querySelector('.bonus1'); // css처럼 태그 찾기
	coloring(bonus, bonus1)
}, 7000); // 1000밀리초 = 1초

