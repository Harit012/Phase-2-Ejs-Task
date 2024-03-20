function run() {
  const ebuttons = document.querySelectorAll(".edit-btn");
  const dbuttons = document.querySelectorAll(".delete-btn");
  // to select which button clicked
  ebuttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const buttonValue = this.parentNode.id;
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
      $("#formSubmitBtn").attr({ id: "formUpdateBtn", type: "submit" });
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
//   const submitBtn=documnet.querySelector("#formSubmitBtn");
//   submitBtn.on("click", async function (e) {
//     e.preventDefault();

//     const databody = document.querySelector("#data-body");
//     const fd = new FormData(document.querySelector("#user-form"));

//     let data = await fetch("/adduser", {
//       method: "post",
//       body: fd,
//     });
//     data = await data.json();

//     let htmlString = `
//     <div class="box"
//     style="width: auto;display: flex;justify-content: space-between;align-items: center;height: 7rem;border: 1px solid rgb(218, 217, 217);margin-top: 2%;margin-bottom: 2%;">
//     <div class="inBoxLeft" style="display: flex;">
//         <div class="profilePicture"
//             style="height: 100px;width: 100px;border-radius: 50%;margin: 20px;background-size: cover;background-image: url('${data.profileImage}');">
//         </div>
//         <div style="width: 75px;"></div>
//         <div class="profileDetails" style="position: relative;top: 20px;">
//             <h3 id="d_name" style="margin-top: 5%;">
//                 ${data.username}
//             </h3>
//             <p id="d_email" style="margin-top: 5%;">
//                 ${data.email}
//             </p>
//             <p id="d_phone" style="margin-top: 5%;">
//                 ${data.phone}
//             </p>
//         </div>
//     </div>

//     <div class="inBoxRight" id="inBoxRight-${data._id}">
    
//     <p id="id" name="id" hidden>${data._id}}</p>
//     <p id="Edname" hidden>${data.username}</p>
//     <p id="Edemail" hidden>${data.email}</p>
//     <p id="Edphone" hidden>${data.phone}</p>
//     <p id="Edprofile" hidden>${data.profileImage}</p>
//     <button class="edit-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color: rgb(74, 101, 206);color: azure;font-size: 1.2">edit</button>

//     <button class="delete-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color:red;color: azure;font-size: 1.2">delete</button>

//     </div>
// </div>
//     `;

//     if (databody.innerHTML.trim() === "<h1>No Data Found</h1>") {
//       databody.innerHTML = htmlString;
//       run();
//     } else {
//       databody.innerHTML += htmlString;
//       run();
//     }
    
//   });
// });

$(document).on("click", "#formSubmitBtn",async function (e) {
  run();
  e.preventDefault();

    const databody = document.querySelector("#data-body");
    const fd = new FormData(document.querySelector("#user-form"));

    let data = await fetch("/adduser", {
      method: "post",
      body: fd,
    });
    data = await data.json();

    let htmlString = `
    <div class="box"
    style="width: auto;display: flex;justify-content: space-between;align-items: center;height: 7rem;border: 1px solid rgb(218, 217, 217);margin-top: 2%;margin-bottom: 2%;">
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

    if (databody.innerHTML.trim() === "<h1>No Data Found</h1>") {
      databody.innerHTML = htmlString;
      run();
    } else {
      databody.innerHTML += htmlString;
      run();
    }
    
});