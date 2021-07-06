function redirectPage() {
  window.open('./studentResults.html');
}

function displayResults() {

  var arrayOfTeacherAnnouncement = [];

  // grab all the teacherInputObjs from localStorage and push the JSON into an array.
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes('teacher')) {
      arrayOfTeacherAnnouncement.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }

  // grab the student search object and parse it into an object format.
  var foundStudentObj = JSON.parse(localStorage.getItem('studentObjKey'));

  // log objects for verification.
  console.log(foundStudentObj);
  console.log(arrayOfTeacherAnnouncement);


  /*
     CODE TO HANDLE "ALL Checkboxes and Dropdown selections":
  
      if the type of element property or value has all and its true, all checkboxes of that type are 
      skipped in the comparision because its always going to match.
      e.g All grades for student will always match with all grades for teacher.
      e.g grade 9 for student will always match for ALL grades from the teacher
  
      In the same regard, we also want to ensure that if even 1 selected grade between the student and teacher are shared, that the code will return a match.
      e.g suppose the teacher selects grade 9 and 10, but the student selects grade 9 only, the code should still return a match since there is 1 common property. We do this by keeping track of the amount of matches with a counter, and we ovveride the falsy value if the code finds a match.
    */

  // String with all Announcement Details
  var announcementMatchedDetail = "";

    // iterate through the array of objects containing the teacher details and compare it to the student.
  for (var i = 0; i < arrayOfTeacherAnnouncement.length; i++) {

    // declare an 'is there match' to tell whether the teacher params and student params match
    var isThereExactMatch = true;
    // declare a variable that tells us if even a grade did not match 
    var didGradesNotMatch = false;

    // keeps track of how many grades match.
    var didOneGradeMatch = 0;

    for (var keys in foundStudentObj) {

      // setup variables for comparision.
      var keyParsed = keys;
      var valueStu = foundStudentObj[keys].toString();

      // Reversed key finds the property of the teacher thats equal to the current student key 
      var reversedKey = keyParsed.replace('student', 'teacher').replace('Student', 'Teacher');
      var teacherEqv = arrayOfTeacherAnnouncement[i][reversedKey].toString();

      var doesTeacherValueHaveAll = teacherEqv.toLowerCase().includes('all');
      var whatIsTheTeacherGradeAllValue = arrayOfTeacherAnnouncement[i][reversedKey.replace(/\d+/gms, 'All')];

      var isTheCurrentStudentKeyAllAndTrue = keyParsed.toString().toLowerCase().includes('all') && valueStu.toString() !== "false";
      var isTheCurrentStudentKeyClubOrGenderAll = valueStu.toString().toLowerCase().includes('all')
      var whatIsTheStudentGradeAllValue = foundStudentObj[keyParsed.replace(/\d+/gms, 'All')];

      /* If the student Key for grade is true, and the equal teacher key for the same grade is true, we increment the counter.*/
      if (valueStu == "true" && teacherEqv == "true") {
        didOneGradeMatch++
        console.log('theres 1 match between the student and teacher grades.')
      }

      /* If we encountered a non matching grade before, but now we do find a matching grade, we must skip the iteration for comparision or re-evaluate didGradesNotMatch to false */
      if (/\d+/g.test(keyParsed) && didOneGradeMatch > 0) {
        console.log('already one match was found');

        /*if the grades didn't match before, but now we find a match reassign didGradesNotMatch.*/
        if (didGradesNotMatch == true) {
          didGradesNotMatch = false;
          continue;
        }
        
        continue;
      }

      /*With this code, we check the teacher property = to the student, and if it has the value All Gender/Club in it, or the student Grade is All value is true, we skip the comparision as well.*/
      if (teacherEqv.toLowerCase().includes('all') || (whatIsTheStudentGradeAllValue == true) || (whatIsTheTeacherGradeAllValue == true)) {
        continue;
      }


      /* similarly, if the current student key is All Clubs or All Grades or All Gender, we skip the comparision.*/
      if (isTheCurrentStudentKeyAllAndTrue == true || isTheCurrentStudentKeyClubOrGenderAll == true || whatIsTheStudentGradeAllValue == true) {
        continue;
      }


      /* If neither of the grades clubs or gender have All in them, we simply compare them together and set the match boolean to false if they don't equal each other. */
      if (teacherEqv !== valueStu) {

        // if we're on a grade key, then we set the boolean for no match to true.
        if (/\d+/g.test(keyParsed)) {
          didGradesNotMatch = true;
          continue;
        }
        console.log('key that doesn\'t match', keyParsed, valueStu)
        isThereExactMatch = false;
      }


    }
    console.log('Exact match is' + " " + isThereExactMatch);
    console.log('The not grades match' + " " + didGradesNotMatch);

    if (isThereExactMatch == true && didGradesNotMatch == false) {
      alert(` There's a match. The #${i} is this: ${arrayOfTeacherAnnouncement[i]["teacherEnteredDetails"]}`);
      announcementMatchedDetail = announcementMatchedDetail + `🛈 Here is announcement #${i}` + " " + arrayOfTeacherAnnouncement[i]["teacherEnteredDetails"] + " 🛈" + "<br>";

    } else {
      alert('SORRY! NO MATCH');
      /* document.getElementById('htmlSAnnouncementSearch').innerHTML = 'Sorry' */
    }

  }

  if (announcementMatchedDetail !== "") {
    document.getElementById('htmlSAnnouncementSearch').innerHTML = announcementMatchedDetail;
  } else {
    document.getElementById('htmlSAnnouncementSearch').innerHTML = "Sorry no announcements match your criteria. Please try searching with different criteria.";
  }

}