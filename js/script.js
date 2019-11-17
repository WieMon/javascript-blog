{
  'use strict';

  /*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
  });*/

  const titleClickHandler = function(event){

    event.preventDefault();
  
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
  
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks){

      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
  
    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles){

      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = ''){

    console.log('customSelector: ', customSelector);

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages(){

      titleList.innerHTML = '';
    }
  
    clearMessages();

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles){

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
     
    }
  
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
  
    for (let link of links){

      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){

    const params = {
      max: 0,
      min: 999999,
    };

    for (let tag in tags){

      console.log(tag + ' is used ' + tags[tag] + ' times');

      if (tags[tag] > params.max){

        params.max = tags[tag];

      } else if (tags[tag] < params.min){

        params.min = tags[tag];
      }
    }

    return params;
  }

  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    
    let allTags = {};

    console.log('allTags: ', allTags);

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles){

      /* find tags wrapper */

      const titleList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      
      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      
      for (let tag of articleTagsArray){
          
        /* generate HTML of the link */

        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        
        html = html + ' ' + tagHTML;

        /* [NEW] check if this link is NOT already in allTags */
        
        if (!allTags.hasOwnProperty(tag)){
        
          /* [NEW] add generated code to allTags array */

          allTags[tag] = 1;

        } else {

          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      
      titleList.innerHTML = html;

    /* END LOOP: for every article: */
    }
    
    /* [NEW] find list of tags in right column */
    
    const tagList = document.querySelector('.tags');

    console.log('tagList: ', tagList);

    /* [NEW] add html from allTags to tagList */
    
    /*tagList.innerHTML = allTags.join(' ');*/

    /*console.log('allTags ', allTags);*/

    /*[NEW] create variable for all links HTML code*/

    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams: ', tagsParams);

    let allTagsHTML = '';

    /*[NEW] START LOOP: fpr each tag in allTags:*/

    for (let tag in allTags){

      /*[NEW] generate code of a link and add it to allTagsHTML*/

      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      allTagsHTML += tagHTML + ' (' + allTags[tag] + ')';

      console.log('tagHTML: ', tagHTML);
    }

    /*[NEW] END LOOP: for each tag in allTags:*/

    /*[NEW] add html from allTagsHTML to tagList*/

    tagList.innerHTML = allTagsHTML;

    console.log('allTagsHTML: ', allTagsHTML);
  }
  generateTags();

  function tagClickHandler (event){

    /* prevent default action for this event */

    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
  
    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    console.log('activeTagLinks: ', activeTagLinks);

    /* START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks){

      /* remove class active */

      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
  
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    
    for (let tagLink of tagLinks){
      
      /* add class active */
      
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }
      
    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){

    /* find all links to tags */

    const linkTags = document.querySelectorAll('a[href^="#tag-"]');

    console.log('linkTags: ', linkTags);
  
    /* START LOOP: for each link */

    for (let linkTag of linkTags){

      /* add tagClickHandler as event listener for that link */

      linkTag.addEventListener('click', tagClickHandler);
  
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();
  
  function generateAuthors(){
    
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles){

      const authorList = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const articleAuthor = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

      html = html + authorHTML;

      authorList.innerHTML = html;
    }
  }

  generateAuthors();

  function authorClickHandler(event){

    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute ('href');

    const author = href.replace('#author-', '');

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthorLink of activeAuthorLinks){

      activeAuthorLink.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorLink of authorLinks){

      authorLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenerToAuthors(){

    const linkAuthors = document.querySelectorAll('a[href^="#author-"]');

    for (let linkAuthor of linkAuthors){

      linkAuthor.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenerToAuthors();


}