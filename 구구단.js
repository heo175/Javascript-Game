var n1 = Math.ceil(Math.random() * 9);
var n2 = Math.ceil(Math.random() * 9);
var result1 = n1 * n2;

var body = document.body;
var word1 = document.createElement('div');
word1.textContent = String(n1) + '*' + String(n2) + '=';
document.body.append(word1);

var form1 = document.createElement('form');
document.body.append(form1);
var input = document.createElement('input');
input.type = 'number'; // 밑에서 Number(input.value) 할 필요 없음 - 안 먹힘 ㅠㅠ
form1.append(input);
var button1 = document.createElement('button');
button1.textContent = '입력!';
form1.append(button1);
var result = document.createElement('div');
document.body.append(result);

// form 안에 있는 버튼은 엔터 가능
form1.addEventListener('submit', function(event){ // function 콜백함수
	event.preventDefault(); // 기본동작 : form을 엔터 쳐서 submit을 하면 다른 페이지로 가게 됨 (새로고침) -> 그 기본동작을 하지 못 하게 하는 것 
	console.log(result1, input.value);
	if(result1===Number(input.value)){
		result.textContent = '맞췄어요';
		
		n1 = Math.ceil(Math.random() * 9);
        n2 = Math.ceil(Math.random() * 9);
		result1 = n1 * n2;
		word1.textContent = String(n1) + '*' + String(n2) + '=';
		
		input.value = ''; // 입력창 다시 빈칸으로
		input.focus(); // 자동으로 입력창에 마우스 커서 가게
	}else{
		result.textContent = '틀렸어요';
		input.value = '';
		input.focus();
	}
});