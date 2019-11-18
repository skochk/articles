window.addEventListener('load', function () { 
    fetch('/apiGetLikes',
    {
        method:'GET',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
    })
    .then((resp) => resp.json())
    .then(function(data){
        console.log(data);
        document.querySelector('.likes').innerText = data.length;

    })

})