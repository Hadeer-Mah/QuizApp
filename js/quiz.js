/// <reference path="../typings/globals/jquery/index.d.ts" />
import {settings} from './main.js'
export class Quiz{
    constructor(res){
        this.results = res;
        this.currentQues = 0;
        this.score = 0;
        this.currentQuestionElement = document.getElementById('currentQuestion');
        this.totalNumberOfQuestionsElement = document.getElementById('totalNumberOfQuestions');
        this.questionElement = document.getElementById('question');
        this.rowAnswerElement = document.getElementById('rowAnswer');
        this.nextBtn = document.getElementById('next');

        this.nextBtn.addEventListener('click' , this.nextQuiz.bind(this))

        this.showQues();
    }

    
    showQues(){

        
        this.currentQuestionElement.innerHTML = this.currentQues + 1;
        this.totalNumberOfQuestionsElement.innerHTML = this.results.length;
        this.questionElement.innerHTML = this.results[this.currentQues].question;
        
        let answers =  [...this.results[this.currentQues].incorrect_answers, this.results[this.currentQues].correct_answer];



        console.log(answers);
        




        let currentIndex = answers.length,  randomIndex;

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [answers[currentIndex], answers[randomIndex]] = [
            answers[randomIndex], answers[currentIndex]];
        }







        console.log(answers);


        let cartona = ``;
        answers.forEach((answer)=>{
            cartona += `
            <div class="form-check">
             <label class="form-check-label">
                 <input type="radio" class="form-check-input" name="answer" id="" value="${answer}" >
                ${answer}
                 </label>
            </div>
            `
        })

        this.rowAnswerElement.innerHTML = cartona;

        console.log(this.results[this.currentQues]);
        
    }


    nextQuiz(){
        if(!this.checkAnswer()) {
            $('#alert').fadeIn(200);
            return;
        }
        $('#alert').fadeOut(200);
        this.currentQues++;
        if(this.currentQues >= this.results.length){
           
            $('#quiz').fadeOut(500 , ()=>{
                $('#finish').fadeIn(500);
                $('#score').html(this.score);
                $('#tryBtn').click(()=>{
                    settings.numberOfQuestionsElement.value = '';
                    $('#finish').fadeOut(200 , ()=>{
                        $('#setting').fadeIn(200)

                    })
                })
            })


        }else{
            this.showQues();
        }
    }


    checkAnswer(){
        let userAnswer = [...document.getElementsByName('answer')].find(input => input.checked)?.value;
        let correctAnswer = this.results[this.currentQues].correct_answer;

        if(!userAnswer){
            return false;
        }


        if(userAnswer == correctAnswer){
            this.score++;
            $('#Correct').fadeIn(300).fadeOut(300);
        }else{
            $('#inCorrect').fadeIn(300).fadeOut(300);
        }


        return true;
    }

}