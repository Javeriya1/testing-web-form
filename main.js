// Document is ready
$(document).ready(function () {
  $(".loader").hide();
  // Validate Username
  $("#usercheck").hide();
  var usernameError = true;
  $("#fname").on("keydown", function (e) {
    var usernameValue = $("#fname").val().trim();
    // Check if you already have 50 characters (but allow 'backspace' and 'del' keys).
    if (e.keyCode != 8 && e.keyCode != 46 && $("#fname").val().length >= 50) {
      return false; // This will make the new character to be ignored.
    }
  });

  //validate email
  $("#emailcheck").hide();
  var useremailError = true;
  $("#email").keyup(function () {
    validateEmail();
  });

  $("#phonecheck").hide();
  var userphoneError = true;
  $("#phone").each(function () {
    $(this).on("change keyup paste", function (e) {
      var output,
        $this = $(this),
        input = $this.val();

      if (e.keyCode != 8) {
        input = input.replace(/[^0-9]/g, "");
        var area = input.substr(0, 3);
        var pre = input.substr(3, 3);
        var tel = input.substr(6, 4);
        if (area.length < 3) {
          output = "(" + area;
        } else if (area.length == 3 && pre.length < 3) {
          output = "(" + area + ")" + " " + pre;
        } else if (area.length == 3 && pre.length == 3) {
          output = "(" + area + ")" + " " + pre + "-" + tel;
        }
        $this.val(output);
      }
      var phoneValue = $("#phone").val();
      validatePhone(phoneValue);
    });
  });

  //validate registration number
  $("#regcheck").hide();
  var userregError = true;
  $("#reg").keyup(function () {
    validateRegistration();
  });

  //get cookie
  var userCheckboxError = true;
  if (document.cookie == "") {
    // console.log("no cookies found");
  } else {
    usernameError = false;
    useremailError = false;
    var allCookie = document.cookie.split(";");
	
    let nameSplit = allCookie[0];
	let emailSplit = allCookie[1];
   
    let nameSplit1 = nameSplit.split("=");
    let emailsplit1 = emailSplit.split("=");

    $("#fname").val(nameSplit1[1]);
    $("#email").val(emailsplit1[1]);
  }

  //validate image

  function checkForEnable() {
    $("#result").hide();
    if (
      !usernameError &&
      !useremailError &&
      !userregError &&
      !userCheckboxError &&
      !imageUploadDoneError &&
      !userphoneError &&
      !captchaError
    ) {
      enableButton();
    } else {
      disableButton();
    }
  }
  //username
  function validateUsername() {
    var re = /[A-Za-z]+/;
    var usernameValue = $("#fname").val().trim();
    // console.log(usernameValue.length)
    if (usernameValue.length == 0) {
      $("#fname").css("border", "1px solid red");
      $("#usercheck").html("**Username missing");
      $("#usercheck").show();
      usernameError = true;
    } else if (usernameValue.length < 3) {
      $("#fname").css("border", "1px solid lightgrey");
      $("#usercheck").show();
      $("#usercheck").html(
        "**Length of Username must be more than 3 characters"
      );
      usernameError = true;
    } else if (!re.test($("#fname").val())) {
      $("#fname").css("border", "1px solid red");
      $("#usercheck").html("**Please enter Characters only");
      $("#usercheck").show();
      usernameError = true;
    } else {
      $("#fname").css("border", "1px solid lightgrey");
      $("#usercheck").hide();
      usernameError = false;
    }
    checkForEnable();
  }

  //email
  function validateEmail() {
    var useremailValue = $("#email").val().trim();

    // var reg = /^[^ ]+@[^]$/;
    var reg = /^[^ ]+@[^ ]+\.[a-z]{1,10}$/;
    if (useremailValue.length == 0) {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").html("**Email address missing");
      $("#emailcheck").show();
      useremailError = true;
    } else if (reg.test(useremailValue)) {
      $("#email").css("border", "1px solid lightgrey");
      $("#emailcheck").hide();
      useremailError = false;
    } else {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").show();

      $("#emailcheck").html("**Please enter valid email");
      useremailError = true;
    }
    checkForEnable();
  }

  //phone
  function validatePhone(str) {
    var phoneValue = $("#phone").val();
    var a =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s){1,1}?(\d{3})(\-|\s){1,1}?(\d{4})$/.test(
        str
      );
    // var a=/^\(?([0-9]{3})\)?(\-|\s){1,1}?([0-9]{3})?(\-|\s){1,1}?([0-9]{4})$/.test(str);
    var re = /[A-Za-z]+/;
    var maxlength = 14;

    if (phoneValue.length == 0) {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**Phone number missing");
      $("#phonecheck").show();
      userphoneError = true;
    } else if (re.test(str.trim())) {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**allow only numbers");
      $("#phonecheck").show();
      userphoneError = true;
    } else if (a == false) {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**Please enter the correct phone number");
      $("#phonecheck").show();
      userphoneError = true;
    } else {
      $("#phone").css("border", "1px solid lightgrey");
      $("#phonecheck").hide();
      userphoneError = false;
    }
    checkForEnable();
  }

  //validate registration number
  function validateRegistration() {
    var regValue = $("#reg").val().trim();
    var re = /[!@#$%^&*()?<>:.,{}|/\-=+_;"'`~\\[\]]+/;

    if (regValue.length == 0) {
      $("#reg").css("border", "1px solid red");
      $("#regcheck").html("**Registration number missing");
      $("#regcheck").show();
      userregError = true;
    } else if (regValue.indexOf(" ") >= 0) {
      $("#reg").css("border", "1px solid red");
      $("#regcheck").html("**Please enter the correct Registration number");
      $("#regcheck").show();
      userregError = true;
    } else if (re.test($("#reg").val().trim())) {
      $("#reg").css("border", "1px solid red");
      $("#regcheck").html("**Please enter Numeric values only");
      $("#regcheck").show();
      userregError = true;
    } else {
      $("#reg").css("border", "1px solid lightgrey");
      $("#regcheck").hide();
      userregError = false;
    }
    checkForEnable();
  }

  function enableButton() {
    $("#mybtn").prop("disabled", false); // enable the submit button
    $("#mybtn").css({ opacity: "1" }); // make the submit button look enabled
  }

  function disableButton() {
    $("#mybtn").prop("disabled", true); // disable the submit button
    $("#mybtn").css({ opacity: "0.5" }); // make the submit button look dsiabled
  }

  //for Image
  var pic;
  var imgSize;
  var imageUploadDoneError = true;
  document
    .getElementById("fileUpload")
    .addEventListener("change", ImageSelection);

  function ImageSelection(e) {
    var fileExtension = ["jpeg", "jpg", "png", "gif", "bmp"];

    if (
      $.inArray($(this).val().split(".").pop().toLowerCase(), fileExtension) ==
      -1
    ) {
      return;
    }

    pic = e.target.value;

    if (pic != undefined) {
      let str1 = pic.slice(12, 25);
      let str2 = pic.slice(pic.length - 8);

      imgSize = e.target.files[0].size / (1024 * 1024);

      if (imgSize <= 3 && pic != "") {
        $("#fileSelected").html(str1 + "..." + str2);

        imageUploadDoneError = false;
        $("#uploading").hide();

        checkForEnable();
      } else {
        $("#fileSelected").html(pic);
        $("#uploading").html("Photo size is too large");
        $("#uploading").css("color", "red");
        $("#uploading").show();

        imageUploadDoneError = true;
        checkForEnable();
      }
    }
  }
  //validate all fields length
  function InputCheck() {
    var x = document.getElementById("check").checked;
    var age1 = document.getElementById("age1").checked;
    var age2 = document.getElementById("age2").checked;

    if (x == true && (age1 == true || age2 == true)) {
      return false;
    } else {
      return true;
    }
  }

  //for checkbox and radio button
  $("#memoForm").click("input", () => {
    if (!InputCheck()) {
      userCheckboxError = false;
    } else {
      userCheckboxError = true;
    }
    checkForEnable();
  });

  // create blur event

  $("input").blur(function (event) {
    if (event.target.value.length == 0) {
      event.target.style.borderColor = "red";
      validateUsername();
    } else {
      validateUsername();
      event.target.style.borderColor = "lightgrey";
    }
  });

  //captcha
  var captchaError = true;
  $("#captchacheck").hide();
  var sum;
  let data1 = Math.round(10 * Math.random());
  let data2 = Math.round(10 * Math.random());
  let str = ` ${data1}+${data2}=?`;
  $("#captcha").html(str);

  $("#captcha").css({
    "font-size": "200%",
    "font-weight": "bold",
    "text-align": "center",
  });
  sum = data1 + data2;
  $("#texts").keyup(function () {
    validateCaptcha();
  });

  function validateCaptcha() {
    var textValue = $("#texts").val();

    if (textValue.length == 0) {
      $("#texts").css("border", "1px solid red");
      $("#captchacheck").html("**Please Fill the Answer");
      $("#captchacheck").show();
      captchaError = true;
    } else if (textValue == sum) {
      // $("#captchacheck").html("Correct").fadeOut(1000);
      // $("#captchacheck").css("color", "green");
      $("#captchacheck").hide();
      $("#texts").css("border", "1px solid lightgrey");
      captchaError = false;
    } else {
      $("#captchacheck").html("Incorrect ");
      $("#captchacheck").css("color", "red");
      $("#texts").css("border", "1px solid red");
      $("#captchacheck").show();
      captchaError = true;
    }
    checkForEnable();
  }
  //store data in firebase
  function storeDataInFirebase() {
    var FirstName = $("#fname").val();
    var Email = $("#email").val();
    var Phone = $("#phone").val();
    var Registration_Number = $("#reg").val();
    var Age_Above_Sixteen = !document.getElementById("age1").checked;

	
	var image = document.getElementById("fileUpload").files[0];
	console.log(image);
	var imageName = image.name;
	var storageRef = storage.ref("/images/" + imageName);
	var uploadTask = storageRef.put(pic);

    db.collection("users")
      .doc()
      .set({
        FirstName: FirstName,
        Email: Email,
        Phone: Phone,
        Registration_Number: Registration_Number,
        Age_Above_Sixteen: Age_Above_Sixteen,
      })

      .then(() => {
		ImageSelection();
		uploadTask.snapshot.ref.getDownloadURL().then(
			function(downloadURL) {
		   console.log(downloadURL);
		}).catch(err => console.log(err));

        console.log("document written successfully");
		document.cookie = "name=" + FirstName;
		document.cookie = "email=" + Email;
	    var date = new Date();
		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
		document.cookie = "expires=" + date + ";"
        $(".loader").hide();
        window.location.href = "thankyouPage.html";
        $("#memoForm").trigger("reset");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  //read the data from firebase
  function getData() {
    var registrationNumber = $("#reg").val();
    var temp = [];

    db.collection("users")
      .get()
      .then((doc) => {
        doc.forEach((d) => {
          let currentData = d.data().Registration_Number;
          temp.push(currentData);
        });

        if (temp.includes(registrationNumber)) {
          $("#reg").css("border", "1px solid red");
          $("#regcheck").html("**Registration number already exist");
          $("#regcheck").show();
		  $(".loader").fadeOut();
          userregError = true;
        } else {
          $("#reg").css("border", "1px solid lightgrey");
          $("#regcheck").hide();
          userregError = false;
          storeDataInFirebase();
        }
      });
    checkForEnable();
  }

  $("#mybtn").click(function (e) {
    e.preventDefault();
    $(".loader").show();
    getData();
  });
});
