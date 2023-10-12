{
  'use strict';
  const optArticleTagsSelector = '.post-tags .list';
  const optAricleSelector = '.post';
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
    const activeArticles = document.querySelectorAll('.posts .active');
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
  };

  const generateTitleLinks = function ( customSelector = ''){
    /* remove contents of titleList */
    document.querySelector('.titles').innerHTML ='';

    /* for each article */
    const articles = document.querySelectorAll(optAricleSelector + customSelector);
    let linkHTML = '';
    console.log(customSelector);
    for( let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector('.post-title').textContent;

      /* get the title from the title element */

      /* create HTML of the link */

      linkHTML +='<li><a href="#' + articleId + '"><span>' + articleTitle  + '</span></a></li>';
    }
    /* insert link into titleList */

    document.querySelector('.titles').innerHTML = linkHTML;
    const links = document.querySelectorAll('.titles a');
    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags =function(){
    /* find all articles */
    const articles = document.querySelectorAll('.post');
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let taglinkHTML = '';
      /* get tags from data-tags attribute */
      const tags = article.getAttribute('data-tags');
      /* split tags into array */
      const tagsAray = tags.split(' ');
      /* START LOOP: for each tag */
      for(let genTag of tagsAray){
        /* generate HTML of the link */
        const tag = '<li><a href="#tag-' + genTag + '">' + genTag + '</a></li>';
        /* add generated code to html variable */
        taglinkHTML += tag + ' ';
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = taglinkHTML;
    /* END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activeTag = document.querySelectorAll('a.active');
    console.log(activeTag);
    /* START LOOP: for each active tag link */
    for(let linktag of activeTag){
      /* remove class active */
      linktag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagslink = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tag of tagslink){
      /* add class active */
      tag.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const addClickListenersToTags = function (){
    /* find all links to tags */
    const allTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(allTags);
    /* START LOOP: for each link */
    for(let tagLink of allTags){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();
}
