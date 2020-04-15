var body = document.body;
var word1 = document.createElement('div'); //div 태그 추가
word1.textContent = '하이';
document.body.append(word1); //브라우저에 띄우기

var form1 = document.createElement('form');
document.body.append(form1);
var input = document.createElement('input');
form1.append(input);
var button1 = document.createElement('button');
button1.textContent = '입력!';
form1.append(button1);
var result = document.createElement('div');
document.body.append(result);

// form 안에 있는 버튼은 엔터 가능
form1.addEventListener('submit', function(event){ // function 콜백함수
	event.preventDefault(); // 기본동작 : form을 엔터 쳐서 submit을 하면 다른 페이지로 가게 됨 (새로고침) -> 그 기본동작을 하지 못 하게 하는 것 
	if(word1.textContent[word1.textContent.length-1]===input.value[0]){
		result.textContent = '맞췄어요';
		word1.textContent = input.value; 
		input.value = ''; // 입력창 다시 빈칸으로
		input.focus(); // 자동으로 입력창에 마우스 커서 가게
	}else{
		result.textContent = '틀렸어요';
		input.value = '';
		input.focus();
	}
});

/*
var word = '하이'
var i = 0
while(i<5){
	var answer = prompt(word);
	if(word[word.length-1]===answer[0]){
		alert('맞췄어요');
		word=answer;
	}else{
		alert('틀렸어요');
	}
	i++;
}
*/