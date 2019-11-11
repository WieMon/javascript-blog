{
  'use strict';

  /*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
  });*/

  const titleClickHandler = function(event){

    event.preventDefault();
  
    const clickedElement = this;

    console.log('Link was clicked!');

    console.log('event:', event);

    /* [DONE] remove class 'active' from all article links  */
  
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
  
    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');
  
    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log('articleSelector:', articleSelector)

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log('targetArticle: ', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

    console.log('active:', targetArticle);
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(){
  
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    console.log('titleList: ', titleList);

    function clearMessages(){
      titleList.innerHTML = '';
    }
  
    clearMessages()

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles){
      console.log(article);

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      console.log('articleId: ', articleId);
    }

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

  }

  generateTitleLinks();
}