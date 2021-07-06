var teacherGrade;
var teacherGender;
var teacherClub;
var teacherDetails;
// declare object to hold all input values
var teacherInputObj = {}; 
// counter to determine the id of the announcement 
var counter = 0;

function teacherFetchInput() {
  
  // reset object below after each submission.
    teacherInputObj = {}; 

    const areFieldsEntered = areCheckboxesSelected('input[id*="Grade"]');

    // if the user didn't select a checkbox, alert them and stop the code from collecting the data with return.
    if (areFieldsEntered == false) {
        return;
    }

    console.log("This is the counter after refresh" , counter);

    alert('Fetching fields from input! Please check console for the data!');

    teacherClub = document.getElementById('htmlTClub').value;
    teacherGender = document.getElementById('htmlTGender').value;
    teacherDetails = document.getElementById('htmlTAnnouncement').value;

    // teacherGrade variable below is set to a querySelector to match all html elements that contain the word "Grade" in the id.
    teacherGrade = document.querySelectorAll('input[id*="Grade"]');

    // increment the counter.
    counter++

    /*
    With for loop below, we find the selected grades, by iterating through the array of checkboxes that matched the query search
    If teacherGrade[i] element with property checked is equal to 1, we know its checked so we add it's id to an array called teacherGradeArr.
    We store the individual checkboxes in a JSON object with a true or false value depending on the situation.
    If we have to enter more grades, the JS function will take care of it no matter how many grades there are without having to add new code.
    */

    for (var i = 0; i < teacherGrade.length; i++) {
        if (teacherGrade[i].checked == 1) {
            const trimedSelectedGrade = teacherGrade[i].id.replace('htmlT', '');
            teacherInputObj[`teacher` + trimedSelectedGrade] = true;
        } else {
            const trimedUnselectedGrade = teacherGrade[i].id.replace('htmlT', '');
            teacherInputObj[`teacher` + trimedUnselectedGrade] = false;
        }
    }

    // each input value below is stored as a property in the teacherInputObj. 
    teacherInputObj.teacherSelectedGender = teacherGender;
    teacherInputObj.teacherSelectedClub = teacherClub;
    teacherInputObj.teacherEnteredDetails = teacherDetails;

    // assign counter to the object key so multiple announcements can be stored.
    localStorage.setItem(`teacherInputObj${counter}` , JSON.stringify(teacherInputObj));

    // Log final object to console
    console.log(teacherInputObj);
}

// function to check if user selected a grade
function areCheckboxesSelected(checkboxElement) {
    var checkBoxes = document.querySelectorAll(checkboxElement)

    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked == true) {
            return true;
        }
    }

    alert('You did not specify the grade. Please select a grade to create an announcement.');

    return false;
}

/*
 this is to make sure that if a grade is unchecked and the All grade button is selected, that it gets unchecked.
 this is to prevent a discrepancy e.g the checkbox value for all is true, but grade 9 is false. 
 this function will un check the all grade checkbox automatically if the user unchecks grade 9/10/11/12
*/
function unCheckGradeAll(checkboxElement) {
    if (checkboxElement.checked == false) {
        document.getElementById("htmlTGradeAll").checked = false;
    }
}

/*
This function checks all other checkboxes if the all grades is selected. If the all grades is unchecked, then it will un check everything.
*/
function checkOtherGrades() {
    var otherCheckboxes = document.querySelectorAll('input[id*="Grade"]');

    if (document.getElementById('htmlTGradeAll').checked == true) {
        for (var i = 0; i < otherCheckboxes.length; i++) {
            otherCheckboxes[i].checked = true;
        }

    } else if (document.getElementById('htmlTGradeAll').checked == false) {

        for (var i = 0; i < otherCheckboxes.length; i++) {
            otherCheckboxes[i].checked = false;
        }

    }
}

/*
 this function makes sure that all grades are re-enabled if the user un checks it but checks grades 9-12. 
 By determining thne length of the array of checkboxes without "All", the code will compare the number checked options to the length of possible checkboxes.
 if they're both the same, then we must renable the All grades checkbox because the user renabled grades 9-12.
*/
function recheckAll () {
    var allGradeNoAll = document.querySelectorAll('input[id*="Grade"]:not(input[id="htmlTGradeAll"])');
    var arrLength = allGradeNoAll.length;
    var count = 0;

    for(var j=0;j<allGradeNoAll.length;j++) {

      if(allGradeNoAll[j].checked == true){
        count++;
      }
      
    }

    if (count == arrLength){
         document.getElementById('htmlTGradeAll').checked = true;
       }
  }
  
  /* This function  determines what to set the counter to if the page reloads. We iterate through the teacher objs, and determine what number each teacher object key has. We keep updating the counter until we find the announcement with the highest counter number which we assign to the global counter variable.*/
  function updateCounter() {
    
    console.log('The counter was initally' , counter);

    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.getItem(localStorage.key(i)).includes('teacher')) {
        /*the match method returns an array with the number of the current key. \d+ matches a multidigit number to the left of the end of the string.*/ 
        var lastTeacherAnnouncement = parseInt(localStorage.key(i).match(/\d+$/g)[0]);
        if (lastTeacherAnnouncement > counter) {
         counter = lastTeacherAnnouncement;
         }
        }

    }
    console.log('The counter is now' , counter );
  }