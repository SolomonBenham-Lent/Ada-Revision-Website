document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }
});

const quizCategories = {
    CA1: {
        title: "Content Area - 1",
        description: "Problem Solving",
        questions: [
            {
                question: "What is the top-down approach?",
                answers: [
                    "This method involves solving a problem by ignoring its sub-components.",
                    "This method is where you start with small details and combine them into a larger solution.",
                    "This method is where you have a problem and you keep breaking it down into sub-problems until it is easily solvable.",
                    "This method involves solving a problem by focusing only on the main components."
                ],
                correct: 2,
                explanation: "This is the correct answer! Congratulations"
            },
            {
                question: "What is the bottom up approach?",
                answers: [
                    "solving problems by ignoring smaller details.",
                    "solving smaller problems and integrating them in bigger solutions.",
                    "breaking down problems into sub-components for individual solutions.",
                    "integrating bigger solutions into smaller problems."
                ],
                correct: 1,
                explanation: "This is the correct answer! Congratulations"
            },
            {
                question: "What is modularisation?",
                answers: [
                    "combining functional parts of a program into a single unit.",
                    "separating the functional parts of a problem or program into independent modules that can be recombined to create a solution.",
                    "integrating all parts of a program into a unified module.",
                    "separating data structures into isolated components."
                ],
                correct: 1,
                explanation: "This is the correct answer! Congratulations"
            }
        ]
    },
    
    CA2: {
        title: "Content Area - 2",
        description: "Introduction to programming",
        questions: [
            {
                question: "What is a variable in programming?",
                answers: [
                    "A fixed value that cannot be changed",
                    "A storage location with an associated name that contains data",
                    "A type of loop structure",
                    "A programming language"
                ],
                correct: 1,
                explanation: "A variable is a storage location with an associated name that can hold data which may change during program execution."
            },
            {
                question: "What is an algorithm?",
                answers: [
                    "A programming language",
                    "A step-by-step procedure for solving a problem",
                    "A type of computer hardware",
                    "A software application"
                ],
                correct: 1,
                explanation: "An algorithm is a step-by-step procedure or formula for solving a problem or completing a task."
            }
        ]
    },
    
    CA3: {
        title: "Content Area - 3",
        description: "Emerging issues and impact of digital",
        questions: [
            {
                question: "What is digital divide?",
                answers: [
                    "The gap between those who have access to digital technology and those who don't",
                    "A method of dividing digital files",
                    "A mathematical operation in programming",
                    "A type of digital security measure"
                ],
                correct: 0,
                explanation: "Digital divide refers to the gap between demographics and regions that have access to modern information and communications technology and those that don't."
            },
            {
                question: "What is artificial intelligence (AI)?",
                answers: [
                    "A type of computer hardware",
                    "Software that can perform tasks that typically require human intelligence",
                    "A programming language",
                    "A type of internet connection"
                ],
                correct: 1,
                explanation: "AI refers to computer systems that can perform tasks that typically require human intelligence, such as learning, reasoning, and perception."
            }
        ]
    },
    
    CA4: {
        title: "Content Area - 4",
        description: "Legislation and regulatory requirement",
        questions: [
            {
                question: "What is GDPR?",
                answers: [
                    "General Data Protection Regulation",
                    "Global Digital Privacy Rights",
                    "Government Data Processing Rules",
                    "General Digital Platform Regulation"
                ],
                correct: 0,
                explanation: "GDPR stands for General Data Protection Regulation, a comprehensive data protection law in the European Union."
            },
            {
                question: "What is copyright?",
                answers: [
                    "The right to copy any digital content",
                    "Legal protection for original creative works",
                    "A type of software license",
                    "A method of data encryption"
                ],
                correct: 1,
                explanation: "Copyright is a legal right that grants the creator of original creative works exclusive rights to determine whether and how their work may be used by others."
            }
        ]
    },
    
    CA5: {
        title: "Content Area - 5",
        description: "Business Context",
        questions: [
            {
                question: "What is e-commerce?",
                answers: [
                    "Electronic communication",
                    "Buying and selling goods or services over the internet",
                    "A type of computer software",
                    "Electronic mail system"
                ],
                correct: 1,
                explanation: "E-commerce refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions."
            },
            {
                question: "What is digital transformation?",
                answers: [
                    "Converting analog signals to digital",
                    "The integration of digital technology into business operations",
                    "A type of data compression",
                    "The process of digitizing documents"
                ],
                correct: 1,
                explanation: "Digital transformation is the integration of digital technology into all areas of business, fundamentally changing how organizations operate and deliver value."
            }
        ]
    },
    
    CA6: {
        title: "Content Area - 6",
        description: "Data",
        questions: [
            {
                question: "What is big data?",
                answers: [
                    "Large files stored on computers",
                    "Extremely large datasets that require special tools to process",
                    "Data stored in big computers",
                    "Important business information"
                ],
                correct: 1,
                explanation: "Big data refers to extremely large datasets that are too complex to be processed by traditional data processing applications."
            },
            {
                question: "What is a database?",
                answers: [
                    "A collection of related data organized for easy access and management",
                    "A type of computer hardware",
                    "A programming language",
                    "A type of internet connection"
                ],
                correct: 0,
                explanation: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system."
            }
        ]
    },
    
    CA7: {
        title: "Content Area - 7",
        description: "Digital environments",
        questions: [
            {
                question: "What is cloud computing?",
                answers: [
                    "Computing done in the sky",
                    "Delivery of computing services over the internet",
                    "A type of weather prediction software",
                    "Computing with cloud-shaped computers"
                ],
                correct: 1,
                explanation: "Cloud computing is the delivery of computing services including servers, storage, databases, networking, software, analytics, and intelligence over the internet."
            },
            {
                question: "What is virtualization?",
                answers: [
                    "Creating virtual reality environments",
                    "Making something exist in effect but not in physical form",
                    "A type of video game technology",
                    "Converting analog to digital"
                ],
                correct: 1,
                explanation: "Virtualization is the creation of virtual versions of computing resources, such as servers, storage devices, or network resources."
            }
        ]
    },
    
    CA8: {
        title: "Content Area - 8",
        description: "Security",
        questions: [
            {
                question: "What is cybersecurity?",
                answers: [
                    "Security for cyber cafes",
                    "Protection of computer systems and networks from digital attacks",
                    "A type of antivirus software",
                    "Security cameras for computers"
                ],
                correct: 1,
                explanation: "Cybersecurity is the practice of protecting computer systems, networks, and data from digital attacks, damage, or unauthorized access."
            },
            {
                question: "What is encryption?",
                answers: [
                    "A method of hiding files on a computer",
                    "Converting information into a secret code to prevent unauthorized access",
                    "A type of computer virus",
                    "Compressing files to save space"
                ],
                correct: 1,
                explanation: "Encryption is the process of converting information or data into a code to prevent unauthorized access, ensuring data confidentiality."
            }
        ]
    }
};

