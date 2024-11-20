document.addEventListener('DOMContentLoaded', function() {
    const number_select = document.getElementById('number_select');
    const number_select2 = document.getElementById('number_select2');
    const matrix1 = document.getElementById('matrix1');

    const number_select3 = document.getElementById('number_select3');
    const number_select4 = document.getElementById('number_select4');
    const matrix2 = document.getElementById('matrix2');
    
    const matrixResult = document.getElementById('matrixResult');

    function createMatrix1(rows, cols, container) {
        container.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            for (let y = 0; y < cols; y++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-input1';
                row.appendChild(input);
            }
            container.appendChild(row);
        }
    }

    function createMatrix2(rows, cols, container) {
        container.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            for (let y = 0; y < cols; y++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-input2';
                row.appendChild(input);
            }
            container.appendChild(row);
        }
    }

    function createMatrixResult(rows, cols, container) {
        container.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            for (let y = 0; y < cols; y++) {
                const cell = document.createElement('input');
                cell.className = 'matrix-cell';
                cell.disabled = true;
                row.appendChild(cell);
            }
            container.appendChild(row); 
        }
    }
    
    function update_matrix1() {
        const rows = parseInt(number_select.value);
        const cols = parseInt(number_select2.value);
        createMatrix1(rows, cols, matrix1);
    }

    function update_matrix2() {
        const rows = parseInt(number_select3.value);
        const cols = parseInt(number_select4.value);
        createMatrix2(rows, cols, matrix2);
    }

    function update_matrixResult() {
        const rows = parseInt(number_select.value);
        const cols = parseInt(number_select4.value);
        createMatrixResult(rows, cols, matrixResult);
    }

    number_select.addEventListener('change', update_matrix1);
    number_select2.addEventListener('change', update_matrix1);
    number_select3.addEventListener('change', update_matrix2);
    number_select4.addEventListener('change', update_matrix2);
    
    number_select.addEventListener('change', update_matrixResult)
    number_select4.addEventListener('change', update_matrixResult)

    update_matrix1();
    update_matrix2();
    update_matrixResult();
});
  
function togglePopup() {
    var popup = document.getElementById("myPopup");
    var overlay = document.querySelector(".overlay");
    popup.classList.toggle("show");
    overlay.style.display = (overlay.style.display === "block") ? "none" : "block";
  }

function saveInput1() {
    const matrix1_inputs = document.getElementsByClassName('matrix-input1');
    const values = [];
    for (let i = 0; i < matrix1_inputs.length; i++) {
        values.push(matrix1_inputs[i].value);
    }
    document.getElementById('input1').textContent = values.join(', ');
}

function saveInput2() {
    const matrix2_inputs = document.getElementsByClassName('matrix-input2');
    const values = [];
    for (let i = 0; i < matrix2_inputs.length; i++) {
        values.push(matrix2_inputs[i].value);
    }
    document.getElementById('input2').textContent = values.join(', ');
}

function splitMatrix1() {
    const matrix1_inputs = document.getElementsByClassName('matrix-input1');
    const values = [];
    for (let i = 0; i < matrix1_inputs.length; i++) {
        values.push(parseInt(matrix1_inputs[i].value));
    }
    const rows = parseInt(number_select.value);
    const cols = parseInt(number_select2.value);
    const split_array1 = [];
    for (let j = 0; j < rows; j++) {
        const row = values.slice(j * cols, (j + 1) * cols);
        split_array1.push(row);
    }
    document.getElementById('split_array1').textContent = JSON.stringify(split_array1);
}

function splitMatrix2() {
    const matrix2_inputs = document.getElementsByClassName('matrix-input2');
    const values = [];
    for (let i = 0; i < matrix2_inputs.length; i++) {
        values.push(parseInt(matrix2_inputs[i].value));
    }
    const rows = parseInt(number_select3.value);
    const cols = parseInt(number_select4.value);
    const split_array2 = [];
    for (let j = 0; j < rows; j++) {
        const row = values.slice(j * cols, (j + 1) * cols);
        split_array2.push(row);
    }
    document.getElementById('split_array2').textContent = JSON.stringify(split_array2);
}

function matrixProd() {
    const a = JSON.parse(document.getElementById('split_array1').textContent);
    const b = JSON.parse(document.getElementById('split_array2').textContent);
    if (a[0].length !== b.length) {
        document.getElementById('prod_result').textContent = "ERROR";
        togglePopup();
        return;
    }
    let ans = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
        for (let col = 0; col < b[0].length; col++) {
            for (let row = 0; row < b.length; row++) {
                ans[i][col] += a[i][row] * b[row][col];
            }
        }
    }
    document.getElementById('prod_result').textContent = JSON.stringify(ans);
}

function printProduct() {
    const x = JSON.parse(document.getElementById('prod_result').textContent);
    const resultCells = document.getElementsByClassName('matrix-cell');
    
    let index = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[0].length; j++) {
            resultCells[index].value = x[i][j];
            index++;
        }
    }
}

function matrixAdd() {
    const a = JSON.parse(document.getElementById('split_array1').textContent);
    const b = JSON.parse(document.getElementById('split_array2').textContent);
    if (a[0].length !== b[0].length || a.length !== b.length){
        document.getElementById('add_result').textContent = "ERROR";
        togglePopup();
        return;
    }
    let ans = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
        for (let col = 0; col < b[0].length; col++) {
            ans[i][col] = a[i][col] + b[i][col];
        }
    }
    document.getElementById('add_result').textContent = JSON.stringify(ans);
}

function printSum() {
    const x = JSON.parse(document.getElementById('add_result').textContent);
    const resultCells = document.getElementsByClassName('matrix-cell');
    
    let index = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[0].length; j++) {
            resultCells[index].value = x[i][j];
            index++;
        }
    }
}

function matrixSub() {
    const a = JSON.parse(document.getElementById('split_array1').textContent);
    const b = JSON.parse(document.getElementById('split_array2').textContent);
    if (a[0].length !== b[0].length || a.length !== b.length) {
        document.getElementById('sub_result').textContent = "ERROR";
        togglePopup();
        return;
    }
    let ans = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
        for (let col = 0; col < b[0].length; col++) {
            ans[i][col] = a[i][col] - b[i][col];
        }
    }
    document.getElementById('sub_result').textContent = JSON.stringify(ans);
}

function printDiff() {
    const x = JSON.parse(document.getElementById('sub_result').textContent);
    const resultCells = document.getElementsByClassName('matrix-cell');
    
    let index = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[0].length; j++) {
            resultCells[index].value = x[i][j];
            index++;
        }
    }
}