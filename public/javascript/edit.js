$('document').ready(function (e) {
    // e.preventDefault();

    $(".edit-btn").on('click',function () {
        const id = $("#id").val();
        const name = $("#Edname").val();
        const email = $("#Edemail").val();
        const phone = $("#Edphone").val();
        // console.log(id,name,email,phone);
        
        $('#username').val(name);
        $('#email').val(email);
        $('#phone').val(phone);       
    });
})

// document.querySelector("#delete-btn").addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = $("#id").val();
//     const name = $("#Edname").val();
//     const email = $("#Edemail").val();
//     const phone = $("#Edphone").val();
//     // console.log(id,name,email,phone);
    
//     $('#username').val(name);
//     $('#email').val(email);
//     $('#phone').val(phone);
//     console.log(id);
//     // window.location.href = `/delete/${id}`
// })