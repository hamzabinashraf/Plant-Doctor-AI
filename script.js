document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-input');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsSection = document.getElementById('results-section');
    const resultImage = document.getElementById('result-image');
    
    // Elements for results
    const cropNameEl = document.getElementById('crop-name');
    const diseaseNameEl = document.getElementById('disease-name');
    const confidenceScoreEl = document.getElementById('confidence-score');
    const cureRecommendationEl = document.getElementById('cure-recommendation');
    
    // Elements for button loading state
    const spinner = document.getElementById('spinner');
    const analyzeBtnText = document.getElementById('analyze-btn-text');

    // Handle file selection
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
                analyzeBtn.style.display = 'inline-block';
                resultsSection.style.display = 'none'; // Hide previous results
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle analyze button click
    analyzeBtn.addEventListener('click', function () {
        // --- THIS IS WHERE YOU WOULD CALL YOUR AI BACKEND API ---
        
        // For demonstration, we will simulate an API call with a timeout
        showLoadingState(true);
        
        setTimeout(() => {
            // Simulate receiving data from a backend
            const dummyData = {
                crop_name: "Tomato",
                disease_name: "Late Blight",
                confidence: "95.8%",
                cure: [
                    "Remove and destroy infected plants immediately to prevent spread.",
                    "Apply a fungicide containing chlorothalonil or copper, following label instructions.",
                    "Ensure proper spacing between plants for good air circulation.",
                    "Water at the base of the plant to keep foliage dry."
                ]
            };

            // Populate the results
            populateResults(dummyData);

            // Hide loading state and show results
            showLoadingState(false);
            resultsSection.style.display = 'block';
            resultImage.src = imagePreview.src;

            // Smoothly scroll to the results section
            resultsSection.scrollIntoView({ behavior: 'smooth' });

        }, 3000); // Simulate a 3-second analysis
    });

    function showLoadingState(isLoading) {
        if (isLoading) {
            analyzeBtnText.textContent = 'Analyzing...';
            spinner.style.display = 'inline-block';
            analyzeBtn.disabled = true;
        } else {
            analyzeBtnText.textContent = 'Analyze';
            spinner.style.display = 'none';
            analyzeBtn.disabled = false;
        }
    }

    function populateResults(data) {
        cropNameEl.textContent = data.crop_name;
        diseaseNameEl.textContent = data.disease_name;
        confidenceScoreEl.textContent = data.confidence;
        
        // Create a list for the cure recommendations
        let cureHtml = '<ul class="list-group list-group-flush">';
        data.cure.forEach(step => {
            cureHtml += `<li class="list-group-item"><i class="fa-solid fa-check-circle text-success me-2"></i>${step}</li>`;
        });
        cureHtml += '</ul>';
        
        cureRecommendationEl.innerHTML = cureHtml;
    }
});