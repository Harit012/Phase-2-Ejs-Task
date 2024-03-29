$(document).on("click", ".delete-btn", function (e) {
  var boxnode = e.target.parentNode.parentNode;
  var id = e.target.parentNode.id;
  var path  = e.target.parentNode.querySelector("#Edprofile").textContent.trim();
  console.log(path);
  
  id = id.slice(11, id.length + 1);
  $.ajax({
    url: "/deleteUser",
    type: "DELETE",
    data: { id: id, path:path },
    success: function (data) {
      console.log(data);
      boxnode.remove();
    },
  });
});
