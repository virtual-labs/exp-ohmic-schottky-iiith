//Your JavaScript goes in here

let canvas = document.getElementById('drawCanvas');
let ctx = canvas.getContext('2d');
let selectedQuestion = null;
let connections = [];
let correctAnswers = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', function() {
        if (selectedQuestion) {
            selectedQuestion.classList.remove('selected');
        }
        this.classList.add('selected');
        selectedQuestion = this;
    });
});

document.querySelectorAll('.answer').forEach(answer => {
    answer.addEventListener('click', function() {
        if (selectedQuestion) {
            // Remove correct/incorrect classes from all answers
            document.querySelectorAll('.answer').forEach(ans => {
                ans.classList.remove('correct', 'incorrect');
            });

            // Add correct/incorrect class based on the answer
            if (correctAnswers[selectedQuestion.dataset.id] === this.dataset.id) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
            }

            selectedQuestion.classList.remove('selected');
            selectedQuestion = null;
        }
    });
});

document.getElementById('checkBtn').addEventListener('click', function() {
    let score = 0;
    connections.forEach(conn => {
        if (correctAnswers[conn.questionId] === conn.answerId) {
            conn.questionEl.classList.add('correct');
            conn.answerEl.classList.add('correct');
            score++;
        } else {
            conn.questionEl.classList.add('incorrect');
            conn.answerEl.classList.add('incorrect');
        }
    });
    document.getElementById('score').textContent = 
        `Score: ${score} out of ${Object.keys(correctAnswers).length} correct`;
});

document.getElementById('resetBtn').addEventListener('click', function() {
    connections = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (selectedQuestion) {
        selectedQuestion.classList.remove('selected');
        selectedQuestion = null;
    }
    document.querySelectorAll('.question, .answer').forEach(el => {
        el.classList.remove('correct', 'incorrect', 'selected');
    });
    document.getElementById('score').textContent = '';
});

window.addEventListener('scroll', function() {
    // No need to draw connections anymore
});








