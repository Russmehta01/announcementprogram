var studentGrade;
var studentGender;
var studentClub;
var studentInputObj = {}; // declare object  to hold all input values.

function studentFetchInput() {
    studentInputObj = {};  // reset object as well.

    const areFieldsEntered = areCheckboxesSelected('input[id*="Grade"]');

    // if the user didn't select a checkbox, alert them and stop the code from collecting the data with return.
    if (areFieldsEntered == false) {
        return;
    }

    alert('Fetching fields from input! Please check console for the data!');

    studentClub = document.getElementById('htmlSClub').value;
    studentGender = document.getElementById('htmlSGender').value;

    // teacherGrade variable below is set to a querySelector to match all html elements that contain the word "Grade" in the id.
    studentGrade = document.querySelectorAll('input[id*="Grade"]');


    /*
    With for loop below, we find the selected grades, by iterating through the array of checkboxes that matched the query search
    If studentGrade[i] element with property checked is equal to 1, we know its checked so we add it's id to an array called teacherGradeArr.
    We store that array and the individual checkboxes in a JSON object with a true or false value depending on the situation.
    If we have to enter more grades, the JS function will take care of it no matter how many grades there are without having to add new code.
    The loop also stores the data in localStorage as a key with true or false value.
    */

    for (var i = 0; i < studentGrade.length; i++) {
        if (studentGrade[i].checked == 1) {
            const trimedSelectedGrade = studentGrade[i].id.replace('htmlS', '');
            studentInputObj['student' + trimedSelectedGrade] = true;
        } else {
            const trimedUnselectedGrade = studentGrade[i].id.replace('htmlS', '');
            studentInputObj['student' + trimedUnselectedGrade] = false;
        }
    }

    studentInputObj.studentSelectedGender = studentGender;
    studentInputObj.studentSelectedClub = studentClub;

    localStorage.setItem('studentObjKey' , JSON.stringify(studentInputObj));

    // Log final object to console
    console.log(studentInputObj);
}

// function to check if user selected a grade. Returns true if selected and false if not.
function areCheckboxesSelected(checkboxElement) {
    var checkBoxes = document.querySelectorAll(checkboxElement)

    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked == true) {
            return true;
        }
    }

    alert('You did not specify the grade. Please select a grade to search for an announcement.');

    return false;
}

/*
This function checks all other checkboxes if the all grades is selected. If the all grades is unchecked, then it will un check everything.
*/

function checkOtherGrades() {
    var otherCheckboxes = document.querySelectorAll('input[id*="Grade"]')
    if (document.getElementById('htmlSGradeAll').checked == true) {
        for (i = 0; i < otherCheckboxes.length; i++) {
            otherCheckboxes[i].checked = true;
        }
    } else if (document.getElementById('htmlSGradeAll').checked == false) {

        for (i = 0; i < otherCheckboxes.length; i++) {
            otherCheckboxes[i].checked = false;
        }

    }
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
        document.getElementById("htmlSGradeAll").checked = false;
    }
}


/*
 this function makes sure that all grades is re-enabled if the user un checks it but checks grades 9-12. 
 By determining the length of the array of checkboxes without "All", the code will compare the number checked options to the length of possible checkboxes.
 if they're both the same, then we must renable the All grades checkbox because the user renabled grades 9-12.
*/
function recheckAll() {
    var allGradeNoAll = document.querySelectorAll('input[id*="Grade"]:not(input[id="htmlSGradeAll"])');
    var arrLength = allGradeNoAll.length;
    var counter = 0;
    for (var j = 0; j < allGradeNoAll.length; j++) {

        if (allGradeNoAll[j].checked == true) {
            counter++;
        }

        if (counter == arrLength) {
            document.getElementById('htmlSGradeAll').checked = true;
        }
        
    }
}
