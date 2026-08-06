console.log("script.js loaded");

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

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://pilotprephub-api.onrender.com/api";

async function fetchSubjects() {
	const res = await fetch(`${API_URL}/subjects`);
	return await res.json();
}

async function fetchSubSubjects(subject) {
	const res = await fetch(
		`${API_URL}/subjects/${encodeURIComponent(subject)}/subsubjects`
	);
	return await res.json();
}

async function fetchChapters(subject, subSubject) {
	const res = await fetch(
		`${API_URL}/chapters?subject=${encodeURIComponent(subject)}&subSubject=${encodeURIComponent(subSubject)}`
	);
	return await res.json();
}

async function fetchQuestions(subject, subSubject, chapter) {


	const dbSubject = SUBJECT_MAP[subject] || subject;
	const dbSub =
		SUBSUBJECT_REVERSE_MAP?.[subject]?.[subSubject] || subSubject;

	const url =
		`${API_URL}/questions?subject=${encodeURIComponent(dbSubject)}&subSubject=${encodeURIComponent(dbSub)}&chapter=${encodeURIComponent(chapter)}`;

	console.log("Frontend:");
	console.log(subject, subSubject, chapter);

	console.log("Backend:");
	console.log(dbSubject, dbSub, chapter);

	console.log(url);

	const res = await fetch(url);

	const data = await res.json();

	console.log(data);

	return data;
}


function loadAllQuestions() {

	const form = document.getElementById("quizForm");

	if (!form) return;

	form.innerHTML = "";

	const fragment = document.createDocumentFragment();

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

	form.appendChild(fragment);

	// reset radios
	setTimeout(() => {
		const form = document.getElementById("quizForm");
		if (form) form.reset();
	}, 50);
}


