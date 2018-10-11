import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
// import RandomClues from './randomclues.js';
import RandomCategories from './randomcategories.js';


$(document).ready(function() {

  let catService;

  $('#random-categories-button').click(function() {
    catService = new RandomCategories(5);
    let promise = catService.buildCatArr()
    .then(function(out) {
      catService.catArr = out;
      console.log(out);
      $('.display-categories').html('');
      catService.catArr.forEach(function(cat,i) {
        $('.display-categories').append(`<div class='category-button-container'><button type='button' class='category-button button btn btn-warning' value='${i}'>${cat.title}</button></div>`);

        $('button.category-button').last().click(function() {
          $('.display-clues').html('');
          const index = $(this).attr('value');
          cat.clues.forEach(function(clue) {
            console.log(clue);
            $('.display-clues').append(`<div class="clue" id='clue-${index}'>${clue.question}</div>`);
          })
        });
      })
    });
  });


});
