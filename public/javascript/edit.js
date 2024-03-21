$(document).on("click", ".edit-btn", function (e) {
  $("#user-form").attr({
    id: "update-form",
    method: "put",
    enctype: "multipart/form-data",
  });
  $("#formSubmitBtn").attr({ id: "formUpdateBtn" });
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
  });
  var boxnode = e.target.parentNode.parentNode;
  var id = e.target.parentNode.id;
  let name = e.target.parentNode.querySelector("#Edname").textContent.trim();
  let phone = e.target.parentNode.querySelector("#Edphone").textContent.trim();
  let email = e.target.parentNode.querySelector("#Edemail").textContent.trim();
  let profile = e.target.parentNode
    .querySelector("#Edprofile")
    .textContent.trim();
  id = id.slice(11, id.length + 1);
  let imagename = profile.slice(20, profile.length + 1);
  console.log(name);

  $("#username").val(name);
  $("#phone").val(phone);
  $("#email").val(email);
  $("#insertedFile").text(imagename);

  $("#formUpdateBtn").on("click", async function (e) {
    e.preventDefault();
    const fd = new FormData(document.querySelector("#update-form"));
    fd.append("id", id);
    fd.append("image", profile)

    console.log(fd);

    const xhs = new XMLHttpRequest();
    xhs.open("PUT", "/editUser", true);
    xhs.send(fd);

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
        $("#userProfile").attr("required", "required");
        $("#formUpdateBtn").attr({ id: "formSubmitBtn" });
      }
    };
  });
});
