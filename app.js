var students = [
  {
      name: 'Tariq',
      rollNumber: 129,
      maths: 98,
      eng: 85,
      socialscience: 89,
      sci: 90,
  },
  {
      name: 'Moiz',
      rollNumber: 211,
      maths: 89,
      eng: 95,
      socialscience: 79,
      sci: 83,
  },
  {
      name: 'Ashraf',
      rollNumber: 113,
      maths: 90,
      eng: 88,
      socialscience: 80,
      sci: 79,
  }
];

var main = document.getElementById('main');
var searched = document.getElementById("search");

function add() {
  for (var i = 0; i < students.length; i++) {
      let total = students[i].maths + students[i].eng + students[i].socialscience + students[i].sci;
      let percentage = ((total / 400) * 100).toFixed(2);
      let grade = getGrade(percentage);
      main.innerHTML += `
<tr>
<td>${[i + 1]}</td>
<td>${students[i].name}</td>
<td>${students[i].rollNumber}</td>
<td>${students[i].maths}</td>
<td>${students[i].eng}</td>
<td>${students[i].socialscience}</td>
<td>${students[i].sci}</td>
<td>${total}</td>
<td>${percentage}% (${grade})</td>
<td><input type="button" value="Delete" class="delBtn" onclick="deleteRow(this)"></td>
</tr>
`};
}
add();

function search() {
  var found = false;
  for (i = 0; i < students.length; i++) {
      if (searched.value.toLowerCase() == students[i].name.toLowerCase()) {
          found = true;
          let total = students[i].maths + students[i].eng + students[i].socialscience + students[i].sci;
          let percentage = ((total / 400) * 100).toFixed(2);
          let grade = getGrade(percentage);
          Swal.fire({
              title: `Name: ${students[i].name}`,
              text: `Maths: ${students[i].maths} | English: ${students[i].eng} | Social Science: ${students[i].socialscience} | Science: ${students[i].sci} | Total: ${total} | Percentage: ${percentage}% (${grade})`,
              icon: 'success',
              confirmButtonText: 'Done'
          });
          searched.value = "";
      }
  }
  if (!found) {
      Swal.fire({
          icon: 'error',
          title: 'Error Finding Student',
          text: searched.value + ' is not in this list.',
      });
      searched.value = "";
  }
}

function newStudent() {
  Swal.fire({
      title: 'Enter Student Details and Marks',
      html:
          '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Roll Number">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Math">' +
          '<input id="swal-input4" class="swal2-input" placeholder="English">' +
          '<input id="swal-input5" class="swal2-input" placeholder="Social Science">' +
          '<input id="swal-input6" class="swal2-input" placeholder="Science">',
      focusConfirm: false,
      preConfirm: () => {
          const name = document.getElementById('swal-input1').value;
          const rollNumber = document.getElementById('swal-input2').value;
          const math = parseInt(document.getElementById('swal-input3').value);
          const eng = parseInt(document.getElementById('swal-input4').value);
          const socialscience = parseInt(document.getElementById('swal-input5').value);
          const sci = parseInt(document.getElementById('swal-input6').value);

          if (isNaN(maths) || isNaN(eng) || isNaN(socialscience) || isNaN(sci)) {
              Swal.fire({
                  icon: 'error',
                  title: 'Invalid Input',
                  text: 'Please enter numeric values for all subjects.',
              });
              return false;
          }

          return [name, rollNumber, maths, eng, socialscience, sci];
      }
  }).then((result) => {
      if (result.isConfirmed) {
          const formValues = result.value;
          const student = {
              name: formValues[0],
              rollNumber: parseInt(formValues[1]),
              maths: parseInt(formValues[2]),
              eng: parseInt(formValues[3]),
              socialscience: parseInt(formValues[4]),
              sci: parseInt(formValues[5]),
          };

          students.push(student);
          const index = students.length - 1;
          let total = student.maths + student.eng + student.socialscience + student.sci;
          let percentage = ((total / 400) * 100).toFixed(2);
          let grade = getGrade(percentage);
          main.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.rollNumber}</td>
          <td>${student.maths}</td>
          <td>${student.eng}</td>
          <td>${student.socialscience}</td>
          <td>${student.sci}</td>
          <td>${total}</td>
          <td>${percentage}% (${grade})</td>
          <td><input type="button" class="delBtn" value="Delete" onclick="deleteRow(this)"></td>
        </tr>
      `;
      }
  });
}

// Function to calculate grade
function getGrade(percentage) {
  if (percentage > 90) return 'Outstanding';
  else if (percentage > 80) return 'Excellent';
  else if (percentage > 70) return 'Very Good';
  else if (percentage > 60) return 'Good';
  else if (percentage > 50) return 'Fair';
  else if (percentage > 40) return 'Pass';
  else return 'Fail';
}

// Delete Function
function deleteRow(r) {
  if (confirm('Are you sure to delete this record?')) {
      var i = r.parentNode.parentNode.rowIndex;
      document.getElementById("table").deleteRow(i);
  }
}
