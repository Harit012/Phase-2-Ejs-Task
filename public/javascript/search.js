async function search() {
  let search = document.getElementById("searchBar").value;
  let previousHtml = $("#data-body").html();

  let fetchReq = await fetch("/searchUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: search }),
  });
  fetchReq = await fetchReq.json().then((fetchReq) => {
    console.log(fetchReq);

    let htmlString = ``;
    for (let i = 0; i < fetchReq.length; i++) {
      htmlString += `
      <div class="box"
      style="width: auto;display: flex;justify-content: space-between;align-items: center;height: 7rem;border: 1px solid rgb(218, 217, 217);margin-top: 2%;margin-bottom: 2%;">
      <div class="inBoxLeft" style="display: flex;">
          <div class="profilePicture"
              style="height: 100px;width: 100px;border-radius: 50%;margin: 20px;background-size: cover;background-image: url('${fetchReq[i].profileImage}');">
          </div>
          <div style="width: 75px;"></div>
          <div class="profileDetails" style="position: relative;top: 20px;">
              <h3 id="d_name" style="margin-top: 5%;">
                  ${fetchReq[i].username}
              </h3>
              <p id="d_email" style="margin-top: 5%;">
                  ${fetchReq[i].email}
              </p>
              <p id="d_phone" style="margin-top: 5%;">
                  ${fetchReq[i].phone}
              </p>
          </div>
      </div>

      <div class="inBoxRight" id="inBoxRight-${fetchReq[i]._id}">
      
      <p id="id" name="id" hidden>${fetchReq[i]._id}}</p>
      <p id="Edname" hidden>${fetchReq[i].username}</p>
      <p id="Edemail" hidden>${fetchReq[i].email}</p>
      <p id="Edphone" hidden>${fetchReq[i].phone}</p>
      <p id="Edprofile" hidden>${fetchReq[i].profileImage}</p>
      <button class="edit-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color: rgb(74, 101, 206);color: azure;font-size: 1.2">edit</button>

      <button class="delete-btn" style="height: 2rem;width: 5rem;border-radius: 8%;background-color:red;color: azure;font-size: 1.2">delete</button>

      </div>
  </div>
                  `;
    }
    $("#data-body").html(htmlString);
  });
}
