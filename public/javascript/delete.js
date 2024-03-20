

$(document).ready(function (e) {
    // run();

  const buttons = document.querySelectorAll(".delete-btn");
  buttons.forEach((button) => {
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
    // iife

  });
});
