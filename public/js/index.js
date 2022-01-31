var parser = new DOMParser()
var collpaseIcon = document.querySelector("#navbar > div.nav-collapse > i")
var navbar = document.querySelector("#navbar")
collpaseIcon.addEventListener('click',(e)=>{
    collpaseIcon.classList.toggle('nav-toggel-button')
    navbar.classList.toggle('nav-toggel')
})


var bufferingElement = document.querySelector("#buffer")

function finishing(attr,url){
    document.querySelectorAll(`*[${attr}^=\\/]`).forEach(ele=>{
        src = ele.getAttribute(attr)
        new_url = (url+src).replace(/[\/]+/g, '/')
        ele.setAttribute(attr,new_url)
        ele.addEventListener('click',(event)=>{
            if (ele !== event.target) event.preventDefault();return;
            event.preventDefault()
            console.log(event.target);
            renderPage(event.target.getAttribute(attr))
        })
    })
  
}

var urlForm = document.querySelector("#navbar > div.url-form > form")
var page = document.querySelector("#page")

urlForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    url = urlForm.elements[0].value
    renderPage(url)
})

var downloadForm = document.querySelector("#navbar > div.download-form > form")
downloadForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    url=downloadForm.elements[0].value
    axios({
        method: "post",
        url: "/download",
        data: {"url":url},
        headers: {
            'Content-Type': 'application/json'
          }
              }).then(data=>{
                console.log(data.data);
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(data.data);
                a.download = "requested";
                a.click();
              })
})


function renderPage(url){
    axios({
        method: "post",
        url: "/browse",
        data: {"url":url},
        headers: {
            'Content-Type': 'application/json'
          }
              })
        .then(function (response) {
            page.innerHTML =  (response.data)
            // page.innerHTML.replace(parser.parseFromString(response.data,"text/html"))
            url=new URL(url).origin
            finishing("src",url)
            finishing('href',url)
            finishing('action',url)
        })
        .catch(function (response) {
            console.log("err");
          console.log(response);
        });
}