    const questions = [
      { question: "2 + 2 = ?", answers: [ { text: "3", correct: false }, { text: "4", correct: true }, { text: "5", correct: false }, { text: "22", correct: false } ] },
      { question: "What color is the sky on a clear day?", answers: [ { text: "Blue", correct: true }, { text: "Green", correct: false }, { text: "Red", correct: false }, { text: "Yellow", correct: false } ] },
      { question: "Which animal barks?", answers: [ { text: "Dog", correct: true }, { text: "Cat", correct: false }, { text: "Cow", correct: false }, { text: "Horse", correct: false } ] },
      { question: "Which number is a prime?", answers: [ { text: "7", correct: true }, { text: "4", correct: false }, { text: "9", correct: false }, { text: "6", correct: false } ] },
      { question: "What is H2O commonly known as?", answers: [ { text: "Water", correct: true }, { text: "Oxygen", correct: false }, { text: "Hydrogen", correct: false }, { text: "Salt", correct: false } ] },
      { question: "Which planet is closest to the sun?", answers: [ { text: "Mercury", correct: true }, { text: "Earth", correct: false }, { text: "Venus", correct: false }, { text: "Mars", correct: false } ] },
      { question: "How many continents are there?", answers: [ { text: "7", correct: true }, { text: "5", correct: false }, { text: "6", correct: false }, { text: "8", correct: false } ] },
      { question: "What gas do plants absorb?", answers: [ { text: "Carbon dioxide", correct: true }, { text: "Oxygen", correct: false }, { text: "Nitrogen", correct: false }, { text: "Hydrogen", correct: false } ] },
      { question: "Which is a mammal?", answers: [ { text: "Whale", correct: true }, { text: "Shark", correct: false }, { text: "Octopus", correct: false }, { text: "Seahorse", correct: false } ] },
      { question: "What do bees produce?", answers: [ { text: "Honey", correct: true }, { text: "Milk", correct: false }, { text: "Wax", correct: false }, { text: "Pollen", correct: false } ] },
      { question: "Which country is famous for sushi?", answers: [ { text: "Japan", correct: true }, { text: "China", correct: false }, { text: "Thailand", correct: false }, { text: "Vietnam", correct: false } ] },
      { question: "Which shape has 4 equal sides?", answers: [ { text: "Square", correct: true }, { text: "Rectangle", correct: false }, { text: "Triangle", correct: false }, { text: "Circle", correct: false } ] },
      { question: "What is the freezing point of water?", answers: [ { text: "0°C", correct: true }, { text: "32°C", correct: false }, { text: "100°C", correct: false }, { text: "-10°C", correct: false } ] },
      { question: "How many legs does a spider have?", answers: [ { text: "8", correct: true }, { text: "6", correct: false }, { text: "10", correct: false }, { text: "4", correct: false } ] },
      { question: "Which is the largest ocean?", answers: [ { text: "Pacific", correct: true }, { text: "Atlantic", correct: false }, { text: "Indian", correct: false }, { text: "Arctic", correct: false } ] },
      { question: "What is the main ingredient in bread?", answers: [ { text: "Flour", correct: true }, { text: "Rice", correct: false }, { text: "Corn", correct: false }, { text: "Oats", correct: false } ] },
      { question: "How many hours in a day?", answers: [ { text: "24", correct: true }, { text: "12", correct: false }, { text: "48", correct: false }, { text: "36", correct: false } ] },
      { question: "What do you call a baby cat?", answers: [ { text: "Kitten", correct: true }, { text: "Puppy", correct: false }, { text: "Cub", correct: false }, { text: "Calf", correct: false } ] },
      { question: "What do humans breathe in?", answers: [ { text: "Oxygen", correct: true }, { text: "Carbon dioxide", correct: false }, { text: "Hydrogen", correct: false }, { text: "Nitrogen", correct: false } ] }
    ];

    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');

    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    let currentQuestionIndex = 0;

    function startQuiz() {
      currentQuestionIndex = 0;
      nextButton.innerText = "Next";
      showQuestion();
    }

    function showQuestion() {
      resetState();
      const question = questions[currentQuestionIndex];
      questionElement.innerText = question.question;

      question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
      });
    }

    function resetState() {
      nextButton.style.display = 'none';
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }

    function selectAnswer(e) {
      const selectedBtn = e.target;
      const correct = selectedBtn.dataset.correct === "true";

      Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
      });

      if (correct) {
        correctSound.play();
      } else {
        wrongSound.play();
      }

      nextButton.style.display = "inline-block";
    }

    function setStatusClass(element, correct) {
      clearStatusClass(element);
      if (correct) {
        element.classList.add("correct");
      } else {
        element.classList.add("wrong");
      }
    }

    function clearStatusClass(element) {
      element.classList.remove("correct");
      element.classList.remove("wrong");
    }

    nextButton.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        alert("Quiz finished!");
        startQuiz();
      }
    });

    startQuiz();