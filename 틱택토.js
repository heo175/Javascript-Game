var body = document.body;
var table = document.createElement('table');
var rows = []; // 줄 저장
var cols = []; // 칸 저장
var turn = 'X';
var n = 0; // 클릭 횟수

var text1 = document.createElement('h1');

var asynchronous = function(event){ // 비동기 콜백 함수를 변수로 만들기
	console.log(event.target); // event.target : 클릭된 타겟 - 칸
	console.log(event.target.parentNode); // event.target.parentNode : 클릭된 타겟의 부모 태그 - 줄
	console.log(event.target.parentNode.parentNode); // - 테이블
	
	var which_row = rows.indexOf(event.target.parentNode);
	console.log('몇줄 ', which_row);
	var which_col = cols[which_row].indexOf(event.target);
	console.log('몇칸 ', which_col);
	// 칸이 이미 채워져 있는가
	if(cols[which_row][which_col].textContent !== ''){
		console.log('빈칸 아녀요.');	
	}else{ // 빈 칸이면
		console.log('빈칸.');
		text1.textContent = '';
		cols[which_row][which_col].textContent = turn;
		n++;
		
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
		// 대각선 검사
		if(which_row - which_col === 0){ // 대각선 검사 필요한 경우 // Math.abs() : 절댓값
			if(cols[0][0].textContent === turn && cols[1][1].textContent === turn && cols[2][2].textContent === turn){
				all = true;
			}
		}
		if(Math.abs(which_row - which_col) === 2){ // 대각선 검사 필요한 경우 // Math.abs() : 절댓값
			if(cols[0][2].textContent === turn && cols[1][1].textContent === turn && cols[2][0].textContent === turn){
				all = true;
			}
		}
		// 다 찼으면
		if(all){ // all === true
			text1.textContent = turn+'님의 승리!'
			// 초기화
			turn = 'X';
			cols.forEach(function (row){ // 이차원 배열은 반복문이 2번 필요
				row.forEach(function (col){
					col.textContent = '';
				});
			});
			n=0;
		}else{
			if(turn == 'X'){
				turn = 'O';
			}else{
				turn = 'X';
			}
		}
		
		if(n>=9){ // 무승부인 경우
			text1.textContent = '무승부';
			
			// 초기화
			turn = 'X';
			cols.forEach(function (row){ // 이차원 배열은 반복문이 2번 필요
				row.forEach(function (col){
					col.textContent = '';
				});
			});
			n=0;
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

