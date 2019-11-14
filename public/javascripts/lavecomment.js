
document.querySelector('form').addEventListener('submit', function(e){
    // function sendComment(articleID, comment){
        let str = window.location.pathname;
            let articleID = str.split('/articles/')[1];
            let comment = document.querySelector('input').value;
            
            // console.log('id: ' + articleID);
            // console.log("comment: " + comment);
            let data = {articleID:articleID,text:comment};
       
        fetch('/apiAddComment', 
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
                    body: JSON.stringify(data)
                }); 
                // console.log(JSON.stringify(data));
            e.preventDefault(); //stay on prev page and not creating params with keys
            location.reload(); //reloading page for getting last comment
});

