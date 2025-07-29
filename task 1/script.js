// Quiz Application JavaScript

class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.selectedAnswer = null;
        this.answered = false;
        
        this.initializeElements();
        this.loadQuestions();
        this.bindEvents();
    }

    initializeElements() {
        // Screen elements
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        
        // Welcome screen elements
        this.startBtn = document.getElementById('start-btn');
        
        // Quiz screen elements
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.currentScore = document.getElementById('current-score');
        this.questionNumber = document.getElementById('question-number');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.feedback = document.getElementById('feedback');
        this.feedbackIcon = document.getElementById('feedback-icon');
        this.feedbackText = document.getElementById('feedback-text');
        this.nextBtn = document.getElementById('next-btn');
        
        // Results screen elements
        this.finalScore = document.getElementById('final-score');
        this.correctAnswers = document.getElementById('correct-answers');
        this.incorrectAnswers = document.getElementById('incorrect-answers');
        this.accuracy = document.getElementById('accuracy');
        this.performanceTitle = document.getElementById('performance-title');
        this.performanceDescription = document.getElementById('performance-description');
        this.restartBtn = document.getElementById('restart-btn');
        this.homeBtn = document.getElementById('home-btn');
    }

    loadQuestions() {
        // Dynamic question bank with various topics
        this.questions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
                explanation: "Paris is the capital and largest city of France."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                explanation: "Mars is called the Red Planet due to its reddish appearance."
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correct: 3,
                explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2,
                explanation: "The Mona Lisa was painted by Leonardo da Vinci in the 16th century."
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Ag", "Au", "Fe", "Cu"],
                correct: 1,
                explanation: "Au comes from the Latin word 'aurum' meaning gold."
            },
            {
                question: "Which programming language is known as the 'language of the web'?",
                options: ["Python", "Java", "JavaScript", "C++"],
                correct: 2,
                explanation: "JavaScript is the primary language for web development."
            },
            {
                question: "What year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                correct: 2,
                explanation: "World War II ended in 1945 with the surrender of Germany and Japan."
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correct: 1,
                explanation: "The Blue Whale is the largest mammal, reaching up to 100 feet in length."
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Osmium", "Oxygen", "Oganesson", "Osmium"],
                correct: 1,
                explanation: "O is the chemical symbol for Oxygen, essential for life."
            },
            {
                question: "What is the square root of 144?",
                options: ["10", "11", "12", "13"],
                correct: 2,
                explanation: "12 × 12 = 144, so the square root of 144 is 12."
            }
        ];
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.homeBtn.addEventListener('click', () => this.showWelcomeScreen());
    }

    showScreen(screen) {
        // Hide all screens
        this.welcomeScreen.classList.remove('active');
        this.quizScreen.classList.remove('active');
        this.resultsScreen.classList.remove('active');
        
        // Show target screen
        screen.classList.add('active');
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.answered = false;
        
        this.showScreen(this.quizScreen);
        this.loadQuestion();
        this.updateProgress();
        this.updateScore();
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question display
        this.questionNumber.textContent = this.currentQuestionIndex + 1;
        this.questionText.textContent = question.question;
        
        // Clear previous options and feedback
        this.optionsContainer.innerHTML = '';
        this.hideFeedback();
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option';
            optionBtn.textContent = option;
            optionBtn.dataset.index = index;
            
            optionBtn.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(optionBtn);
        });
        
        // Reset state
        this.selectedAnswer = null;
        this.answered = false;
        this.nextBtn.disabled = true;
    }

    selectOption(optionIndex) {
        if (this.answered) return;
        
        this.selectedAnswer = optionIndex;
        this.answered = true;
        
        const options = this.optionsContainer.querySelectorAll('.option');
        const question = this.questions[this.currentQuestionIndex];
        
        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            option.style.pointerEvents = 'none';
        });
        
        // Mark selected option
        options[optionIndex].classList.add('selected');
        
        // Check if answer is correct
        if (optionIndex === question.correct) {
            options[optionIndex].classList.add('correct');
            this.score++;
            this.showFeedback(true, question.explanation);
        } else {
            options[optionIndex].classList.add('incorrect');
            // Highlight correct answer
            options[question.correct].classList.add('correct');
            this.showFeedback(false, question.explanation);
        }
        
        // Update score and enable next button
        this.updateScore();
        this.nextBtn.disabled = false;
        
        // Auto-advance after 3 seconds if it's the last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
            setTimeout(() => this.showResults(), 3000);
        }
    }

    showFeedback(isCorrect, explanation) {
        this.feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        this.feedbackIcon.className = `fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}`;
        this.feedbackText.textContent = explanation;
        this.feedback.classList.remove('hidden');
    }

    hideFeedback() {
        this.feedback.classList.add('hidden');
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.loadQuestion();
            this.updateProgress();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    }

    updateScore() {
        this.currentScore.textContent = this.score;
    }

    showResults() {
        const totalQuestions = this.questions.length;
        const correctCount = this.score;
        const incorrectCount = totalQuestions - correctCount;
        const accuracy = Math.round((correctCount / totalQuestions) * 100);
        
        // Update results display
        this.finalScore.textContent = correctCount;
        this.correctAnswers.textContent = correctCount;
        this.incorrectAnswers.textContent = incorrectCount;
        this.accuracy.textContent = `${accuracy}%`;
        
        // Set performance message
        this.setPerformanceMessage(accuracy);
        
        this.showScreen(this.resultsScreen);
    }

    setPerformanceMessage(accuracy) {
        if (accuracy >= 90) {
            this.performanceTitle.textContent = "Excellent!";
            this.performanceDescription.textContent = "Outstanding performance! You have excellent knowledge in this area.";
        } else if (accuracy >= 80) {
            this.performanceTitle.textContent = "Great Job!";
            this.performanceDescription.textContent = "Very good performance! You have solid knowledge in this area.";
        } else if (accuracy >= 70) {
            this.performanceTitle.textContent = "Good Work!";
            this.performanceDescription.textContent = "Good performance! Keep learning and improving.";
        } else if (accuracy >= 60) {
            this.performanceTitle.textContent = "Not Bad!";
            this.performanceDescription.textContent = "Decent performance. Review the topics and try again!";
        } else {
            this.performanceTitle.textContent = "Keep Learning!";
            this.performanceDescription.textContent = "Don't worry! Learning is a journey. Review the material and try again.";
        }
    }

    restartQuiz() {
        this.startQuiz();
    }

    showWelcomeScreen() {
        this.showScreen(this.welcomeScreen);
    }

    // Utility method to shuffle questions (optional)
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
}

