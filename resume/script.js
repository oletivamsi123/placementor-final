let db;

const request = indexedDB.open("ResumeDB", 1);

request.onupgradeneeded = function(event) {

    db = event.target.result;

    if (!db.objectStoreNames.contains("resumes")) {

        db.createObjectStore("resumes", {
            keyPath: "id",
            autoIncrement: true
        });

    }
};

request.onsuccess = function(event) {

    db = event.target.result;

    console.log("Database Ready");

};
// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const toggleBtn = document.getElementById('themeToggle');
    toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

// Databases
const SKILLS_DB = [
'java','python','c','c++','html','css','javascript',
'react','node.js','express','vue','angular',
'mysql','mongodb','postgresql','sqlite',
'git','github','docker','kubernetes',
'aws','azure','gcp',
'spring','spring boot','hibernate',
'flutter','kotlin','android',
'tensorflow','pytorch','machine learning',
'deep learning','nlp','pandas','numpy',
'power bi','tableau','excel'
];

// File Handling
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        processFile(fileInput.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if(e.target.files.length > 0) {
        processFile(e.target.files[0]);
    }
});
function saveResume(file) {

    if (!db) {
        console.log("Database not ready");
        return;
    }

    const transaction =
        db.transaction(["resumes"], "readwrite");

    const store =
        transaction.objectStore("resumes");

    store.add({
        name: file.name,
        type: file.type,
        uploadedAt: new Date(),
        file: file
    });

    console.log("Resume Saved");

}
async function processFile(file) {
    saveResume(file);
    const ext = file.name.split('.').pop().toLowerCase();
    
    document.getElementById('upload-screen').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');

progressBar.style.width = "10%";

setTimeout(() => {
    loadingText.innerText = "Extracting Resume...";
    progressBar.style.width = "25%";
},1000);

setTimeout(() => {
    loadingText.innerText = "Scanning Skills...";
    progressBar.style.width = "50%";
},2500);

setTimeout(() => {
    loadingText.innerText = "Analyzing Projects...";
    progressBar.style.width = "75%";
},4500);

setTimeout(() => {
    loadingText.innerText = "Calculating ATS Score...";
    progressBar.style.width = "100%";
},6500);
    try {
        let text = "";
        const arrayBuffer = await file.arrayBuffer();

        if (ext === 'pdf') {
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + ' ';
            }
        } else if (ext === 'docx') {
            const result = await mammoth.extractRawText({arrayBuffer: arrayBuffer});
            text = result.value;
        } else {
            throw new Error("Invalid file type.");
        }
    text = text.replace(/\s+/g, ' ');
        // Fake AI Loading Animation (7 seconds)

const loadingText = document.querySelector('#loading h2');

loadingText.innerText = "Extracting Resume...";

setTimeout(() => {
    loadingText.innerText = "Scanning Skills...";
}, 1500);

setTimeout(() => {
    loadingText.innerText = "Analyzing Experience...";
}, 3000);

setTimeout(() => {
    loadingText.innerText = "Calculating ATS Score...";
}, 4500);

setTimeout(() => {
    loadingText.innerText = "Generating Recommendations...";
}, 6000);

setTimeout(() => {
    analyzeResume(text.toLowerCase(), file.name);
}, 7000);
        
    } catch (err) {

    console.error(err);

    document.getElementById('loading').style.display = 'none';
        document.getElementById('upload-screen').style.display = 'block';
        document.getElementById('error-msg').innerText = "Error parsing file. Please try a different PDF or DOCX.";
    }
}

