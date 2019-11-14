
window.addEventListener('load', function () {
    fetch('/apiGetComments',
    {
        method: 'GET',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        // body: JSON.stringify(data)
    })
    .then((resp) => resp.json()) //parse to JSON answer from server
    .then(function(data){
        // console.log(data);
        // console.log(data.length);
        for(let i = 0; i < data.length; i++){
            let span = document.createElement('div');
            span.classList.add("comment");
            span.style.border = "1px solid #0000FF";
            span.innerHTML = data[i].text;
            // console.log(span);
            document.querySelector('.commentArea').appendChild(span);
        }
        
    })
    .catch(function(){

    });
  })