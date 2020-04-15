var body = document.body;
var subNumber;
var ArrayNumber;

function pickNumber(){
	subNumber = [1,2,3,4,5,6,7,8,9];
	ArrayNumber = [];

	for(var i=0;i<4;i++){
		var pick = subNumber.splice(Math.floor(Math.random() * (9-i)), 1)[0]; // 1~9까지 랜덤한 숫자를 하나 뽑아서 pick에 넣음, splice : [0]을 안 붙이면 배열이 되어버림
		ArrayNumber.push(pick);
	}
}

pickNumber();
console.log(ArrayNumber);

var result = document.createElement('h1'); // 결과창
document.body.append(result);

var form1 = document.createElement('form');
document.body.append(form1);
var input = document.createElement('input'); // 입력창
form1.append(input);
input.type = 'text';
input.maxLength = 4; // 4자리까지만 입력할 수 있게
var button1 = document.createElement('button'); // 입력버튼
button1.textContent = '입력!';
form1.append(button1);

var n=0; // 틀린 횟수
var number = document.createElement('h1'); // 남은 기회 나타내는 곳
document.body.append(number);
number.textContent = (10-n) + '번 남았습니다.';

// form 안에 있는 버튼은 엔터 가능
form1.addEventListener('submit', function(event){ // function 콜백함수
	event.preventDefault(); // 기본동작 : form을 엔터 쳐서 submit을 하면 다른 페이지로 가게 됨 (새로고침) -> 그 기본동작을 하지 못 하게 하는 것 

	var answer = input.value;

	// join('') : 배열을 문자로 만들기
	if(answer === ArrayNumber.join('')){ // 답이 맞으면
		result.textContent = '홈런';
		input.value = '';
		input.focus();
		
		n = 0;

		pickNumber();
	}else{ // 답이 틀리면
	// 문자를 배열로 만들기
		var ArrayAnswer = answer.split('');
		var strike = 0;
		var ball = 0;

		n++;
		if(n>10){ // 10번 넘게 틀린 경우
			result.textContent = '10번 틀려서 실패~ 답은 '+ArrayNumber.join('')+ '였습니다.';
			input.value = '';
			input.focus();

			n = 0;

			pickNumber();
		}else{
		for(var i=0;i<4;i++){
			// 같은 자리인지 확인
			if(Number(ArrayAnswer[i]) === ArrayNumber[i]){ // ArrayAnswer는 문자이기 때문에 숫자로 바꿔줘야함
				strike++;
			// 같은 자리는 아니지만 숫자가 겹치는지 확인
			}else if(ArrayNumber.indexOf(Number(ArrayAnswer[i])) > -1){ // 배열.indexOf(값) : 배열에서의 값의 위치를 알 수 있음. 배열에 값이 없으면 -1
				ball++;
			}
		}
		result.textContent = strike + '스트라이크' + ball + '볼';
		number.textContent = (10-n) + '번 남았습니다.';
		input.value = '';
		input.focus();
		}
	}
	
});
