let selectedCategory = null;
let currentFlashcardData = {};
let currentIndex = 0;
let flashcardKeys = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeFlashcardSystem();
});

function initializeFlashcardSystem() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            
            selectedCategory = this.dataset.category;
            
            document.getElementById('startFlashcardsBtn').disabled = false;
        });
    });

    document.getElementById('startFlashcardsBtn').addEventListener('click', startSelectedFlashcards);
    
    document.getElementById('backToCategoriesBtn').addEventListener('click', backToCategories);
}

function startSelectedFlashcards() {
    if (!selectedCategory) return;
    
    document.getElementById('categorySelector').style.display = 'none';
    document.getElementById('flashcardBody').classList.add('active');
    
    document.getElementById('flashcardSubtitle').textContent = `Studying ${selectedCategory} Flashcards`;
    
    loadFlashcards(selectedCategory);
}

function backToCategories() {
    document.getElementById('categorySelector').style.display = 'block';
    document.getElementById('flashcardBody').classList.remove('active');
    
    document.getElementById('flashcardSubtitle').textContent = 'Choose a content area to begin studying';
    
    document.getElementById('flashcardProgressBar').style.width = '0%';
    
    selectedCategory = null;
    document.getElementById('startFlashcardsBtn').disabled = true;
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
    
    currentFlashcardData = {};
    flashcardKeys = [];
    currentIndex = 0;
    
    // Remove keyboard event listener when going back to categories
    document.removeEventListener('keydown', handleKeyboardNavigation);
}

function loadFlashcards(category) {
    const filePath = `../backend/flashcards/${category}_flashcards.txt`;
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            currentFlashcardData = parseAndFormatData(text);
            flashcardKeys = Object.keys(currentFlashcardData);
            currentIndex = 0;
            
            if (flashcardKeys.length > 0) {
                initializeFlashcardDisplay();
            } else {
                showNoCardsMessage();
            }
        })
        .catch(error => {
            console.error('Error loading flashcards:', error);
            showErrorMessage(category);
        });
}

function parseAndFormatData(text) {
    const flashcardData = {};
    const lines = text.trim().split('\n');
    const dataLines = lines.filter(line => !line.startsWith('#') && line.trim() !== '');
    
    dataLines.forEach((line, index) => {
        const parts = line.split(/\s*\t\s*/);
        if (parts.length >= 2) {
            const question = parts[0].trim();
            const answer = parts[1].trim();
            flashcardData[question] = answer;
        }
    });
    return flashcardData;
}

// Move updateCard function to global scope so it can be accessed by event listeners
function updateCard() {
    if (flashcardKeys.length === 0) return;
    
    const flashcard = document.getElementById('flashcard');
    const frontText = document.getElementById('front-text');
    const backText = document.getElementById('back-text');
    const cardCounter = document.getElementById('cardCounter');
    const progressBar = document.getElementById('flashcardProgressBar');
    
    const currentKey = flashcardKeys[currentIndex];
    frontText.textContent = currentKey;
    backText.textContent = currentFlashcardData[currentKey];
    flashcard.classList.remove('is-flipped');
    
    cardCounter.textContent = `Card ${currentIndex + 1} of ${flashcardKeys.length}`;
    
    const progress = ((currentIndex + 1) / flashcardKeys.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function initializeFlashcardDisplay() {
    // Remove any existing keyboard event listener before adding a new one
    document.removeEventListener('keydown', handleKeyboardNavigation);
    
    const flashcard = document.getElementById('flashcard');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Remove existing event listeners by cloning elements
    const newFlashcard = flashcard.cloneNode(true);
    flashcard.parentNode.replaceChild(newFlashcard, flashcard);
    
    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Get references to the new elements
    const updatedFlashcard = document.getElementById('flashcard');
    const updatedPrevBtn = document.getElementById('prevBtn');
    const updatedNextBtn = document.getElementById('nextBtn');

    // Add event listeners to new elements
    updatedFlashcard.addEventListener('click', () => {
        updatedFlashcard.classList.toggle('is-flipped');
    });

    updatedNextBtn.addEventListener('click', () => {
        if (flashcardKeys.length > 0) {
            currentIndex = (currentIndex + 1) % flashcardKeys.length;
            updateCard();
        }
    });

    updatedPrevBtn.addEventListener('click', () => {
        if (flashcardKeys.length > 0) {
            currentIndex = (currentIndex - 1 + flashcardKeys.length) % flashcardKeys.length;
            updateCard();
        }
    });
    
    // Initialize the first card
    updateCard();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(event) {
    if (!document.getElementById('flashcardBody').classList.contains('active')) {
        return;
    }
    
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            document.getElementById('prevBtn').click();
            break;
        case 'ArrowRight':
            event.preventDefault();
            document.getElementById('nextBtn').click();
            break;
        case ' ': 
            event.preventDefault();
            document.getElementById('flashcard').click();
            break;
        case 'Escape':
            event.preventDefault();
            backToCategories();
            break;
    }
}

function showNoCardsMessage() {
    document.getElementById('front-text').textContent = 'No flashcards available';
    document.getElementById('back-text').textContent = 'This content area has no flashcards yet';
    document.getElementById('cardCounter').textContent = 'No cards available';
    document.getElementById('flashcardProgressBar').style.width = '0%';
}

function showErrorMessage(category) {
    document.getElementById('front-text').textContent = `Not finished`;
    document.getElementById('back-text').textContent = 'This content area will be available soon';
    document.getElementById('cardCounter').textContent = 'File not available';
    document.getElementById('flashcardProgressBar').style.width = '0%';
}

window.addEventListener('beforeunload', function() {
    document.removeEventListener('keydown', handleKeyboardNavigation);
});