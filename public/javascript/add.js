document
  .querySelector("#user-form")
  .addEventListener("submit", async function (e) {
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

    <div class="inBoxRight">
    <form id="edit-form" enctype="multipart/form-data">
    <input type="text" id="id" name="id" value="<%= user._id %>" hidden>
    <button typr="submit" class="edit-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color: rgb(74, 101, 206);color: azure;font-size: 1.2">edit</button>
</form>
<form id="delete-form" enctype="multipart/form-data">
    <input type="text" id="id" name="id" value="<%= user._id %>" hidden>
    <button typr="submit" class="delete-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color:red;color: azure;font-size: 1.2">delete</button>
</form>
    </div>
</div>
    `;

    databody.innerHTML += htmlString;

    (function clearForm() {
      $("#user-form")[0].reset();
    })();
  });