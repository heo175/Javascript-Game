var body = document.body;

var subNumber = [1,2,3,4,5,6,7,8,9];
var ArrayNumber = [];

for(var i=0;i<4;i++){
	var pick = subNumber.splice(Math.floor(Math.random() * 9)-i, 1)[0]; // 1~9까지 랜덤한 숫자를 하나 뽑아서 pick에 넣음
	ArrayNumber.push(pick);
}

console.log(ArrayNumber);

var number = document.createElement('h1'); // 뽑은 숫자 나타내는 곳
document.body.append(number);
// number.textContent = ArrayNumber;

var result = document.createElement('h1'); // 결과창
document.body.append(result);

var form1 = document.createElement('form');
document.body.append(form1);
var input = document.createElement('input'); // 입력창
form1.append(input);
var button1 = document.createElement('button'); // 입력버튼
button1.textContent = '입력!';
form1.append(button1);

var strike = 0;
var ball = 0;

// form 안에 있는 버튼은 엔터 가능
form1.addEventListener('submit', function(event){ // function 콜백함수
	event.preventDefault(); // 기본동작 : form을 엔터 쳐서 submit을 하면 다른 페이지로 가게 됨 (새로고침) -> 그 기본동작을 하지 못 하게 하는 것 

	for(var i=0;i<4;i++){
		if(ArrayNumber.includes(Number(input.value[i])) == true){
			ball++;

			if(ArrayNumber[i] == input.value[i]){
				strike++;
				ball--;
			}
		}
	}
		
		if(strike == 4){		
			result.textContent = '홈런!';
			alert('홈런!');
			
			subNumber = [1,2,3,4,5,6,7,8,9];
			ArrayNumber = [];
			
			for(var i=0;i<4;i++){
				pick = subNumber.splice(Math.floor(Math.random() * 9)-i, 1)[0]; // 1~9까지 랜덤한 숫자를 하나 뽑아서 pick에 넣음
				ArrayNumber.push(pick);
			}

			number.textContent = ArrayNumber;
			strike = 0;
			ball = 0;
		
			input.value = ''; // 입력창 다시 빈칸으로
			input.focus(); // 자동으로 입력창에 마우스 커서 가게
		}else if(strike > 0 && ball > 0){
			result.textContent = strike + '스트라이크' + ball + '볼';

			strike = 0;
			ball = 0;

			input.value = '';
			input.focus();
		}else if(strike > 0 && ball ==0){
			result.textContent = strike + '스트라이크';

			strike = 0;
			ball = 0;

			input.value = '';
			input.focus();
		}else if(ball > 0 && strike == 0 ){
			result.textContent = ball + '볼';

			strike = 0;
			ball = 0;

			input.value = '';
			input.focus();
		}else{
			result.textContent = '아웃';

			strike = 0;
			ball = 0;

			input.value = '';
			input.focus();
		}

	
});