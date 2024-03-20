$(document).ready(function (e) {
  const buttons = document.querySelectorAll(".edit-btn");

  // to select which button clicked
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const buttonValue = this.parentNode.id;

      console.log(`Button with value ${buttonValue} was clicked`);

      let namee = $(`div[id=${buttonValue}]`).find("#Edname").text().trim();
      let phone = $(`div[id=${buttonValue}]`).find("#Edphone").text().trim();
      let email = $(`div[id=${buttonValue}]`).find("#Edemail").text().trim();
      let profile = $(`div[id=${buttonValue}]`)
        .find("#Edprofile")
        .text()
        .trim();
      profile = profile.slice(20, profile.length + 1);
      console.log(profile);

      $("#user-form").attr({
        id: "update-form",
        method: "put",
        enctype: "multipart/form-data",
      });
      $("#formSubmitBtn").attr({ id: "formUpdateBtn", type: "submit" });
      $("#form-title").text("Edit User");
      $("#formUpdateBtn").text("Update User");
      document.getElementById("userProfile").removeAttribute("required");

      // $("#formResetBtn").on("click", function (e) {
      //   $("#update-form")[0].reset();
      //   $("#update-form").attr({
      //     id: "user-form",
      //     method: "post",
      //     enctype: "multipart/form-data",
      //   });
      //   $("#form-title").text("User Registration Form");
      //   $("#formUpdateBtn").text("Add User");
      //   $("#insertedFile").text(" ");
      // });
      // to fill form data
      $("#username").val(namee);
      $("#email").val(email);
      $("#phone").val(phone);
      // $('#profilePicture').file()
      $("#insertedFile").text(`Selected :- ${profile}`);

      $("#formUpdateBtn").on("click", async function (e) {
        console.log("update form submited");

        e.preventDefault();
        namee = $("#username").val();
        email = $("#email").val();
        phone = $("#phone").val();
        // let formData = new FormData();
        // // const fd = new FormData(document.querySelector("#update-form"));
        // formData.append("_id", buttonValue.slice(11, buttonValue.length));
        // formData.append("username", $("#username").val());
        // formData.append("email", $("#email").val());
        // formData.append("phone", $("#phone").val());
        // if (
        //   $("#userProfile").prop("files")[0] != null ||
        //   $("#userProfile").prop("files")[0] != undefined
        // ) {
        //   fd.append("userProfile", $("#userProfile").prop("files")[0]);
        // }
        let formData = {
          username: `${namee}`,
          _id: `${buttonValue.slice(11, buttonValue.length)}`,
          email: `${email}`,
          phone: `${phone}`,
        };
        console.log(JSON.stringify(formData));

        // let data = await fetch("/editUser", {
        //   method: "Put",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   dataType: "json",
        //   data : JSON.stringify(formData), //JSON.stringify(formData),
        // });
        // data = await data.json();
        // console.log(data);
        const xhs = new XMLHttpRequest();
        xhs.open("PUT", "/editUser", true);
        xhs.setRequestHeader("Content-Type", "application/json");
        xhs.send(JSON.stringify(formData));
        xhs.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
        xhs.onload = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
      });
    });
  });
});
