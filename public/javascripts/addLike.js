document.querySelector('.addLike').addEventListener('click', function(){
    
    let str = window.location.pathname;
    let articleID = str.split('/articles/')[1];
    let strs = document.cookie;
    let id1 = strs.split("userID=j%3A%22")[1];
    let userID = id1.split('%22')[0];
    let = data = {articleID:articleID,userID:userID};
    console.log(data);
    fetch('/apiAddLike', 
    {
        method: 'POST',
        headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
        body: JSON.stringify(data)
    }); 
})