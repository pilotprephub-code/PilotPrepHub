window.addEventListener("pageshow", function(event) {
	if (event.persisted) {
		window.location.reload();
	}
});


let startTime;

let timerInterval;

let userAnswers = {};

const selectedSubject = localStorage.getItem("selectedSubject");

const isQuizPage = window.location.pathname.includes("quiz.html");

const isIndexPage = window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/");

// only clear subject when coming fresh to home page
if (isIndexPage) {
	localStorage.removeItem("selectedSubject");
}




let questions = [];

let currentIndex = 0;
let score = 0;



function loadAllQuestions() {
	const form = document.getElementById("quizForm");
	form.innerHTML = "";

	questions.forEach((q, index) => {
		const div = document.createElement("div");
		div.classList.add("question-block");

		// ✅ build options separately (prevents template errors)
		const optionsHTML = q.options.map(option => `
      <label class="option">
        <input type="radio" name="q${index}" value="${option}">
        
        <span class="toggle">
          <span class="circle"></span>
        </span>

        <span class="option-text">${option}</span>
      </label>
    `).join("");

		// ✅ FULL HTML (with bulb)
		div.innerHTML = `
      <div class="question-header">
        <h3>Q${index + 1}. ${q.question}</h3>

        <div class="hint-container">
          <span class="hint-icon" id="hint-${index}">💡</span>
          <div class="hint-text">
            ${q.explanation || "Explanation coming soon!"}
          </div>
        </div>
      </div>

      ${optionsHTML}
    `;

		form.appendChild(div);

		const options = div.querySelectorAll("input");

		options.forEach(input => {
			input.addEventListener("change", () => {

				// save answer
				userAnswers[`q${index}`] = input.value;

				const options = div.querySelectorAll("input");

				// disable all options
				options.forEach(opt => opt.disabled = true);

				options.forEach(opt => {
					const label = opt.parentElement;
					const toggle = label.querySelector(".toggle");

					if (opt.value === q.answer) {
						label.style.border = "3px solid green";
						label.style.backgroundColor = "#e6f7ee";
						if (toggle) toggle.style.background = "#4caf50";
					}

					if (opt.checked && opt.value !== q.answer) {
						label.style.border = "3px dotted red";
						label.style.backgroundColor = "#fdecea";
						if (toggle) toggle.style.background = "#f44336";
					}
				});

				updateProgress();

				// ✅ activate bulb
				const hintIcon = document.getElementById(`hint-${index}`);
				if (hintIcon) {
					hintIcon.classList.add("active");
				}

			});
		});

	});

	// reset radios
	setTimeout(() => {
		const form = document.getElementById("quizForm");
		if (form) form.reset();
	}, 50);
}


document.addEventListener("DOMContentLoaded", () => {
	const isQuizPage = window.location.pathname.includes("quiz.html");

	if (isQuizPage) {

		const selectedSubject = localStorage.getItem("selectedSubject");
		const selectedSub = localStorage.getItem("selectedSub");
		const selectedChapter = localStorage.getItem("selectedChapter");

		const title = document.getElementById("quizTitle");

		if (title) {
   		 	title.innerText = formatSubSubject(
     		   	selectedChapter || selectedSub || selectedSubject
 		   );
		   title.style.visibility = "visible";
		}

		if (!selectedSubject) {
			window.location.href = "index.html";
			return;
		}

		const subjectData = questionBank[selectedSubject];

		// ✅ VALIDATION (Fix 1)
		if (!Array.isArray(subjectData)) {

			if (!selectedSub || !subjectData[selectedSub]) {
				window.location.href = "index.html";
				return;
			}

			// if (selectedSub !== "revision") {
			// 	if (!selectedChapter || !subjectData[selectedSub][selectedChapter]) {
			// 		window.location.href = "chapters.html";
			// 		return;
			// 	}
			// }
			const subData = subjectData[selectedSub];

			if (!Array.isArray(subData)) {
    			if (!selectedChapter || !subData[selectedChapter]) {
        			window.location.href = "chapters.html";
        			return;
    			}
			}
		}

		// reset answers
		userAnswers = {};

		// ✅ LOAD QUESTIONS
		if (!Array.isArray(subjectData)) {

			// if (selectedSub === "revision") {
			// 	questions = subjectData[selectedSub];
			// } else {
			// 	questions = subjectData[selectedSub][selectedChapter];
			// }
			const subData = subjectData[selectedSub];

				if (Array.isArray(subData)) {
   				 questions = subData;
				} else {
  				 questions = subData[selectedChapter];
				}

		} else {
			questions = subjectData;
		}

		const form = document.getElementById("quizForm");
		if (form) form.innerHTML = "";

		loadAllQuestions();
		startTimer();
	}

});


