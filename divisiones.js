let num1, num2, correctAnswer;
let score = 0;
let timeRemaining = 60;
let timer;
let selectedTable;
let correctAnswers = 0;
let incorrectAnswers = 0;
let incorrectDivisions = []; // Lista para almacenar divisiones incorrectas

function startGame(table) {
    selectedTable = table;
    score = 0;
    timeRemaining = 60;
    correctAnswers = 0;
    incorrectAnswers = 0;
    incorrectDivisions = []; // Reinicia la lista de incorrectas
    document.getElementById('selectionScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('score').textContent = `Puntaje: ${score}`;
    document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    num2 = selectedTable === 'mixed' ? Math.floor(Math.random() * 9) + 1 : selectedTable;
    const quotient = Math.floor(Math.random() * 10) + 1;
    num1 = num2 * quotient;
    correctAnswer = quotient;

    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        const option = Math.floor(Math.random() * 10) + 1;
        options.add(option);
    }

    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    document.getElementById('target1').textContent = optionsArray[0];
    document.getElementById('target2').textContent = optionsArray[1];
    document.getElementById('target3').textContent = optionsArray[2];
    document.getElementById('target4').textContent = optionsArray[3];
}

function checkAnswer(target) {
    const userAnswer = parseInt(target.textContent);
    const feedback = document.getElementById('feedback');

    if (userAnswer === correctAnswer) {
        feedback.textContent = "¡Correcto!";
        feedback.style.color = "green";
        score++;
        correctAnswers++;
    } else {
        feedback.textContent = "Incorrecto.";
        feedback.style.color = "red";
        incorrectAnswers++;
        // Almacena la división incorrecta
        incorrectDivisions.push(`${num1} ÷ ${num2} = ${correctAnswer} (Tu respuesta: ${userAnswer})`);
    }

    document.getElementById('score').textContent = `Puntaje: ${score}`;
    generateQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = `Tiempo: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('gameScreen').style.display = 'none';

    const totalAnswers = correctAnswers + incorrectAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('accuracy').textContent = accuracy;

    // Muestra divisiones incorrectas
    const incorrectList = document.getElementById('incorrectList');
    incorrectList.innerHTML = ""; // Limpia la lista
    if (incorrectDivisions.length > 0) {
        incorrectDivisions.forEach(division => {
            const listItem = document.createElement('li');
            listItem.textContent = division;
            incorrectList.appendChild(listItem);
        });
    } else {
        incorrectList.innerHTML = "<li>No hubo respuestas incorrectas</li>";
    }

    document.getElementById('resultScreen').style.display = 'flex';
}

function returnToMenu() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('selectionScreen').style.display = 'flex';
}