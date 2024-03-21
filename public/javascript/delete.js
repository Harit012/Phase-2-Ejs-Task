$(document).on("click", ".delete-btn", function (e) {
  var boxnode = e.target.parentNode.parentNode;
  var id = e.target.parentNode.id;
  id = id.slice(11, id.length + 1);
  $.ajax({
    url: "/deleteUser",
    type: "DELETE",
    data: { id: id },
    success: function (data) {
      console.log(data);
      boxnode.remove();
    },
  });
});