function goToQuiz(subject) {
	localStorage.setItem("selectedSubject", subject);

	// 🔥 reset everything below
	localStorage.removeItem("selectedSub");
	localStorage.removeItem("selectedChapter");

	window.location.href = "quiz.html";
}


function nextQuestion() {
	currentIndex++;

	if (currentIndex < questions.length) {
		loadAllQuestions();
	} else {
		alert(`Quiz Finished! Final Score: ${score}`);
		window.location.href = "index.html"; // go back
	}
}


function submitQuiz() {
	score = 0;

	questions.forEach((q, index) => {
		const selected = document.querySelector(`input[name="q${index}"]:checked`);

		if (selected && selected.value === q.answer) {
			score++;
		}
	});

	alert(`Final Score: ${score} / ${questions.length}`);
}


function goToResult() {
	clearInterval(timerInterval);

	const totalTime = Math.floor((Date.now() - startTime) / 1000);
	localStorage.setItem("timeTaken", totalTime);

	localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
	localStorage.setItem("questions", JSON.stringify(questions));

	window.location.href = "result.html";
}




function loadResultPage() {
	const savedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};
	const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];

	const container = document.getElementById("resultContainer");

	let correct = 0;
	let wrong = 0;
	let notAttempted = 0;
	let score = 0;

	savedQuestions.forEach((q, index) => {
		const userAnswer = savedAnswers[`q${index}`];

		const div = document.createElement("div");
		div.classList.add("question-block");

		let optionsHTML = "";

		q.options.forEach(option => {
			let style = "";

			// correct answer
			if (option === q.answer) {
				style = "border:3px solid green; background-color:#e6f7ee;";
			}

			if (userAnswer === option && option !== q.answer) {
				style = "border:3px dotted red; background-color:#fdecea;";
			}

			optionsHTML += `
        <div class="option" style="${style}">
          ${option}
        </div>
      `;
		});

		if (!userAnswer) {
			notAttempted++;
		} else if (userAnswer === q.answer) {
			score++;
			correct++;
		} else {
			wrong++;
		}

		div.innerHTML = `
      <h3>Q${index + 1}. ${q.question}</h3>
      ${optionsHTML}
    `;

		//     div.innerHTML = `
		//   <div class="question-header">
		//     <h3>Q${index + 1}. ${q.question}</h3>

		//     <div class="hint-container">
		//       <span class="hint-icon" id="hint-${index}">💡</span>
		//       <div class="hint-text">
		//         ${q.explanation || "Explanation coming soon!"}
		//       </div>
		//     </div>
		//   </div>

		//   ${optionsHTML}
		// `;

		container.appendChild(div);
	});



	const total = savedQuestions.length;
	const percentage = ((score / total) * 100).toFixed(2);

	document.getElementById("finalScore").innerText =
		`${score} / ${total} - ${percentage}%`;


	const stats = document.createElement("div");

	// stats.innerText = `✅ Correct: ${correct}   |   ❌ Incorrect: ${wrong}   |   ⭕ Not Attempted: ${notAttempted}`;

	stats.innerHTML = `
  ✅ Correct: ${correct} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  ❌ Incorrect: ${wrong} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  ⭕ Not Attempted: ${notAttempted}
`;


	stats.style.textAlign = "center";
	stats.style.marginBottom = "20px";
	stats.style.fontSize = "16px";

	document.getElementById("resultContainer").prepend(stats);

	const time = localStorage.getItem("timeTaken");

	if (time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;

		const timeText = `Time Taken: ${minutes} min ${seconds} sec`;

		const div = document.createElement("div");
		div.innerText = timeText;
		div.style.fontSize = "18px";
		div.style.marginBottom = "15px";

		container.prepend(div);
	}
}


if (window.location.pathname.includes("result.html")) {
	loadResultPage();
}


