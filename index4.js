const quizQuestions = [
{
	question: "What is Nearly Headless Nick’s Full Name?",
	answers: [
		'Sir Nicholas de Monsky-Pimpton',
		'Sir Nicholas of Minsky-Popington',
		'Sir Nicholas de Mimsy-Porpington',
		'Sir Nicholas of Mimsy-Popington'
	], 
	correctAnswer: 'Sir Nicholas de Mimsy-Porpington'
}, 
{ 
	question: "What is the max speed for a Firebolt Broomstick?",
	answers: [
		'100 MPH',
		'150 MPH',
		'175 MPH',
		'135 MPH'
	], 
	correctAnswer: '150 MPH'
},
{
	question: "What did Ginny name her pet pygmy puff?",
	answers: [
		'Arnold',
		'Floofy',
		'Scabbers II',
		'Arthur'
	], 
	correctAnswer: 'Arnold'
}, 
{
	question: "Which was NOT a password to the headmaster’s office",
	answers: [
		'Cockroach Cluster',
		'Raspberry Gumdrop',
		'Dumbledore',
		'Sherbert Lemon',
	], 
	correctAnswer: 'Raspberry Gumdrop'
}, 
{
	question: "What is Aragog’s wife’s name?",
	answers: [
		'Mosag',
		'Mora',
		'Argona',
		'Mosog'
	], 
	correctAnswer: 'Mosag'
}, 
{
	question: "What house was Moaning Myrtle sorted into?",
	answers: [
		'Slytherin',
		'Ravenclaw',
		'Gryffindor',
		'Hufflepuff'
	], 
	correctAnswer: 'Ravenclaw'
}, 
{
	question: "What year was Ollivanders Founded?",
	answers: [
		'465 BC',
		'57 BC',
		'712 BC',
		'382 BC'
	], 
	correctAnswer: '382 BC'
}, 
{
	question: "What number is Harry's vault at Gringotts?",
	answers: [
		'687',
		'787',
		'727',
		'627'
	], 
	correctAnswer: '687'
}, 
{
	question: "Who is in the compartment that Harry, Ginny, and Neville join at the beginning of Harry’s fifth year?",
	answers: [
		'Cho Chang',
		'Remus Lupin',
		'Luna Lovegood',
		'Hermione Granger'
	], 
	correctAnswer: 'Luna Lovegood'
}, 
{
	question: "Where did Qudditch Originate?",
	answers: [
		"Hogsmede",
		'Queerditch Marsh',
		'Quebec',
		'Edinborough'

	], 
	correctAnswer: 'Queerditch Marsh'
}, 
];

let questionNumber = 0;
let score = 0;
let currentQuestion = quizQuestions[0];

function startQuiz() {
	$("button[name='start']").on('click', function(event){
		$('#start-page').remove();
		$("#qa-form").css('display', 'block');
		renderQuestion();
		selectAnswer();
		nextQuestion();
	});
};



///the following 2 functions display a question
function generateQuestion(){
	return `<div class ="question">
				<fieldset>
				<legend class ="question-text"> ${currentQuestion.question}</legend>
				<form>
						<label id= "ans1" class = "answer-choice">
							<input type = "radio" value="choicetext" name = "answer" class="answer" required>
							<span>  ${currentQuestion.answers[0]} </span>
						</label>
						<label id= "ans2" class = "answer-choice" >
							<input type = "radio" value="choicetext" name = "answer" class="answer" required>
							<span> ${currentQuestion.answers[1]} </span>
						</label>
						<label id= "ans3" class = "answer-choice">
							<input type = "radio" value="choicetext" name = "answer" class="answer" required>
							<span> ${currentQuestion.answers[2]}  </span>
						</label>
						</label>
						<label id= "ans4" class = "answer-choice">
							<input type = "radio" value="choicetext" name = "answer" class="answer" required>
							<span> ${currentQuestion.answers[3]}</span>
						<button type="submit" class="submit-button"> submit</button>
					</fieldset>
				</form>
			</div>`;
		//} else {
			//displayResults();
			//restartQuiz();
			//do I need to display q number?
		//}
};

function renderQuestion(){
	$("#qa-form").html(generateQuestion());
};

//allow uers to select an answer
function selectAnswer(){
	$('form').submit(function (event) {
		event.preventDefault();
		scoreAnswer();
		nextQuestion();
	});
};

//add one to current question
function changeCurrentQuestion (){
	currentQuestion = quizQuestions[++i];
}

//next question - to be displayed on feedback
function nextQuestion() {
	//select it
	$('main').on('click', '.next-button', function (event) {
	    if (currentQuestion < quizQuestions.length) {
	    	changeQuestionNumber();
		    renderQuestion();
		} else {
			displayResults();
		}
  });
};


//score Answer 
function scoreAnswer (){
	let selected = $('input:checked');
	let answer = selected.val();
	if (answer === currentQuestion.correctAnswer) {
		correctAnswerFeedback();
		changeScore();
	} else {
		incorrectAnswerFeedback();
	}
}

//increment score
function changeScore () {
  score ++;
  $('.score').text(score+1);
}


//increment question number
function changeQuestionNumber () {
	questionNumber ++;
  $('.question-number').text(questionNumber+1);
}

//if correct answer
//function correctAnswer() {
	//correctAnswerFeedback();
	//changeScore();
//}

//feedback for correct answer
function correctAnswerFeedback() {
	$("#qa-form").html(`<div class="correct">
		<p><b>You got it right!</b></p><button type=button class="next-button">Next</button></div>
	</div>`)
}

//feedback for incorrect answer
function incorrectAnswerFeedback() {
	$("#qa-form").html(`<div class="correct"><p><b>You got it wrong!</b>
			<p>The correct answer is <span>${currentQuestion.correctAnswer}</span></p><button type=button class="next-button">Next</button></div>`)
}

//render results 
function displayResults () {
	if (score >= 8) {
		$(".qa-form").html(`<div class="results"><h3>Yer a wizard, Harry!</h3><p>You got ${score} / 10</p><button class="restart-button">Restart Quiz</button></div>`)
	} else if (score < 8 && score >= 4) {
		$(".qa-form").html(`<div class="results"><h3>Muggleborn!</h3><p>You got ${score} / 10</p><button class="restart-button">Restart Quiz</button></div>`)
	} else {
		$(".qa-form").html(`<div class="results"><h3>You're a muggle!</h3><p>You got ${score} / 10</p><button class="restart-button">Restart Quiz</button></div>`)
	};
}

//restart quiz
function restartQuiz() {
	$('main').on('click', '.restart-button', function (event){
    location.reload();
  });
}



//start the quiz
function createQuiz() {
	startQuiz(); 
	selectAnswer();
	nextQuestion();

};

$(createQuiz);


