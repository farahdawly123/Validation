var stuName =document.getElementById('studentName');
var stuAge =document.getElementById('studentAge');
var stuGender =document.getElementById('studentGender');
var stuMail =document.getElementById('studentEmail');
var stuInfo =document.getElementById('studentInfo');
var addBtn = document.getElementById('addBtn');
var tableData= document.getElementById('tableData');
var currentIndex=0;
var students=[];
var inputs=document.getElementsByClassName('form-control');
var search=document.getElementById('searchInput');
var alertName =document.getElementById('alertName');
/*update */

if(JSON.parse(localStorage.getItem('studentsList'))!=null){
students=JSON.parse(localStorage.getItem('studentsList'));
displayStudent();

}



/*button onclick to do:... */
addBtn.onclick =function(){

    /*عشان يغير ال بتن بعد ما اعمل ابديت انه يبقا ادد  */

    if(addBtn.innerHTML=="ADD"){
        addStudent();
    }
    else{
        updateStudent();
    }

    displayStudent();
    clearForm();
}

/* adding new student to array of object */
function addStudent(){
   var student={
        name:stuName.value,
        age:stuAge.value,
        Gender:stuGender.value,
        email:stuMail.value,
        description:stuInfo.value
    }
    students.push(student);

   localStorage.setItem('studentsList',JSON.stringify(students)) ;

}

/* displaying data on table  */
function displayStudent(){
    var box='';
    for(var i=0 ; i<students.length ;i++){
     box+=`
     <tr>
        <td>${students[i].name}</td>
        <td>${students[i].age}</td>
        <td>${students[i].email}</td>
        <td>${students[i].Gender}</td>
        <td>${students[i].description}</td>
        <td><button class=' btn btn-info' onclick="deleteStudent(${i})">Delete</button></td>
        <td><button class=' btn btn-light' onclick="sendIndex(${i})" >Update</button></td>
     </tr>
        `
      
    }
    
    tableData.innerHTML=box;

}
/*deleting student : bnakhod mn el onclish bta3 el button el index eli etdas 3leh w b3ten nb3to ll function di 34an nms7o fa bnstkhdm splice bdl pop 34an ana msh 3arfa hwa shawr 3la anhi index bzbt w b3den brg3 a3ml display 34an el array 3ndi etghyr fa bttms7 mn el gdwal */

function deleteStudent(index){
students.splice(index,1);
localStorage.setItem('studentsList',JSON.stringify(students)) ;
displayStudent();

}

function clearForm(){
    for(var i=0 ;i<inputs.length ; i++){
        inputs[i].value='';
    }
}

/*onkeyup لما اشيل ايدي من علي الزرار */
/*onkeydown اول ما ادوس */
/*onkeypress طول ما انا دايس علي الزرار */
/*this هتجيبلي ال element  */

/*search*/
search.onkeyup= function(){
    var box='';
    for(var i=0 ; i<students.length ; i++){
        if(students[i].name.toLowerCase().includes(search.value.toLowerCase())){
     box+=`
     <tr>
        <td>${students[i].name}</td>
        <td>${students[i].age}</td>
        <td>${students[i].email}</td>
        <td>${students[i].Gender}</td>
        <td>${students[i].description}</td>
        <td><button class=' btn btn-info' onclick="deleteStudent(${i})">Delete</button></td>
        <td><button class=' btn btn-light' onclick="sendIndex(${i})" >Update</button></td>
     </tr>
        `
        tableData.innerHTML=box;
    }
   
}
}

/*update 
1- في 2 فنكشنز واحده منهم هتعرضلي الداتا فالانبتس تاني والتانيه هتغيرلي الحاجه الي طلعت وتابديت نفس الاندكس 
2- هعمل كرنت انديكس عشان اعرف انا هابديت انهي واحد فالفانكشن التانيه وخليتها جلوبال عشان الاتنين يشوفوا نفس الحاجه الاولي هيتبعتلها بارامتر وهاسين البرارمتر دا للكرانت انديكس والتانيه هتاخد الكرنت انديكس تشتغل عليه 



*/


function sendIndex(index){
currentIndex=index;
var currentStudent=students[index];
stuName.value=currentStudent.name;
stuAge.value=currentStudent.age;
stuGender.value=currentStudent.Gender;
stuMail.value=currentStudent.email;
stuInfo.value=currentStudent.description;

addBtn.innerHTML="update"
}


function updateStudent(){
    /*كدا انا عامله فوق انه هايابديت عشان البوتن مكتوب ابديت فا لازم اعمل لنفس الانديكس ادد تاني بالداتا الجديده */
    var student={
        name:stuName.value,
        age:stuAge.value,
        Gender:stuGender.value,
        email:stuMail.value,
        description:stuInfo.value
    }

    students[currentIndex]=student;
    localStorage.setItem('studentsList',JSON.stringify(students)) ;
    addBtn.innerHTML="ADD"
}


/*validation */
/*rejex101 website */

function validateInput(input,regex){

    if(regex.test(input.value)){    //valid

        addBtn.removeAttribute("disabled");
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        alertName.classList.add('d-none')
       }
       else{

        //invalid
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        alertName.classList.remove('d-none')

       }
}
stuName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{3,8}$/;
validateInput(stuName,nameRejex)
}




