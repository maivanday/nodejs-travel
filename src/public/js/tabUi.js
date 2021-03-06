 const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind(document)
     // get tabs 
 const tabs = $$('.tab-item');
 const panes = $$('.tab-pane');

 //add class active to first tab
 const firstTab = $('.first-tab div:first-child');
 firstTab.classList.add('active')

 //add class active to first pane
 const firstContent = $('.first-content div:first-child');
 firstContent.classList.add('active')

 // get tabActive to show lines
 const tabActive = $('.tab-item.active');
 const line = $('.tabs .line');

 // set css line
 line.style.left = tabActive.offsetLeft + 'px';
 line.style.width = tabActive.offsetWidth + 'px';
 tabs.forEach((tab, index) => {
     const pane = panes[index]
     tab.onclick = function() {

         $('.tab-item.active').classList.remove('active');
         $('.tab-pane.active').classList.remove('active');

         line.style.left = this.offsetLeft + 'px';
         line.style.width = this.offsetWidth + 'px';

         this.classList.add('active');
         pane.classList.add('active');
     }
 })