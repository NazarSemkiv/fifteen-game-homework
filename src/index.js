import './index.css';

//get 'x' and 'y' with current position of an empty cell
const getXY = (source) => {
    const y = source.findIndex(arr => arr.includes(null));
    const x = source[y].findIndex(x => x === null);
    return { y, x };
};
//shuffles the array
const shuffleState = (state) => {
    const shuffleArr = (inputArr) => {
        const arr = [...inputArr];
        for (let j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x){}
        return arr;
    };
    const flattenArr = state.reduce((acc, val) => {
        return [...acc, ...val]
    }, []);
    const shuffledArr = shuffleArr(flattenArr);
    return [
        shuffledArr.slice(0,4),
        shuffledArr.slice(4,8),
        shuffledArr.slice(8,12),
        shuffledArr.slice(12,16),
    ]
};
//render user interface
const renderRow = (arr) =>
    `<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`;

const renderRows = (arr) => {
    return arr.reduce((acc, current) => {
        return acc + renderRow(current);
    }, '');
};
//renders into the dom UI for the game
const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
    const rows = renderRows(shuffledArray).replace(
        '<div class=\'square\'></div>',
        '<div class=\'square empty\'></div>'
    );
    domNode.innerHTML = rows;
};
//the array of arrays
const fifteen = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, null, 15]
];

// var state = shuffleState(fifteen); //the array is shuffled from the start of the game
let state = fifteen; //press 'left-arrow' to win (win test)
renderGame(state);

//event for 'keydown'
document.addEventListener('keydown', e => {
    const xyOfEmptyCell = getXY(state);
    // up arrow
    if (e.keyCode === 38) {
        if (xyOfEmptyCell.y === 3) return;
        const nextY = xyOfEmptyCell.y + 1;
        const nextX = xyOfEmptyCell.x;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
        checkUserWin(state);
    }
    // down arrow
    if (e.keyCode === 40) {
        if (xyOfEmptyCell.y === 0) return;
        const nextY = xyOfEmptyCell.y - 1;
        const nextX = xyOfEmptyCell.x;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
        checkUserWin(state);
    }
    // left arrow
    if (e.keyCode === 37) {
        if (xyOfEmptyCell.x === 3) return;
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x + 1;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
        checkUserWin(state);
    }
    // left arrow
    if (e.keyCode === 39) {
        if (xyOfEmptyCell.x === 0) return;
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x - 1;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
        checkUserWin(state);
    }
});

//check user win
const checkUserWin = (arr) => {
    let count = 1;
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){

            if(arr[i][j] === count){
                count++;
            }
            else if((arr[i][j] === null) && (count === 16)){
                count = 1;
                alert("Congratulations! You win ;)");
                state = shuffleState(fifteen);
                renderGame(state);
            }
            else{
                count = 1;
            }
        }
    }
};