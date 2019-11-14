let allButtons = document.querySelectorAll('button');

for(let i = 0; i< allButtons.length; i++){
    allButtons[i].addEventListener('click', function(e){
        let position = this.parentElement.className;
        let title = this.querySelector('p')
        console.log(position);
        console.log(title);

        let allArticles = document.querySelectorAll('div');
        let text = allArticles[position-1].querySelector('p').innerText;
        let = data = {title: text}
        fetch('/apiPublishArticle', 
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify(data)
        }); 
        // console.log(JSON.stringify(data));
    e.preventDefault(); //stay on prev page and not creating params with keys
    location.reload(); //reloading page for getting last comment
    });
}       