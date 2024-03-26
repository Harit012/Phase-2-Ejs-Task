async function search() {
  let search = document.getElementById("searchBar").value;

  let paginationBtn = document.querySelectorAll(".pagination-btn");
  //   for search pagination
  console.log(paginationBtn);

  paginationBtn.forEach((btn) => {
    if (btn.id.includes("prv")) {
      console.log(`${btn}`);

      btn.id = "serprv-0";
      btn.classList.remove("pagination-btn");
      btn.classList.add("searchPagination-btn");
    }
    if (btn.id.includes("nxt")) {
      console.log(`${btn}`);
      btn.id = "sernxt-0";
      btn.classList.remove("pagination-btn");
      btn.classList.add("searchPagination-btn");
    }
  });

  let fetchReq = await fetch("/searchUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: search, page: 0 }),
  });
  fetchReq = await fetchReq.json().then((fetchReq) => {
    let htmlString = ``;
    let array = fetchReq.userdata;
    if (fetchReq.userNotFound) {
      htmlString = `<h1>No Data Found</h1>`;
      $("#data-body").html(htmlString);

      return ;
    }
    for (data of array) {
      htmlString += `
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
    }
    $("#data-body").html(htmlString);
  });
}
