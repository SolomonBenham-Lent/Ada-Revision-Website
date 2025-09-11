function parseAndFormatData(text) {
    const flashcardData = {};
    const lines = text.trim().split('\n');
    const dataLines = lines.filter(line => !line.startsWith('#') && line.trim() !== '');
    
    // Process each line to create the flashcard data object
    dataLines.forEach((line, index) => {
        const parts = line.split(/\s*\t\s*/);
        if (parts.length >= 2) {
            const question = parts[0].trim();
            const answer = parts[1].trim();
            // Use the question as the key, as it's more descriptive.
            // Or if you prefer Q1, Q2 etc, use `const key = \`Q${index + 1}\`;`
            flashcardData[question] = answer;
        }
    });
    return flashcardData;
}

// Fetch the file and pass the parsed data to the main application.
const filePath = '/Ada-Revision-Website/backend/CA1_flashcards.txt'; 

fetch(filePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        const flashcardData = parseAndFormatData(text);
        
        // Check if the initialization function exists and then call it with the data.
        if (typeof initializeFlashcards === 'function') {
            initializeFlashcards(flashcardData);
        } else {
            console.error('Error: initializeFlashcards function not found. Did you define it in your HTML script?');
        }
    })
    .catch(error => {
        console.error('Error fetching the file:', error);

    }); 