// $('document').ready(function (e) {
//     e.preventDefault();
//     $("#delete-form").on('submit',function () {
//         const id = $("#id").val();
//         // window.location.href = `/delete/${id}`
//     });
// })

document.querySelector("#delete-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const id = $("#id").val();
    console.log(id);
    
    // window.location.href = `/delete/${id}`
})