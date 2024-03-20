function run() {
  const ebuttons = document.querySelectorAll(".edit-btn");
  const dbuttons = document.querySelectorAll(".delete-btn");
  // to select which button clicked
  ebuttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      var buttonValue = this.parentNode.id;
      const boxnode = this.parentNode.parentNode;
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
      $("#formSubmitBtn").attr({ 'id' :"formUpdateBtn" });
      $("#form-title").text("Edit User");
      $("#formUpdateBtn").text("Update User");
      document.getElementById("userProfile").removeAttribute("required");

      $("#formResetBtn").on("click", function (e) {
        $("#update-form")[0].reset();
        $("#update-form").attr({
          id: "user-form",
          method: "post",
          enctype: "multipart/form-data",
        });
        $("#form-title").text("User Registration Form");
        $("#formUpdateBtn").text("Add User");
        $('#formUpdateBtn').attr({ id: "formSubmitBtn"});
        $("#insertedFile").text(" ");
      });
      // to fill form data
      $("#username").val(namee);
      $("#email").val(email);
      $("#phone").val(phone);
      // $('#profilePicture').file()
      $("#insertedFile").text(`Selected :- ${profile}`);
    });
  });
  dbuttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const buttonValue = this.parentNode.id;
      const boxnode = this.parentNode.parentNode;
      console.log(boxnode);

      //   console.log(`Button with value ${buttonValue} was clicked`);
      const id = $(`div[id=${buttonValue}]`).find("#id").val();
      let email = $(`div[id=${buttonValue}]`).find("#Edemail").text().trim();
      console.log(id);
      console.log(email);

      $.ajax({
        url: "/deleteUser",
        type: "DELETE",
        data: { _id: id, email: email },
        success: function (data) {
          console.log(data);
          boxnode.remove();
        },
      });
    });
  });
}

// $(document).ready(function (e) {
//   run();
//   $("#formUpdateBtn").on("click", async function (e) {
    
//         e.preventDefault();
//         namee = $("#username").val();
//         email = $("#email").val();
//         phone = $("#phone").val();
//         let formData = new FormData(document.querySelector('#update-form'));
//         // const fd = new FormData(document.querySelector("#update-form"));
//         // formData.append("_id", buttonValue.slice(11, buttonValue.length));
//         // formData.append("username", $("#username").val());
//         // formData.append("email", $("#email").val());
//         // formData.append("phone", $("#phone").val());
//         // if (
//         //   $("#userProfile").prop("files")[0] != null ||
//         //   $("#userProfile").prop("files")[0] != undefined
//         // ) {
//         //   formData.append("userProfile", $("#userProfile").prop("files")[0]);
//         // }
//         console.log(JSON.stringify(formData));

//         // let formData = {
//         //   username: `${namee}`,
//         //   _id: `${buttonValue.slice(11, buttonValue.length)}`,
//         //   email: `${email}`,
//         //   phone: `${phone}`,
//         // };
//         // console.log(JSON.stringify(formData));

//         // let data = await fetch("/editUser", {
//         //   method: "Put",
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //   },
//         //   dataType: "json",
//         //   data : JSON.stringify(formData), //JSON.stringify(formData),
//         // });
//         // data = await data.json();
//         // console.log(data);
//         const xhs = new XMLHttpRequest();
//         xhs.open("PUT", "/editUser", true);
//         // xhs.setRequestHeader("Content-Type", "application/json");
//         // xhs.send(JSON.stringify(formData));
//         xhs.setRequestHeader("Content-Type", "multipart/form-data");
//         xhs.send(formData);
//         xhs.onreadystatechange = function () {
//           if (this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//           }
//         };
//         xhs.onload = function () {
//           if (this.readyState == 4 && this.status == 200) {
//             let data = JSON.parse(this.response);

//             boxnode.innerHTML = `
//                         <div class="inBoxLeft" style="display: flex;">
//                             <div class="profilePicture"
//                                 style="height: 100px;width: 100px;border-radius: 50%;margin: 20px;background-size: cover;background-image: url('${data.profileImage}');">
//                         </div>
//                         <div style="width: 75px;"></div>
//                         <div class="profileDetails" style="position: relative;top: 20px;">
//                             <h3 id="d_name" style="margin-top: 5%;">
//                                 ${data.username}
//                             </h3>
//                             <p id="d_email" style="margin-top: 5%;">
//                                 ${data.email}
//                             </p>
//                             <p id="d_phone" style="margin-top: 5%;">
//                                 ${data.phone}
//                             </p>
//                         </div>
//                     </div>

