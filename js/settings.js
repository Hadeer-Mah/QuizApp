/// <reference path="../typings/globals/jquery/index.d.ts" />

import { Quiz } from "./quiz.js";

export class Settings {
    constructor() {
      this.categoryElement = document.getElementById("category");
      this.difficultyElements =document.getElementsByName('difficulty')
      this.numberOfQuestionsElement = document.getElementById("numberOfQuestions");
      this.startBtn = document.getElementById("startBtn");
      this.startBtn.addEventListener("click", this.startQuiz.bind(this));
    }
  
    
  
    async startQuiz() {
      let category = this.categoryElement.value;  
      let difficulty = Array.from(this.difficultyElements).find((input) => input.checked).value;
      let numOfQues = this.numberOfQuestionsElement.value;
  
      const URL = `https://opentdb.com/api.php?amount=${numOfQues}&category=${category}&difficulty=${difficulty}`;
  
      let results = await this.fetchAPI(URL);
  
      if (results.length) {
        $("#alertChoose").fadeOut(200, () => {
          $("#setting").fadeOut(500, () => {
            $("#quiz").fadeIn(500);
          });
        });
  
        new Quiz(results);
      } 
      else {
        $("#alertChoose").fadeIn(200);
      }
    }
  
    async fetchAPI(url) {
      let results = await fetch(url);
      let response = await results.json();
      return response.results;
    }
  }
  