let currentCategory = null;
let currentQuestion = 0;
let userAnswers = [];
let score = 0;

function initializeApp() {
    createCategorySelector();
}

function createCategorySelector() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';

    Object.keys(quizCategories).forEach(categoryKey => {
        const category = quizCategories[categoryKey];
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-card';
        categoryDiv.onclick = () => selectCategory(categoryKey);

        categoryDiv.innerHTML = `
            <div class="category-title">${category.title}</div>
            <div class="category-description">${category.description}</div>
        `;

        container.appendChild(categoryDiv);
    });
}

function selectCategory(categoryKey) {
    // Remove previous selection
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Select new category
    event.target.closest('.category-card').classList.add('selected');
    currentCategory = categoryKey;
    
    // Enable start button
    document.getElementById('startQuizBtn').disabled = false;
}

function startSelectedQuiz() {
    if (!currentCategory) return;

    // Hide category selector, show quiz
    document.getElementById('categorySelector').style.display = 'none';
    document.getElementById('quizBody').classList.add('active');

    // Update header
    document.getElementById('quizSubtitle').textContent = quizCategories[currentCategory].title;

    // Initialize quiz
    currentQuestion = 0;
    userAnswers = [];
    score = 0;
    
    createQuestions();
    showQuestion(0);
    updateProgressBar();
    updateQuestionCounter();
}

function createQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    const questions = quizCategories[currentCategory].questions;

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.id = `question${index}`;
        if (index === 0) questionDiv.classList.add('active');

        let gridClass = '';
        if (q.answers.length === 4 || q.answers.length === 6) {
            gridClass = 'two-columns';
        } else if (q.answers.length === 9) {
            gridClass = 'three-columns';
        }

        questionDiv.innerHTML = `
            <div class="question">${q.question}</div>
            <div class="answers ${gridClass}" id="answers${index}">
                ${q.answers.map((answer, i) => `
                    <div class="answer" onclick="selectAnswer(${index}, ${i})">
                        ${answer}
                    </div>
                `).join('')}
            </div>
            <div class="feedback" id="feedback${index}"></div>
        `;

        container.appendChild(questionDiv);
    });
}

function selectAnswer(questionIndex, answerIndex) {
    if (userAnswers[questionIndex] !== undefined) return;

    const questions = quizCategories[currentCategory].questions;
    const answersContainer = document.getElementById(`answers${questionIndex}`);
    const answers = answersContainer.children;
    const feedback = document.getElementById(`feedback${questionIndex}`);
    const correctIndex = questions[questionIndex].correct;

    Array.from(answers).forEach(answer => {
        answer.classList.add('disabled');
    });

    answers[answerIndex].classList.add('selected');

    if (answerIndex === correctIndex) {
        answers[answerIndex].classList.add('correct');
        feedback.textContent = `Correct! ${questions[questionIndex].explanation}`;
        feedback.className = 'feedback correct';
        score++;
    } else {
        answers[answerIndex].classList.add('incorrect');
        answers[correctIndex].classList.add('correct');
        feedback.textContent = `Incorrect. ${questions[questionIndex].explanation}`;
        feedback.className = 'feedback incorrect';
    }

    feedback.style.display = 'block';
    userAnswers[questionIndex] = answerIndex;
    document.getElementById('nextBtn').disabled = false;
}

function showQuestion(index) {
    document.querySelectorAll('.question-container').forEach(q => {
        q.classList.remove('active');
    });
    document.getElementById(`question${index}`).classList.add('active');
    
    currentQuestion = index;
    updateQuestionCounter();
    updateProgressBar();
    updateNavigationButtons();
}

function nextQuestion() {
    const totalQuestions = quizCategories[currentCategory].questions.length;
    if (currentQuestion < totalQuestions - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalQuestions = quizCategories[currentCategory].questions.length;

    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = userAnswers[currentQuestion] !== undefined ? 'Show Results' : 'Next';
        nextBtn.disabled = userAnswers[currentQuestion] === undefined;
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.disabled = userAnswers[currentQuestion] === undefined;
    }
}

function updateProgressBar() {
    const totalQuestions = quizCategories[currentCategory].questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function updateQuestionCounter() {
    const totalQuestions = quizCategories[currentCategory].questions.length;
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestion + 1} of ${totalQuestions}`;
}

function showResults() {
    document.getElementById('questionsContainer').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    const totalQuestions = quizCategories[currentCategory].questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const scoreElement = document.getElementById('finalScore');
    const messageElement = document.getElementById('resultsMessage');

    scoreElement.textContent = `${score}/${totalQuestions} (${percentage}%)`;

    if (percentage >= 80) {
        scoreElement.className = 'score good';
        messageElement.textContent = 'Excellent work! You really know your stuff!';
    } else if (percentage >= 60) {
        scoreElement.className = 'score average';
        messageElement.textContent = 'Good job! You got most of them right.';
    } else {
        scoreElement.className = 'score poor';
        messageElement.textContent = 'Keep studying! Practice makes perfect.';
    }
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    score = 0;

    document.getElementById('questionsContainer').style.display = 'block';
    document.querySelector('.quiz-controls').style.display = 'flex';
    document.getElementById('results').style.display = 'none';

    document.querySelectorAll('.answer').forEach(answer => {
        answer.className = 'answer';
    });

    document.querySelectorAll('.feedback').forEach(feedback => {
        feedback.style.display = 'none';
    });

    showQuestion(0);
    document.getElementById('nextBtn').disabled = true;
}

function changeCategory() {
    // Reset everything and go back to category selection
    document.getElementById('categorySelector').style.display = 'block';
    document.getElementById('quizBody').classList.remove('active');
    document.getElementById('quizSubtitle').textContent = 'Choose a category to begin';
    
    // Reset selections
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('startQuizBtn').disabled = true;
    currentCategory = null;
}

// Initialize the app when the page loads
window.onload = initializeApp;