//                     <div class="inBoxRight" id="inBoxRight-${data._id}">
                    
//                     <p id="id" name="id" hidden>${data._id}}</p>
//                     <p id="Edname" hidden>${data.username}</p>
//                     <p id="Edemail" hidden>${data.email}</p>
//                     <p id="Edphone" hidden>${data.phone}</p>
//                     <p id="Edprofile" hidden>${data.profileImage}</p>
//                     <button class="edit-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color: rgb(74, 101, 206);color: azure;font-size: 1.2">edit</button>

//                     <button class="delete-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color:red;color: azure;font-size: 1.2">delete</button>

//                     </div>
//                 </div>
//               `;
//             $("#update-form")[0].reset();
//             $("#update-form").attr({
//               id: "user-form",
//               method: "post",
//               enctype: "multipart/form-data",
//             });
//             $("#form-title").text("User Registration Form");
//             $("#formUpdateBtn").text("Add User");
//             $("#insertedFile").text(" ");
//           }
//         };
//         run();
//       });
//     });
  
      run();
$(document).on("click", "#formUpdateBtn", function (e) {
  e.preventDefault();
  
  // const boxnode = document.querySelector(".box");
  // const element = document.querySelector('#');
  // const buttonValue = element.innerHTML.trim();
  // console.log(`the button value is :- ${buttonValue}`);
  
  namee = $("#username").val();
  email = $("#email").val();
  phone = $("#phone").val();
  let formData = new FormData(document.querySelector('#update-form'));
  // formData.append('id', buttonValue.slice(11, buttonValue.length));
  // console.log(buttonValue.slice(11, buttonValue.length));
  // const fd = new FormData(document.querySelector("#update-form"));
  // formData.append("_id", buttonValue.slice(11, buttonValue.length));
  // formData.append("username", $("#username").val());
  // formData.append("email", $("#email").val());
  // formData.append("phone", $("#phone").val());
  // if (
  //   $("#userProfile").prop("files")[0] != null ||
  //   $("#userProfile").prop("files")[0] != undefined
  // ) {
  //   formData.append("userProfile", $("#userProfile").prop("files")[0]);
  // }
  // console.log(JSON.stringify(formData));

  
  const xhs = new XMLHttpRequest();
  xhs.open("PUT", "/editUser", true);
  xhs.send(formData);

  xhs.onload = function (response) {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      // let data = JSON.parse(response);
      data = JSON.parse(this.responseText);
      boxnode.innerHTML = `
                  <div class="inBoxLeft" style="display: flex;">
                      <div class="profilePicture"
                          style="height: 100px;width: 100px;border-radius: 50%;margin: 20px;background-size: cover;background-image: url('${data.profileImage}');">
                  </div>
                  <div style="width: 75px;"></div>
                  <div class="profileDetails" style="position: relative;top: 20px;">
                      <h3 id="d_name" style="margin-top: 5%;">
                          ${data.username}
                      </h3>
                      <p id="d_email" style="margin-top: 5%;">
                          ${data.email}
                      </p>
                      <p id="d_phone" style="margin-top: 5%;">
                          ${data.phone}
                      </p>
                  </div>
              </div>

              <div class="inBoxRight" id="inBoxRight-${data._id}">
              
              <p id="id" name="id" hidden>${data._id}}</p>
              <p id="Edname" hidden>${data.username}</p>
              <p id="Edemail" hidden>${data.email}</p>
              <p id="Edphone" hidden>${data.phone}</p>
              <p id="Edprofile" hidden>${data.profileImage}</p>
              <button class="edit-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color: rgb(74, 101, 206);color: azure;font-size: 1.2">edit</button>

              <button class="delete-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color:red;color: azure;font-size: 1.2">delete</button>

              </div>
          </div>
        `;
      $("#update-form")[0].reset();
      $("#update-form").attr({
        id: "user-form",
        method: "post",
        enctype: "multipart/form-data",
      });
      $("#form-title").text("User Registration Form");
      $("#formUpdateBtn").text("Add User");
      $("#insertedFile").text(" ");
    }
  };
  run();
});