// Additional Features
class QuizEnhancements {
    constructor(quizApp) {
        this.quizApp = quizApp;
        this.timer = null;
        this.timeLimit = 30; // seconds per question
        this.currentTime = this.timeLimit;
        
        this.initializeTimer();
        this.addKeyboardSupport();
        this.addConfettiEffect();
    }

    initializeTimer() {
        // Create timer element
        const timerContainer = document.createElement('div');
        timerContainer.className = 'timer-container';
        timerContainer.innerHTML = `
            <div class="timer">
                <i class="fas fa-clock"></i>
                <span id="timer-text">${this.timeLimit}s</span>
            </div>
        `;
        
        // Insert timer into quiz header
        const quizHeader = document.querySelector('.quiz-header');
        quizHeader.appendChild(timerContainer);
        
        this.timerElement = document.getElementById('timer-text');
    }

    startTimer() {
        this.currentTime = this.timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.currentTime--;
            this.updateTimerDisplay();
            
            if (this.currentTime <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        if (this.timerElement) {
            this.timerElement.textContent = `${this.currentTime}s`;
            
            // Change color when time is running low
            if (this.currentTime <= 10) {
                this.timerElement.style.color = '#dc3545';
            } else {
                this.timerElement.style.color = 'white';
            }
        }
    }

    handleTimeUp() {
        this.stopTimer();
        
        // Auto-select a random answer if none selected
        if (!this.quizApp.answered) {
            const options = this.quizApp.optionsContainer.querySelectorAll('.option');
            const randomIndex = Math.floor(Math.random() * options.length);
            this.quizApp.selectOption(randomIndex);
        }
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (this.quizApp.quizScreen.classList.contains('active') && !this.quizApp.answered) {
                const key = e.key;
                if (key >= '1' && key <= '4') {
                    const optionIndex = parseInt(key) - 1;
                    const options = this.quizApp.optionsContainer.querySelectorAll('.option');
                    if (optionIndex < options.length) {
                        this.quizApp.selectOption(optionIndex);
                    }
                } else if (key === 'Enter' && !this.quizApp.nextBtn.disabled) {
                    this.quizApp.nextQuestion();
                }
            }
        });
    }

    addConfettiEffect() {
        // Simple confetti effect for perfect scores
        this.quizApp.showResults = function() {
            const totalQuestions = this.questions.length;
            const correctCount = this.score;
            const incorrectCount = totalQuestions - correctCount;
            const accuracy = Math.round((correctCount / totalQuestions) * 100);
            
            // Update results display
            this.finalScore.textContent = correctCount;
            this.correctAnswers.textContent = correctCount;
            this.incorrectAnswers.textContent = incorrectCount;
            this.accuracy.textContent = `${accuracy}%`;
            
            // Set performance message
            this.setPerformanceMessage(accuracy);
            
            // Add confetti for perfect scores
            if (accuracy === 100) {
                this.createConfetti();
            }
            
            this.showScreen(this.resultsScreen);
        };
    }

    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#28a745', '#ffc107', '#dc3545'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 5000);
        }
    }
}

// Add CSS for timer and confetti
const additionalStyles = `
    .timer-container {
        display: flex;
        align-items: center;
    }
    
    .timer {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const quizApp = new QuizApp();
    const enhancements = new QuizEnhancements(quizApp);
    
    // Override loadQuestion to include timer
    const originalLoadQuestion = quizApp.loadQuestion.bind(quizApp);
    quizApp.loadQuestion = function() {
        originalLoadQuestion();
        enhancements.stopTimer();
        if (this.quizScreen.classList.contains('active')) {
            enhancements.startTimer();
        }
    };
    
    // Override selectOption to stop timer
    const originalSelectOption = quizApp.selectOption.bind(quizApp);
    quizApp.selectOption = function(optionIndex) {
        originalSelectOption(optionIndex);
        enhancements.stopTimer();
    };
}); 