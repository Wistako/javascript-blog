{
  'use strict';
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
    authorsCloudLink: Handlebars.compile(document.querySelector('#template-authors-cloud').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
  };
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleSelector = '.post';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorListSelector = '.list.authors';
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

    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const generateTitleLinks = function ( customSelector = ''){
    /* remove contents of titleList */
    document.querySelector('.titles').innerHTML ='';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let linkHTML = '';
    for( let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector('.post-title').textContent;

      /* get the title from the title element */

      /* create HTML of the link */

      //  linkHTML +='<li><a href="#' + articleId + '"><span>' + articleTitle  + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      linkHTML += templates.articleLink(linkHTMLData);
    }
    /* insert link into titleList */
    document.querySelector('.titles').innerHTML = linkHTML;

    const links = document.querySelectorAll('.titles a');
    for (let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags){
    let tagParams = { max: ''
    };
    for (let tag in tags) {
      if (tags[tag] > tagParams.max){
        tagParams.max = tags[tag];
        if(!tagParams.hasOwnProperty('min')){
          tagParams.min = tags[tag];
        }
      } else if(tags[tag] < tagParams.min ){
        tagParams.min = tags[tag];
      }
    }
    return tagParams;
  };

  const calculateTagClass = function(count, params){
    const difference = count - params.min;
    const range= params.max - params.min;
    const res =(difference/range);
    const classNumber = Math.floor( res * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  };
  const generateTags =function(){

    let allTags = {};
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
        const linkHTMLData = {id: genTag, title: genTag};
        const tag = templates.tagLink(linkHTMLData);
        // const tag = '<li><a href="#tag-' + genTag + '" class="">' +  genTag + '</a></li>';
        /* add generated code to html variable */
        taglinkHTML += tag + ' ';
        if(!allTags[genTag]){
          allTags[genTag] = 1;
        }else {
          allTags[genTag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = taglinkHTML;
    /* END LOOP: for every article: */
    }
    const tagList = document.querySelector(optTagsListSelector);
    /* [NEW] create variable for all links HTML code */
    let allTagsData = {tags: []};
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      tag = tag.replace('<li>', '');
      tag = tag.replace('</li>', '');
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      // const classTag = tag.replace('class="', 'class="' + calculateTagClass(allTags[tag], tagsParams));
      // allTagsHTML += classTag.replace('</a></li>' ,' (' + allTags[tag] + ')</a></li> ');
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };
  generateTags();

  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTag = document.querySelectorAll('a.active');
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
    /* START LOOP: for each link */
    for(let tagLink of allTags){
      console.log(tagLink);
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();


  const generateAuthors = function (){
    let allAuthors = {};
    let authorsHTMLData = { authors : []};
    // Find aricle
    const articles = document.querySelectorAll(optArticleSelector);
    for (const article of articles) {
      // For all find argument author
      const author = article.getAttribute('data-author');
      // Create a link

      const href = 'author-' + author.replace(' ', '-');
      const linkHTMLData = {id: href, title: author};
      const linkHTML = templates.articleAuthor(linkHTMLData);
      // const linkHTML = '<a href=#author-'+ href +'>' + author + '</a>';
      // Find author wrapper
      const authorWrapper = article.querySelector('.post-author');
      // Add link
      authorWrapper.innerHTML = linkHTML;
      if(!allAuthors[author]){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    }
    for (const key in allAuthors) {
      authorsHTMLData.authors.push({
        author: key,
        count: allAuthors[key],
        href: key.replace(' ', '-')
      });
      // authorsLinkHTML += '<li>' + key.replace('</a>' , ' (' + allAuthors[key] + ')</a></li>');
    }
    const authorsWrapper = document.querySelector(optAuthorListSelector);
    authorsWrapper.innerHTML = templates.authorsCloudLink(authorsHTMLData);
  };

  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    // Get href atriibute
    const href = clickedElement.getAttribute('href');
    // Find author
    const author = href.replace('#author-' , '');
    const dataAuthor = author.replace('-', ' ');
    generateTitleLinks('[data-author="' + dataAuthor + '"]');
    const active = document.querySelectorAll('a.active');
    for (const remove of active) {
      remove.classList.remove('active');
    }
    const authorList = document.querySelectorAll('[href="'+ href +'"]');
    for (const active of authorList) {
      active.classList.add('active');
    }
  };

  const addClickListenersToAuthors = function(){
    // Find all Authors
    const authors = document.querySelectorAll('.post-author a');
    // Add eventlistener in loop
    for (let author of authors) {
      author.addEventListener('click', authorClickHandler);
    }
    const authorList = document.querySelectorAll('.list.authors a');
    for (let author of authorList){
      author.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();




}