document.addEventListener("DOMContentLoaded", async () => {

	const isQuizPage = window.location.pathname.includes("quiz.html");

	if (isQuizPage) {

		const selectedSubject = localStorage.getItem("selectedSubject");
		const selectedSub = localStorage.getItem("selectedSub");
		const selectedChapter = localStorage.getItem("selectedChapter");

		console.log("Subject:", selectedSubject);
		console.log("Sub:", selectedSub);
		console.log("Chapter:", selectedChapter);

		const title = document.getElementById("quizTitle");

		if (title) {

			let displayTitle = selectedChapter || selectedSub || selectedSubject;

			if (selectedChapter) {
				displayTitle =
					CHAPTER_MAP[selectedSubject]?.[selectedSub]?.[selectedChapter] ||
					CHAPTER_MAP[selectedSubject]?.[selectedChapter] ||
					selectedChapter;
			}

			title.innerText = formatSubSubject(displayTitle);
			title.style.visibility = "visible";
		}

		if (!selectedSubject) {
			window.location.href = "index.html";
			return;
		}

		// reset answers
		userAnswers = {};

		questions = await fetchQuestions(
			selectedSubject,
			selectedSub,
			selectedChapter
		);

		if (!questions || questions.length === 0) {
			alert("No questions found.");
			window.location.href = "chapters.html";
			return;
		}

		const form = document.getElementById("quizForm");
		if (form) form.innerHTML = "";

		console.time("Render");

		loadAllQuestions();

		console.timeEnd("Render");

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


async function loadSubjects() {

	try {

		const res = await fetch(`${API_URL}/subjects`);

		const subjects = await res.json();

		console.log(subjects);

	} catch (err) {

		console.error(err);

	}

}


function createButton(text, className, index, onClick) {

	const btn = document.createElement("button");

	btn.innerText = formatSubSubject(text);

	btn.classList.add(className);

	btn.style.animationDelay = `${index * 0.1}s`;

	btn.onclick = onClick;

	return btn;

}

async function showAircraftButtons(subject, container) {

	try {

		const dbSubject = SUBJECT_MAP[subject] || subject;

		const res = await fetch(
			`${API_URL}/chapters?subject=${dbSubject}&subSubject=General`
		);

		const aircraft = await res.json();

		container.innerHTML = "";

		aircraft.forEach((chapter, index) => {

			const display =
				CHAPTER_MAP[subject]?.[chapter] || chapter;

			const btn = createButton(

				display,

				"sub-btn",

				index,

				() => {

					localStorage.setItem("selectedSubject", subject);
					localStorage.setItem("selectedSub", "general");
					localStorage.setItem("selectedChapter", chapter);

					window.location.href = "quiz.html";

				}

			);

			container.appendChild(btn);

		});

	} catch (err) {

		console.error(err);

	}

}

async function fetchSubSubjects(subject) {

	const dbSubject = SUBJECT_MAP[subject] || subject;

	const res = await fetch(
		`${API_URL}/subjects/${dbSubject}/subsubjects`
	);

	return await res.json();

}

function renderSubSubjectButtons(subject, subSubjects, container) {

	container.innerHTML = "";

	// Natural sort once
	naturalSort(subSubjects);

	// Convert backend names -> frontend names
	const mappedSubjects = [];

	subSubjects.forEach(sub => {

		let mappedSub;

		if (SUBSUBJECT_MAP[subject]) {

			mappedSub = SUBSUBJECT_MAP[subject][sub];

			if (!mappedSub) return;

		} else {

			mappedSub = sub;

		}

		mappedSubjects.push({
			backend: sub,
			display: mappedSub
		});

	});

	// Apply custom display order if defined
	const order = DISPLAY_ORDER[subject];

	if (order) {

		mappedSubjects.sort((a, b) => {

			return order.indexOf(a.display) - order.indexOf(b.display);

		});

	}

	// Render buttons
	mappedSubjects.forEach(({
		backend,
		display
	}, index) => {

		const btn = createButton(

			display,

			"sub-btn",

			index,

			() => {

				localStorage.setItem("selectedSubject", subject);
				localStorage.setItem("selectedSub", display);

				localStorage.removeItem("selectedChapter");

				if (DIRECT_TO_QUIZ[subject]?.includes(display)) {

					localStorage.setItem(
						"selectedChapter",
						DIRECT_QUIZ_CHAPTER[subject][display]
					);

					window.location.href = "quiz.html";

				} else {

					window.location.href = "chapters.html";

				}

			}

		);

		container.appendChild(btn);

	});

}

async function showSubSubjects(subject, event) {

	// 🔥 remove active from all buttons
	const allButtons = document.querySelectorAll("#subjects button");
	allButtons.forEach(btn => btn.classList.remove("subject-active"));

	// 🔥 add active to clicked one
	event.target.classList.add("subject-active");

	const subDiv = document.getElementById("subSubjects");

	if (SUBJECT_WITHOUT_SUBSUBJECT.includes(subject)) {

		await showAircraftButtons(subject, subDiv);

		return;

	}

	const subSubjects = await fetchSubSubjects(subject);

	renderSubSubjectButtons(subject, subSubjects, subDiv);

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
		"tcas", "dr", "afcs", "dc", "ac", "ssr", "acas"
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

function naturalSort(arr) {

	return arr.sort((a, b) =>

		a.localeCompare(b, undefined, {
			numeric: true,
			sensitivity: "base"
		})

	);

}

async function loadChapters() {

	const subject = localStorage.getItem("selectedSubject");
	const sub = localStorage.getItem("selectedSub");

	const container =
		document.getElementById("chapterContainer") ||
		document.getElementById("subSubjects");

	if (!subject || !sub || !container) return;

	const dbSubject = SUBJECT_MAP[subject] || subject;
	const dbSub = SUBSUBJECT_REVERSE_MAP?.[subject]?.[sub] || sub;

	console.log("Subject:", subject);
	console.log("Sub:", sub);
	console.log("DB Subject:", dbSubject);
	console.log("DB Sub:", dbSub);

	container.innerHTML = "";

	try {

		console.log(`${API_URL}/chapters?subject=${dbSubject}&subSubject=${dbSub}`);

		const res = await fetch(
			`${API_URL}/chapters?subject=${encodeURIComponent(dbSubject)}&subSubject=${encodeURIComponent(dbSub)}`
		);

		const chapters = await res.json();

		naturalSort(chapters);

		console.log(chapters);

		chapters.forEach((chapter, index) => {

			const btn = document.createElement("button");

			console.log("Subject:", subject);
			console.log("Sub:", sub);
			console.log("Chapter:", chapter);
			console.log("Mapped:", CHAPTER_MAP[subject]?.[chapter]);

			// const displayChapter = CHAPTER_MAP[sub]?.[chapter] || CHAPTER_MAP[subject]?.[chapter] || chapter;

			const displayChapter = CHAPTER_MAP[subject]?.[sub]?.[chapter] || chapter;

			btn.innerText = formatSubSubject(displayChapter);

			btn.classList.add("chapter-btn");
			btn.style.animationDelay = `${index * 0.1}s`;

			btn.onclick = () => {
				localStorage.setItem("selectedChapter", chapter);
				
				window.location.href = "quiz.html";
			};

			container.appendChild(btn);

		});

	} catch (err) {

		console.error(err);

	}
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

if (window.location.pathname.includes("module.html")) {

	loadSubjects();

}