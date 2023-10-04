{
    'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
  
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active')
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefLink = clickedElement.getAttribute('href');
    console.log(hrefLink);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(hrefLink);
    console.log(correctArticle);

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
}

function generateTitleLinks(){
/* remove contents of titleList */
    document.querySelector('.titles').innerHTML ="";

/* for each article */
    const articles = document.querySelectorAll('.post');
    let linkHTML = '';
    for( let article of articles){
        
        /* get the article id */
        const ArticleId = article.getAttribute('id');
        console.log(ArticleId);

        /* find the title element */
        const ArticleTitle = article.querySelector('.post-title').textContent;
        console.log(ArticleTitle);

        /* get the title from the title element */

        /* create HTML of the link */

        linkHTML +='<li><a href="#' + ArticleId + '"><span>' + ArticleTitle  + '</span></a></li>';
    }
        /* insert link into titleList */
    
    document.querySelector('.titles').innerHTML = linkHTML;
    console.log(linkHTML);
    const links = document.querySelectorAll('.titles a');
    for (let link of links){
    link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();
}
