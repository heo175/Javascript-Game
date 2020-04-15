var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false; // 플래그 : 코드의 흐름을 좌우하는 변수
var 열은칸 = 0;
var 코드표 = {
	연칸: -1,
	물음표: -2,
	깃발: -3,
	깃발지뢰: -4,
	물음표지뢰: -5,
	지뢰: 1,
	보통칸: 0,
}

document.querySelector('#exec').addEventListener('click', function(){
	// 내부 먼저 초기화
	tbody.innerHTML = ''; // tbody 내부 태그들을 지워버리는 것 -> 게임 초기화
	dataset = []; // 데이터 초기화
	중단플래그 = false;
	열은칸 = 0;
	document.querySelector('#result').textContent = '';
	var hor = parseInt(document.querySelector('#hor').value);
	var ver = parseInt(document.querySelector('#ver').value);
	var mine = parseInt(document.querySelector('#mine').value);
	console.log(hor, ver, mine);
	
	// 지뢰 위치 뽑기
	var Array1 = Array(hor * ver) // 가로 * 세로 = 칸의 개수
	.fill() // undefined로 다 채우기
	.map(function(e, index){ // map : 1대1로 짝 지어주기
		return index; // 자바스크립트는 0부터 시작하기 때문에 0부터 99 사이에서 뽑는게 더 좋을듯
	});

	var shuffle = []; // 지뢰를 심을 20개의 위치로 심기
	// for : 정확하게 몇 번 반복문을 돌아야하는지 알 때, while : 몇 번 반복문을 돌아야하는지 모를 때, 기준값이 바뀔 때
	while(Array1.length > hor * ver - mine){ // 20개만 필요하기 때문에
		var moving = Array1.splice(Math.floor(Math.random() * Array1.length), 1)[0]; // Math.floor(Math.random() * Array1.length :  0~44까지 나옴
		shuffle.push(moving); 
	}
	
	// 지뢰 테이블 만들기
	for(var i = 0; i < ver; i++){ // 2차원 배열
		var arr = [];
		var tr = document.createElement('tr');
		dataset.push(arr);
		for(var j = 0; j < hor; j++){
			arr.push(코드표.보통칸);
			var td = document.createElement('td');
			td.addEventListener('contextmenu', function(e){ // 우클릭 해서 클릭한 곳이 몇번째 줄 몇번째 칸인지 알기 위한 코드 
				e.preventDefault();
				if (중단플래그){
					return; // 중단플래그가 true면 함수 끝 (아래쪽 코드가 실행되지 않음)
				}
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); // 배열이 아닌 애들한테 indexOf를 쓸 수 있게 함
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				//console.log(부모tr, 부모tbody, e.currentTarget, 칸, 줄); // e.currentTarget  : 이벤트리스너를 단 대상, e.target : 실제 이벤트가 발생한 대상
				if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
					e.currentTarget.textContent = '!';
					e.currentTarget.classList.add('flag');
					if(dataset[줄][칸] === 코드표.지뢰){
						dataset[줄][칸] = 코드표.깃발지뢰;
					}else{
						dataset[줄][칸] = 코드표.깃발;
					}
				}else if(e.currentTarget.textContent === '!'){
					e.currentTarget.textContent = '?';
					e.currentTarget.classList.remove('flag');
					e.currentTarget.classList.add('question');
					if(dataset[줄][칸] === 코드표.깃발지뢰){
						dataset[줄][칸] = 코드표.물음표지뢰;
					}else{
						dataset[줄][칸] = 코드표.물음표;
					}
				}else if(e.currentTarget.textContent === '?'){
					e.currentTarget.classList.remove('question');
					if(dataset[줄][칸] === 코드표.물음표지뢰){
						e.currentTarget.textContent = 'X';
						dataset[줄][칸] = 코드표.지뢰;
					}else{
						e.currentTarget.textContent = '';
						dataset[줄][칸] = 코드표.보통칸;
					}
				}
				
			});
			td.addEventListener('click', function (e) {
				if (중단플래그){
					return; // 중단플래그가 true면 함수 끝 (아래쪽 코드가 실행되지 않음)
				}
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); // 배열이 아닌 애들한테 indexOf를 쓸 수 있게 함
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])){
					return; // 내 칸이 열려있으면(1이면) 중단
				}
				// 클릭했을 때 
				e.currentTarget.classList.add('opened'); // 태그 .classList로 태그의 클래스에 접근, add나 remove로 추가, 삭제
				열은칸 += 1;
				if(dataset[줄][칸] === 코드표.지뢰){ // 지뢰 클릭
					e.currentTarget.textContent = '펑';
					document.querySelector('#result').textContent = '실패 ㅠㅠ';
					중단플래그 = true;
				}else{ // 주변 지뢰 개수
					var 주변 = [						
						dataset[줄][칸-1],                     dataset[줄][칸+1],					
					];
					if(dataset[줄-1]){
						// concat : 배열과 배열을 합쳐 새로운 배열 만들기
						주변 = 주변.concat(dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]);
					}
					if(dataset[줄+1]){
						// concat : 배열과 배열을 합쳐 새로운 배열 만들기
						주변 = 주변.concat(dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]);
					}
					
					var 주변지뢰개수 = 주변.filter(function(v) { // 배열 요소가 x인걸로 필터링
						return v === 코드표.지뢰;
					}).length;
					e.currentTarget.textContent = 주변지뢰개수 || ''; // 앞값이 거짓이면 뒷값을 써라 ( 거짓 : false, '', 0, null, undefined, NaN)
					dataset[줄][칸] = 코드표.연칸;
					if (주변지뢰개수 === 0){ // 주변 지뢰 개수 오픈
						var 주변칸 = [];
						if(tbody.children[줄-1]){
							주변칸 = 주변칸.concat([
								tbody.children[줄-1].children[칸-1],
								tbody.children[줄-1].children[칸],
								tbody.children[줄-1].children[칸+1]
							]);
						}
						주변칸 = 주변칸.concat([
							tbody.children[줄].children[칸-1],
							tbody.children[줄].children[칸+1],
						]);
						if(tbody.children[줄+1]){
							주변칸 = 주변칸.concat([
								tbody.children[줄+1].children[칸-1],
								tbody.children[줄+1].children[칸],
								tbody.children[줄+1].children[칸+1]
							]);
						}
						주변칸.filter(function (v) {   // filter : undefined, null, 빈 문자열을 제거
							return !!v; 
						}).forEach(function(옆칸){ 
							var 부모tr = 옆칸.parentNode;
							var 부모tbody = 옆칸.parentNode.parentNode;
							var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸); 
							var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
							if(dataset[옆칸줄][옆칸칸] !== 코드표.연칸){
								옆칸.click(); // 재귀 
							}
						});
					}
				}
				if(열은칸 === hor * ver - mine){
					중단플래그 = true;
					document.querySelector('#result').textContent = '승리!!';
				}
			});
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	
	// 지뢰 심기
	for(var k=0; k<shuffle.length; k++){ // 60
		var 세로 = Math.floor(shuffle[k]/ver); // 7 -> 6
		var 가로 = shuffle[k] % ver; // 0 -> 0
		tbody.children[세로].children[가로].textContent = 'X';
		dataset[세로][가로] = 코드표.지뢰;
	}
});

