
const radiosGender = document.getElementsByName('gender');
const radiosAge = document.getElementsByName('age');
const userName = $("#userName");
let userNameInput = "";
let genderValInput = "";
let ageGroupInput = "";
var scoreArr = [];
var scoreArr2 = [];


let validateAndStore = {

    validateName: function eval() {
        if (/[^a-zA-Z0-9\-\/]/.test(userName.val())) {
            alert('Input is not alphanumeric');
            return $("#userName").focus();
        }
        if (userName.val().length === 0) {
            alert("Username us not valid");

            return $("#userName").focus();
        } else if (userName.val().length > 20) {
            alert("Username has too many characters");
            return $("#userName").focus();
        }
        userNameInput = userName.val().trim().replace(/\s+/g, '');

        validateAndStore.validateGender();

    },

    validateGender: function eval() {
        for (let i = 0, length = radiosGender.length; i < length; i++) {

            if (radiosGender[i].checked) {
                // store checked radio value in global variable for later use

                genderValInput = radiosGender[i].value;
                console.log(genderValInput)

                // if input is good go to age validation
                validateAndStore.validateAge();

            }
        } if (genderValInput === "") {
            alert('choose a gender'); $("#button-gender").focus();
        }

    },

    validateAge: function eval() {
        for (let i = 0, length = radiosAge.length; i < length; i++) {
            if (radiosAge[i].checked) {
                // do whatever you want with the checked radio
                ageGroupInput = radiosAge[i].value;
                console.log(ageGroupInput)
                validateAndStore.nextpage();
                break;

            }
        } if (ageGroupInput === "") {
            alert('You must choose an age group.'); $("#button-age").focus();
        }
    },
    nextpage: function next() {
        $("#next").data("value", "secondpage");

        $.ajax({
            type: "POST",
            url: "/survey000",
            data: { userNameInput, genderValInput, ageGroupInput },
            dataType: "json"

        });
        window.location.href = "/survey1";



    },
    //score function checks all my first four questions and pushes the result in order to scoreArr (loop d loop)
    question1234: function score() {
        scoreArr = [];
        for (i = 1; i < 5; i++) {

            for (let j = 1; j < 6; j++) {

                question = $("#question" + [i] + [j]);


                if ($("#question" + [i] + [j]).is(':checked')) {
                    // do whatever you want with the checked radio
                    question[i] = $("#question" + [i] + [j]).val();
                    scoreArr.push(question[i]);
                    number = i + 1;
                }
            }
            // validation of all questions answered, highlight next question to be answered
        } if (scoreArr.length < 4) {
            alert("You must answer all questions to proceed"); scoreArr = []; $(".word" + [number]).focus();
        } if (scoreArr.length === 4) {
            console.log(scoreArr)

            scoreArr.forEach(element => {



                $.ajax({
                    type: "POST",
                    url: "/survey111",
                    data: { score: element },
                    dataType: "json"

                });
            });

            window.location.href = "/survey2";
        }


    }, question5678: function score() {
        scoreArr2 = [];

        //code loops 4* for each question in form
        for (i = 5; i < 9; i++) {
            // code loops 5 times for each answer in each question checking if that question is checked
            for (let j = 1; j < 6; j++) {

                question = $("#question" + [i] + [j]);


                if ($("#question" + [i] + [j]).is(':checked')) {
                    // do whatever you want with the checked radio
                    question[i] = $("#question" + [i] + [j]).val();

                    // if qanswer is checked push that value to array
                    scoreArr2.push(question[i]);
                    number = i - 3;
                }
            }
            // validation of all questions answered, highlight next question to be answered
        } if (scoreArr2.length < 4) {
            alert("You must answer all questions to proceed"); scoreArr2 = []; $(".word" + [number]).focus();
        } if (scoreArr2.length === 4) {
            scoreArr2.forEach(element => {

                $.ajax({
                    type: "POST",
                    url: "/survey111",
                    data: { score: element },
                    dataType: "json"

                });
            });



            window.location.href = "/survey3";
        }


    }


}
$("#submit").click(function () {
    userPic = $("#userImg").attr("src")
    //   console.log(friend)


    $("#opClass").fadeTo("fast", 1);
    $.ajax({
        type: "POST",
        url: "/survey333",
        data: { pic: userPic },
        dataType: "json"

    });

    // analyze user profile against other profiles and post match
    $.get("/survey33", function (data) {

        matchedGender = []

        var accounts = [];
        var accountsMatched = []
        for (k = 0; k < data.friend.length - 1; k++) {

            // console.log(data.friend[i]);
            if (data.friend[k].scores[0] != data.friend[data.friend.length - 1].scores[0]) {
                // console.log(data.friend[data.friend.length-1].scores[0])
                // // console.log("friend not my gender")
                matchedGender.push(data.friend[k])
            }
        }
        console.log(matchedGender)
        console.log(matchedGender.length)
        console.log(matchedGender[0].scores)
        for (var i = 0; i < matchedGender.length; i++) {
            accounts[i] = [];
            for (j = 2; j < matchedGender[i].scores.length; j++) {
                //      console.log(data.friend[i].scores[j]+ "all friends not my gender scores 3-8")
                // array for holding differences of each members score

                //    console.log (data.friend[i].scores[j])
                number = (Math.abs(data.friend[data.friend.length - 1].scores[j])) - (Math.abs(matchedGender[i].scores[j]));
                //    console.log(number)
                accounts[i].push(Math.abs(number))

            };
            accountsMatched.push(accounts[i].reduce((a, b) => a + b, 0));

            console.log(matchedGender)

        }
        console.log(accountsMatched);
        // console.log(indexMatch)



        indexMatch = Math.min(...accountsMatched);
        userMatchIndex = accountsMatched.indexOf(indexMatch);
        $("#matchImg").attr("src", matchedGender[userMatchIndex].photo);
        $("#displayMatchText").text(matchedGender[userMatchIndex].name + ", cannot wait to meet you!")
        $("#userName").text(data.friend[data.friend.length - 1].name)
        $("#matchName").text(matchedGender[userMatchIndex].name)

        // console.log(accountsMatched)
        console.log(indexMatch)
        console.log(userMatchIndex)
    });


})


$("#next").click(function () {
    if ($(this).data("value") === "firstPage") {
        validateAndStore.validateName();

    }
    if ($(this).data("value") === "secondPage") {
        validateAndStore.question1234();

    } if ($(this).data("value") === "thirdPage") {
        validateAndStore.question5678();

    }
});
// $("#submit").click( function (){
//    validateAndStore.upload();

// });
$(document).ready(function () {
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
        
        
    });

    $('.btn-file :file').on('fileselect', function (event, label) {


        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#userImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }

    }

    $("#imgInp").change(function () {
        
        readURL(this);

    });
    // console.log(readURL(input))
});
