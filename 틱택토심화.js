var body = document.body;
var table = document.createElement('table');
var rows = []; // 줄 저장
var cols = []; // 칸 저장
var turn = 'X';
var n = 0; // 클릭 횟수

function 결과체크(which_row, which_col){
	// 세 칸 다 채워졌는가
		var all = false;
		// 가로줄 검사
		if(cols[which_row][0].textContent === turn && cols[which_row][1].textContent === turn && cols[which_row][2].textContent === turn){
			all = true;
		}
		// 세로줄 검사
		if(cols[0][which_col].textContent === turn && cols[1][which_col].textContent === turn && cols[2][which_col].textContent === turn){
			all = true;
		}
		// 대각선 검사 (모든 칸을 누를 때마다)
		if(cols[0][0].textContent === turn && cols[1][1].textContent === turn && cols[2][2].textContent === turn){
			all = true;
		}
		
		if(cols[0][2].textContent === turn && cols[1][1].textContent === turn && cols[2][0].textContent === turn){
			all = true;
		}
		
		return all;
} 

function 초기화(){
	text1.textContent = turn+'님의 승리!'
			// 초기화
			turn = 'X';
			cols.forEach(function (row){ // 이차원 배열은 반복문이 2번 필요
				row.forEach(function (col){
					col.textContent = '';
				});
			});
			n=0;
}

var text1 = document.createElement('h1');

var asynchronous = function(event){ // 비동기 콜백 함수를 변수로 만들기
	if(turn === 'O'){ // 컴퓨터의 턴일 때 내가 클릭하지 않도록
		return; 
	}
	var which_row = rows.indexOf(event.target.parentNode);
	var which_col = cols[which_row].indexOf(event.target);
	// 칸이 이미 채워져 있는가
	if(cols[which_row][which_col].textContent !== ''){	
	}else{ // 빈 칸이면
		text1.textContent = '';
		cols[which_row][which_col].textContent = turn;
		n++;
		var all = 결과체크(which_row, which_col);
		// 다 찼으면
		if(all){ // all === true
			초기화();
		}else{ // 다 안 찼으면
			if(turn == 'X'){
				turn = 'O';
			}
			
			setTimeout(function(){
				console.log('컴퓨터의 턴');
				// 빈 칸 중 하나를 고른다.
				var 후보칸 = [];
				cols.forEach(function (row){ // 이차원 배열은 반복문이 2번 필요
				row.forEach(function (col){
					후보칸.push(col);
					});
				});
				후보칸 = 후보칸.filter(function (col){ return !col.textContent}); // 빈 칸을 찾는 것
				var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
				if(후보칸.length > 1){
				선택칸.textContent = 'O';
				}else{
					초기화();
				}
				console.log(후보칸);
				console.log(선택칸);
				// 컴퓨터가 승리했는지 체크
				var which_row = rows.indexOf(선택칸.parentNode);
				var which_col = cols[which_row].indexOf(선택칸);
				var all = 결과체크(which_row, which_col);
				// 다 찼으면
				if(all){ // all === true
					초기화();
				}
				// 턴을 나한테 넘긴다.
				turn = 'X';
				console.log('내 차례');
				console.log(n);
			}, 1000);
		}
		
		if(n>=5){ // 무승부인 경우
			text1.textContent = '무승부';
			
			초기화();
		}
	}
};

for(var i=1;i<=3;i++){ // 3*3 테이블 만들기
	var row = document.createElement('tr'); // 행
	rows.push(row);
	cols.push([]); // 각 행에 배열 넣기
	for(var j=1;j<=3;j++){
		var col = document.createElement('td'); // 열 
		col.addEventListener('click', asynchronous);
		cols[i-1].push(col); // 2차원 배열 만들기
		row.appendChild(col)
	}
	table.appendChild(row);
}
body.appendChild(table);

var table = document.createElement('table');
console.log('줄들', row, '칸들', cols);

body.appendChild(text1);

