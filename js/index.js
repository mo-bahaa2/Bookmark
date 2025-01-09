var siteNameId=document.getElementById("siteName");
var siteUrlId=document.getElementById("siteUrl");
var serachId=document.getElementById("searchBook");
var siteContainer=[];
if(localStorage.getItem("siteData")!==null){
    siteContainer=JSON.parse(localStorage.getItem("siteData"));
    display();
}
function add(){
    var siteData={
        code:siteNameId.value,
        url:siteUrlId.value
    }
    if(!siteNameId.classList.contains("is-valid")||!siteUrlId.classList.contains("is-valid")){
      Swal.fire({
          // title: "<h5>Site Name or Url is not valid, Please follow the rules below :</h5>",
          icon: "error",
          html: `
            <p class="text-black text-start">Site Name or Url is not valid, Please follow the rules below :</p>
            <div class" container">
            <ol class=" list-unstyled d-flex  flex-column">
            <li class=" my-2 me-auto"><span><i class="fa-solid fa-circle-arrow-right text-danger text-bg-white me-2"></i> Site name must contain at least 3 characters</span>
            
            </li>
            <li class=" me-auto">
            <span><i class="fa-solid fa-circle-arrow-right text-danger text-bg-white me-2"></i> Site URL must be a valid URL</span>
            </li>
            </ol>
            </div>
          `,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          showConfirmButton: false,
        });
  }
  else{
  siteContainer.push(siteData);
  localStorage.setItem("siteData",JSON.stringify(siteContainer));
  display();
  clear();
  }
}


function clear(){
    siteNameId.value=null;
    siteUrlId.value=null;
    siteNameId.classList.remove("is-valid");
    siteUrlId.classList.remove("is-valid");
}


function display(){
    var cartona='';
    for(var i=0;i<siteContainer.length;i++){
        cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${siteContainer[i].code}</td>
                <td class="view"><a href=${siteContainer[i].url} class=" text-decoration-none" target="_blank"><button><i class="fa-solid fa-eye me-1"></i>  view</button></a></td>
                <td class="delete"><button onclick="deleteItem(${i})"><a class="delete"><i class="fa-solid fa-trash-alt"></i></a> Delete</button></td>
            </tr>
        `
    }
    document.getElementById("bodyTaple").innerHTML=cartona;
}


function deleteItem(index){
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        siteContainer.splice(index,1);
    localStorage.setItem("siteData",JSON.stringify(siteContainer));
    display();
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}

// var updated;
function searchForm(){
    var term=serachId.value;
    var cartona='';
    for(var i=0;i<siteContainer.length;i++){
        if(siteContainer[i].code.toLowerCase().includes(term.toLowerCase())){
            cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${siteContainer[i].code}</td>
                <td class="view"><a href=${siteContainer[i].url} class=" text-decoration-none" target="_blank"><button><i class="fa-solid fa-eye me-1"></i>  view</button></a></td>
                <td class="delete"><button onclick="deleteItem(${i})"><a class="delete"><i class="fa-solid fa-trash-alt"></i></a> Delete</button></td>
            </tr>
        `
        }
}
document.getElementById("bodyTaple").innerHTML=cartona;
}


function validform(item){
    var reg={
        siteName:/^[\w\s]{3,}$/gi,
        siteUrl:/^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/igm
    }
    if(reg[item.id].test(item.value)){
        console.log("match");
        item.classList.remove("is-invalid")
        item.classList.add("is-valid")
    }
    else{
        console.log("no");
        item.classList.remove("is-valid")
        item.classList.add("is-invalid")
    }
}