function showSubSubjects(subject, event) {

	// 🔥 remove active from all buttons
	const allButtons = document.querySelectorAll("#subjects button");
	allButtons.forEach(btn => btn.classList.remove("subject-active"));

	// 🔥 add active to clicked one
	event.target.classList.add("subject-active");

	const subDiv = document.getElementById("subSubjects");
	subDiv.innerHTML = "";

	const subjectData = questionBank[subject];

	if (!Array.isArray(subjectData)) {

		// ✅ FIX: add index here
		Object.keys(subjectData).forEach((sub, index) => {

			const btn = document.createElement("button");
			btn.innerText = formatSubSubject(sub);

			btn.classList.add("sub-btn");

			// 🔥 stagger animation delay (NOW WORKS)
			btn.style.animationDelay = `${index * 0.1}s`;

			btn.onclick = () => {
				localStorage.setItem("selectedSubject", subject);
				localStorage.setItem("selectedSub", sub);

				localStorage.removeItem("selectedChapter");

				// if (sub === "revision") {
				// 	window.location.href = "quiz.html";
				// } else {
				// 	window.location.href = "chapters.html";
				// }
				const subData = questionBank[subject][sub];

				if (Array.isArray(subData)) {
   				 window.location.href = "quiz.html";
				} else {
   				 window.location.href = "chapters.html";
				}
			};

			subDiv.appendChild(btn);
		});

	} else {
		goToQuiz(subject);
	}

	// console.log(questionBank.regulation);
}


function updateProgress() {
	const total = questions.length;
	const attempted = Object.keys(userAnswers).length;

	const percent = (attempted / total) * 100;

	const bar = document.getElementById("progressBar");
	if (bar) {
		bar.style.width = percent + "%";
	}
}



function startTimer() {
	startTime = Date.now();

	timerInterval = setInterval(() => {
		const now = Date.now();
		const diff = Math.floor((now - startTime) / 1000);

		const minutes = Math.floor(diff / 60);
		const seconds = diff % 60;

		const display =
			String(minutes).padStart(2, '0') + ":" +
			String(seconds).padStart(2, '0');

		document.getElementById("timer").innerText = "⏱ " + display;
	}, 1000);
}


function formatSubSubject(str) {

	if (customTitles[str]) {
    	return customTitles[str];
	}

    // Words that should stay lowercase (unless they're the first word)
    const lowerCaseWords = [
        "and", "or", "the", "of", "in", "on", "for", 
        "to", "with", "a", "an", "by", "at", "from"
    ];

    // Aviation abbreviations that should always be uppercase
    const abbreviations = [
        "dgca", "rtr", "cpl", "ppl", "atc", "ils", "vor",
        "ndb", "vfr", "ifr", "vmc", "imc", "fir", "atis",
        "met", "nav", "fto", "cfi", "afi", "ame", "fmg", 
		"rk", "ic", "da", "pa", "adf", "vhf", "rmi", "gnss",
		"tcas", "dr", "afcs", "dc", "ac"
    ];

    return str
        .replace(/_/g, " ")
        .split(" ")
        .map((word, index) => {

            const lower = word.toLowerCase();

            // Always uppercase known abbreviations
            if (abbreviations.includes(lower)) {
                return lower.toUpperCase();
            }

            // Keep small connector words lowercase (except first word)
            if (index > 0 && lowerCaseWords.includes(lower)) {
                return lower;
            }

            // Preserve aircraft model numbers (G58, DA42, P2006T etc.)
            if (/[0-9]/.test(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }

            // Normal title case
            return lower.charAt(0).toUpperCase() + lower.slice(1);

        })
        .join(" ");
}


function loadChapters() {
	const subject = localStorage.getItem("selectedSubject");
	const sub = localStorage.getItem("selectedSub");

	const container = document.getElementById("chapterContainer");

	if (!subject || !sub || !container) return;

	const data = questionBank[subject][sub];

	container.innerHTML = "";

	Object.keys(data).forEach((chapter, index) => {
		const btn = document.createElement("button");

		// btn.innerText = chapter
		// 	.replaceAll("_", " ")
		// 	.replace(/\b\w/g, c => c.toUpperCase());

		btn.innerText = formatSubSubject(chapter);


		btn.classList.add("chapter-btn");

		// 🔥 animation delay
		btn.style.animationDelay = `${index * 0.1}s`;

		btn.onclick = () => {
			// localStorage.setItem("selectedChapter", chapter);

			localStorage.setItem("selectedChapter", chapter.toLowerCase());
			localStorage.setItem("selectedFile", chapter + ".json");
			window.location.href = "quiz.html";
		};

		container.appendChild(btn);
	});
}


const betaBar = document.getElementById("betaBar");
const closeBetaBar = document.getElementById("closeBetaBar");

if (betaBar && closeBetaBar) {
    closeBetaBar.addEventListener("click", () => {
        betaBar.style.display = "none";
    });
}


if (window.location.pathname.includes("chapters.html")) {
	loadChapters();
}