let canvas = document.getElementById('canvas');
let eraser = document.getElementById('eraser');
let pencil = document.getElementById('pencil');
let checkTrackerCreated = document.getElementsByClassName('eraseTracker');


let activateEraser = false;

//canvas by default has small size around 132px, so make it use the width and height of full screen
canvas.width = 0.98 * window.innerWidth; //98%
canvas.height = window.innerHeight;

var io = io.connect('http://localhost:8000/')
// var io = io.connect('/')

let ctx = canvas.getContext("2d");
let x, y;
let mouseDown = false;

window.onmousedown = (e) => {
    e.preventDefault()
    ctx.moveTo(x, y);
    io.emit('down', { x, y });
    mouseDown = true;
}
window.onmouseup = (e) => {
    mouseDown = false;
}

io.on('ondraw', ({ x, y }) => {
    ctx.lineTo(x, y);
    ctx.stroke();
})

io.on('ondown', ({ x, y }) => {
    ctx.moveTo(x, y);
})

io.on('onClear', ({ x, y }) => {
    const clearSize = 50; // Adjust this value based on your requirements
    const clearWidth = clearSize;
    const clearHeight = clearSize;
    const clearX = x - clearSize / 2;
    const clearY = y - clearSize / 2;
    ctx.clearRect(clearX, clearY, clearWidth, clearHeight);
})

//function startDraw() {
//     window.onmousemove = (e) => {
//         x = e.clientX;
//         y = e.clientY;
//         if (mouseDown) {
//             if (activateEraser) {
//                 moveCursor(e, activateEraser);
//                 io.emit('clearForOthers', { x, y });
//                 const clearSize = 50; // Adjust this value based on your requirements
//                 const clearWidth = clearSize;
//                 const clearHeight = clearSize;
//                 const clearX = x - clearSize / 2;
//                 const clearY = y - clearSize / 2;
//                 ctx.clearRect(clearX, clearY, clearWidth, clearHeight);
//             } else {
//                 io.emit('draw', { x, y });
//                 ctx.lineTo(x, y);
//                 ctx.stroke();
//             }
//         }
//     }
// }
// startDraw();


// pencil.addEventListener('click', () => {
//     activateEraser = false;
//     checkTrackerCreated[0].style.display = 'none';
//     startDraw();
// })


// eraser.addEventListener('click', () => {
//     activateEraser = true;
//     // if (activateEraser) {
//     //     window.onmousemove = (e) => {
//     //         moveCursor(e, activateEraser);
//     //         x = e.clientX;
//     //         y = e.clientY;
//     //         if (mouseDown) {
//     //             io.emit('clearForOthers', { x, y });
//     //             const clearSize = 50; // Adjust this value based on your requirements
//     //             const clearWidth = clearSize;
//     //             const clearHeight = clearSize;
//     //             const clearX = x - clearSize / 2;
//     //             const clearY = y - clearSize / 2;
//     //             ctx.clearRect(clearX, clearY, clearWidth, clearHeight);
//     //         }
//     //     }
//     // }
//     // else {
//     //     let checkTrackerCreated = document.getElementsByClassName('eraseTracker')
//     //     if (checkTrackerCreated.length > 0) checkTrackerCreated[0].style.display = 'none';
//     //     startDraw();
//     // }
// })


let eraseTracker;


function initializeEraserTracker() {
    eraseTracker = document.createElement('div');
    eraseTracker.classList.add('eraseTracker');
    document.body.insertBefore(eraseTracker, canvas);

    canvas.addEventListener('mousemove', (e) => {
        eraseTracker.style.left = e.pageX - eraseTracker.clientWidth / 2 + 'px';
        eraseTracker.style.top = e.pageY - eraseTracker.clientHeight / 2 + 'px';
    });
}



function activateDrawingMode() {
    window.onmousemove = (e) => {
        x = e.clientX;
        y = e.clientY;
        if (mouseDown) {
            io.emit('draw', { x, y });
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function activateEraserMode() {
    window.onmousemove = (e) => {
        x = e.clientX;
        y = e.clientY;
        if (mouseDown) {
            io.emit('clearForOthers', { x, y });
            ctx.clearRect(x - 50, y - 50, 50, 50); // Adjust the eraser size as needed
        }
    }
}

function switchToDrawingMode() {
    activateEraser = false;
    eraseTracker.style.display = 'none';
    activateDrawingMode();
}

function switchToEraserMode() {
    activateEraser = true;
    eraseTracker.style.display = 'initial';
    activateEraserMode();
}

pencil.addEventListener('click', switchToDrawingMode);

eraser.addEventListener('click', () => {
    // activateEraser = !activateEraser;
    //activateEraser = true;
    switchToEraserMode();
    // if (activateEraser) {
    //     switchToEraserMode();
    // } else {
    //     switchToDrawingMode();
    // }
});

initializeEraserTracker();
switchToDrawingMode();



















// const moveCursor = (e, activateEraser) => {
//     const mouseY = e.clientY;
//     const mouseX = e.clientX;
//     //let checkTrackerCreated = document.getElementsByClassName('eraseTracker');
//     if (checkTrackerCreated.length == 0 && activateEraser == true) {
//         var elemDiv = document.createElement('div');
//         elemDiv.classList.add('eraseTracker');

//         document.body.insertBefore(elemDiv, canvas);
//         canvas.addEventListener('mousemove', (e) => {
//             elemDiv.style.left = (e.pageX - elemDiv.clientWidth / 2) + 'px';
//             elemDiv.style.top = (e.pageY - elemDiv.clientHeight / 2) + 'px';
//         })
//     }
//     // else if (checkTrackerCreated.length != 0 && activateEraser == false) {
//     //     checkTrackerCreated[0].style.display = 'none'
//     // } 
//     else if (checkTrackerCreated.length != 0 && activateEraser == true) {
//         checkTrackerCreated[0].style.display = 'initial'
//     }
// }

// // canvas.addEventListener('mouseenter', moveCursor);

