 const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind(document)

 const pagination = $('.pagination')
 const pageItems = $$('.page-item')

 pageItems.forEach((pageItem) => {
     pageItem.onclick = function() {
         $('.page-item.active').classList.remove('active')
         this.classList.add('active');

     }
 })