// Analysis Logic
function analyzeResume(text, filename) {
    // Regex Extraction
    const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    
    // Flags
   
const hasEdu = ['education', 'university', 'bachelor', 'degree']
.some(w => text.includes(w));

const hasExp = ['experience', 'work', 'employment', 'internship']
.some(w => text.includes(w));

const hasProj = ['project', 'portfolio']
.some(w => text.includes(w));

const hasCert = ['certification', 'certificate']
.some(w => text.includes(w));

const hasLinkedin = text.includes('linkedin');

const hasGithub = text.includes('github');

const hasAchievements =
['achievement', 'award', 'winner', 'hackathon', 'rank']
.some(w => text.includes(w));

const hasObjective =
['objective', 'summary', 'profile']
.some(w => text.includes(w));
    // Skill Detection
    const detectedSkills = [];
    const missingSkills = [];
    SKILLS_DB.forEach(skill => {
        if(text.includes(skill)) detectedSkills.push(skill);
        else missingSkills.push(skill);
    });

    // Scoring
   const scores = {
    'Contact': phoneMatch ? 10 : 0,
    'Education': hasEdu ? 15 : 0,
    'Skills': Math.min(20, detectedSkills.length),
    'Projects': hasProj ? 15 : 0,
    'Experience': hasExp ? 15 : 0,
    'Certifications': hasCert ? 10 : 0,
    'LinkedIn': hasLinkedin ? 5 : 0,
    'GitHub': hasGithub ? 5 : 0,
    'Achievements': hasAchievements ? 10 : 0,
    'Objective': hasObjective ? 5 : 0,
    'Formatting': text.split(' ').length > 100 ? 10 : 0
};
    
    const rawScore = Object.values(scores).reduce((a, b) => a + b, 0);

const totalScore = Math.round((rawScore / 120) * 100);
    let rating = "Poor";
    if(totalScore >= 85) rating = "Excellent";
    else if(totalScore >= 70) rating = "Good";
    else if(totalScore >= 50) rating = "Average";

    // Feedback Logic
    let strengths = [], weaknesses = [], suggestions = [];

    

if(!hasLinkedin)
    suggestions.push("Add LinkedIn profile.");

if(!hasAchievements)
    suggestions.push("Include achievements, awards or hackathons.");

if(!hasObjective)
    suggestions.push("Add a professional summary section.");
    
    if(detectedSkills.length > 5) strengths.push("Strong technical skills detected.");
    else { weaknesses.push("Weak skill footprint."); suggestions.push("Add a dedicated skills section."); }

    if(hasProj) strengths.push("Project portfolio included.");
    else { weaknesses.push("Missing projects."); suggestions.push("Add personal/academic projects."); }

    if(hasExp) strengths.push("Professional experience found.");
    else { weaknesses.push("Missing work experience."); suggestions.push("Add internships or freelance work."); }

    if(!hasCert) suggestions.push("Include relevant industry certifications.");
    if(!text.includes('linkedin')) suggestions.push("Add your LinkedIn profile link.");


    if(!hasCert)
    weaknesses.push("No certifications found.");

if(!hasGithub)
    weaknesses.push("GitHub profile missing.");

if(!hasLinkedin)
    weaknesses.push("LinkedIn profile missing.");

if(!hasAchievements)
    weaknesses.push("No achievements or awards found.");

if(!hasObjective)
    weaknesses.push("Professional summary/objective missing.");
    

    
let predictedRole = "General Software Developer";

if(text.includes('react') || text.includes('javascript'))
    predictedRole = "Frontend Developer";

if(text.includes('java') && text.includes('spring'))
    predictedRole = "Java Backend Developer";

if(text.includes('python') && text.includes('machine learning'))
    predictedRole = "Machine Learning Engineer";

if(text.includes('android') || text.includes('kotlin'))
    predictedRole = "Android Developer";



    // Update DOM
    document.getElementById('res-filename').innerText = filename;
   
    document.getElementById('res-phone').innerText = phoneMatch ? phoneMatch[0] : 'Not Found';
    let current = 0;

const counter = setInterval(() => {

    current++;

    document.getElementById('res-score').innerText = current;

    if(current >= totalScore){
        clearInterval(counter);
    }

},20);
    document.getElementById('res-rating').innerText = rating;
    document.getElementById('predicted-role').innerText = predictedRole;

    // Score Circle Gradient
    const scoreCircle = document.querySelector(".score-circle");
const scoreText = document.getElementById("res-score");

let currentScore = 0;

const animateScore = setInterval(() => {

    currentScore++;

    scoreText.innerText = currentScore;

    scoreCircle.style.background =
    `conic-gradient(
        #3b82f6 ${currentScore * 3.6}deg,
        rgba(255,255,255,0.08) 0deg
    )`;

    if(currentScore >= totalScore){

        clearInterval(animateScore);

        scoreCircle.classList.add("completed");

    }

},15);

    // Progress Bars
    const barsHtml = [
        {name: 'Skills', val: scores.Skills, max: 20},
        {name: 'Experience', val: scores.Experience, max: 20},
        {name: 'Projects', val: scores.Projects, max: 20},
        {name: 'Education', val: scores.Education, max: 15},
        {name: 'Contact', val: scores.Contact, max: 10}
    ].map(item => `
        <div class="bar-wrapper">
            <div class="bar-label"><span>${item.name}</span> <span>${item.val}/${item.max}</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width: ${(item.val/item.max)*100}%"></div></div>
        </div>
    `).join('');
    document.getElementById('score-bars').innerHTML = barsHtml;

    // Arrays to Lists/Chips
    document.getElementById('detected-skills').innerHTML = detectedSkills.length ? detectedSkills.map(s => `<span class="chip">${s}</span>`).join('') : '<p>None detected</p>';
    document.getElementById('missing-skills').innerHTML = missingSkills.slice(0, 7).map(s => `<span class="chip missing">${s}</span>`).join('');
    
    document.getElementById('strengths-list').innerHTML = strengths.map(s => `<li>${s}</li>`).join('');
    document.getElementById('weaknesses-list').innerHTML = weaknesses.map(s => `<li>${s}</li>`).join('');
    document.getElementById('suggestions-list').innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');

    // Show Results
    document.getElementById('loading').style.display = 'none';
    const resultScreen = document.getElementById('results-screen');

resultScreen.style.display = 'block';
resultScreen.animate(
[
    {opacity:0, transform:'translateY(30px)'},
    {opacity:1, transform:'translateY(0)'}
],
{
    duration:800,
    easing:'ease'
}
);
    document.getElementById('downloadBtn').style.display = 'inline-block';
}

function downloadPDF() {
    const element = document.getElementById('results-screen');
    html2pdf().set({
        margin: 0.5,
        filename: 'Resume_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(element).save();
}
let score = 65;

setInterval(() => {

    score++;

    if(score > 95){
        score = 65;
    }

    const scoreElement = document.getElementById("fakeScore");

    if(scoreElement){
        scoreElement.innerText = score + "%";
    }

},100);
function getAllResumes() {

    const transaction =
        db.transaction(["resumes"], "readonly");

    const store =
        transaction.objectStore("resumes");

    const request =
        store.getAll();

    request.onsuccess = function() {

        console.log(request.result);

    };

}