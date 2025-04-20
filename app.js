
window.addEventListener('DOMContentLoaded',(e)=>{  
  
  const d=document, n=navigator, ua=n.userAgent,

  // Nav
  $panelFondo = d.querySelector('.panel-fondo'),
  $navPanel = d.querySelector('.panel'),
  $navPanelitems = d.querySelectorAll('.panel-item'),
  $btnHamb = d.querySelector('.btn-hamb'),
  $navRowItem = d.querySelectorAll('.nav-row-item a'),
  $main = d.querySelector('main'),

  // Cards
  CardsJson = './img/cards/cards.json',
  $templateCardsCntnr = d.querySelector('.template-cards-container'),
  $templateCards = d.getElementById('cards-template').content, 
  $fragmentCards = d.createDocumentFragment(),
  CardsInfoJson = './img/cards/info/info-cards.json',
  $templateInfoCntnr = d.querySelector('.template-info-container'),
  $templateInfo = d.getElementById('info-card-template').content, 
  $fragmentInfo = d.createDocumentFragment(),

  // Carousel
  $slidesContainer = d.querySelector('.slides-cntr'),
  $slide = d.querySelectorAll('.slide'),
  $listaSemCont = d.querySelector('.lista-semll-cntr');

  
  ////////////////////////////////////////////////////////////////////////////

  const userDeviceInfo = ()=>{
    isMobile = {
        android:()=>ua.match(/android/i),
            ios:()=>ua.match(/iphone|ipad|ipod/i)
    },
    isBrowser = {
        chrome:()=>ua.match(/chrome/i),
        safarai:()=>ua.match(/safarai/i),
        firefox:()=>ua.match(/firefox/i),
        opera:()=>ua.match(/opera|opera mini/i),
        ie:()=>ua.match(/msie|iemobile/i),
        edge:()=>ua.match(/edge/i),
        any:function(){
          return(
            this.ie()||
            this.edge()||
            this.chrome()||
            this.safarai()||
            this.firefox()||
            this.opera()
          );
        }
    };
  }  
  userDeviceInfo()

  ////////////////////////////////////////////////////////////////////////////

  // PARA TODOS LOS BTN ******

  const btnOn = (btn)=>{
    btn.classList.add('btn-on');
    setTimeout(() => {
      btn.classList.remove('btn-on');
    }, 200)
  }
  ////////////////////////////////////////////////////////////////////////////
  
  // PANEL NAV ******
  
  const navPanelShow = ()=>{
    $navPanel.style.backgroundImage= "url('./img/fondo_panel.jpg')";    
    $navPanelitems.forEach((elm)=>{
      elm.style.visibility = "visible";
    });    
    $panelFondo.classList.toggle('fondo-active');
    $navPanel.classList.toggle('panel-active');
    $btnHamb.classList.toggle('isactive');
    $navRowItem.forEach((itm)=>{
      itm.classList.toggle('item')
    });
    $main.classList.toggle('filtro-blur');
  }

  ////////////////////////////////////////////////////////////////////////////
  
    // TÁCTIL CARDS Swipe Left / Right
    let initialX = null;
    const startTouch = (e)=> initialX = e.touches[0].clientX;  
    const moveTouch = (e)=>{
      if (initialX === null) {
        return;
      };
      let currentX = e.touches[0].clientX; 
      let diffX = initialX - currentX; 
      if (Math.abs(diffX)) {
        if (diffX > 0) {
          btnLeft()  
        };
        if (diffX < 0) {
          btnRight()
        };
      };
      initialX = null;
    };
  
  ////////////////////////////////////////////////////////////////////////////

  // CARDS ******

  // ***********************************************


  // Poblar Array de cards
  async function loadCards(url){
    try{
      let res = await fetch(url),
      json = await res.json();
      json.forEach(el=>{
        $templateCards.querySelector('img').setAttribute('src', el.img);
        $templateCards.querySelector('.texto').textContent = el.texto;        
        let $cloneCard = document.importNode($templateCards, true);
        $fragmentCards.appendChild($cloneCard); 
        $templateCardsCntnr.appendChild($fragmentCards);        
      });
    }catch(err){
      console.log(err);
    }
  }
  loadCards(CardsJson)


  // Poblar Array de cards-info
  async function loadCardsInfo(url){
    try{
      let res = await fetch(url),
      json = await res.json();  
      
      const $imgsCard = document.querySelectorAll('.card img'),
      $btnsCard = document.querySelectorAll('.btn-card');
      for(let i=0; i<json.length; i++){       
        $imgsCard[i].setAttribute('index', i);
        $btnsCard[i].setAttribute('index', i);
      }
      
      const showCardInfo = (el)=>{
        const i = el.getAttribute('index');
        $templateInfo.querySelector('img').setAttribute('src', json[i].img);
        $templateInfo.querySelector('.info-card-h1').textContent = json[i].h1;
        $templateInfo.querySelector('.description').textContent = json[i].description;
        $templateInfo.querySelector('.modo-d-uso').textContent = json[i].modoDeUso;
        $templateInfo.querySelector('.composition').textContent = json[i].composition;
        $templateInfo.querySelector('.info-anexa').textContent = json[i].infoAnexa;
        let $cloneInfo = document.importNode($templateInfo, true);
        $fragmentInfo.appendChild($cloneInfo); 
        $templateInfoCntnr.appendChild($fragmentInfo);
        d.body.style.overflow = "hidden";    
      }
      const hideCardInfo = ()=>{
        $templateInfoCntnr.removeChild($templateInfoCntnr.lastElementChild);
        d.body.style.overflow = "visible";
      }

      d.addEventListener('click', (e)=>{
        if(e.target.matches('.btn-card') || e.target.matches('.card img')){
          showCardInfo(e.target)
          if(e.target.classList.contains('btn-card')){
            btnOn(e.target.parentElement);
          }
        };
        if(e.target.matches('.xclose')||e.target.matches('.info-card-fondo')){
          hideCardInfo()
        };
      });      
    }catch(err){
      console.log(err);
    }
  }
  loadCardsInfo(CardsInfoJson)


  ////////////////////////////////////////////////////////////////////////////

  // CAROUSEL ******

  let i_L=$slide.length-1, i_C=0, i_R=1;

  $slide[i_C].style.opacity = '1';  
  $slide[i_L].classList.add('center-to-left');
  $slide[i_L].style.opacity = '1';  
  $slide[i_R].classList.add('center-to-right');
  $slide[i_R].style.opacity = '1';

  const btnLeft = ()=>{
    $slide.forEach(slid=>{
      if(slid.classList.contains('to-left-2')){
        slid.classList.remove('to-left-2');
        slid.style.opacity = '0';
      };      
      if(slid.classList.contains('to-right-2')){
        slid.classList.remove('to-right-2');
      };      
    });
    //----------------------------------------------
    $slide[i_R].classList.remove('center-to-right', 'right-2-to-right');
    $slide[i_R].classList.add('right-to-center');    
    if(i_R===$slide.length-1){
      i_R=-1;
    };    
    i_R++;    
    $slide[i_R].classList.add('right-2-to-right');
    $slide[i_R].style.opacity = '1';
    //----------------------------------------------
    $slide[i_C].classList.remove('left-to-center', 'right-to-center');
    $slide[i_C].classList.add('center-to-left');    
    if(i_C===$slide.length-1){
      i_C=-1;
    };   
    i_C++;
    //----------------------------------------------
    $slide[i_L].classList.remove('center-to-left', 'left-2-to-left');
    $slide[i_L].classList.add('to-left-2');    
    if(i_L===$slide.length-1){
      i_L=-1;
    };
    i_L++;
    //----------------------------------------------    
  }; 

  //--------------------------------------------------------------------------
  
  const btnRight = ()=>{   
    $slide.forEach(slid=>{
      if(slid.classList.contains('to-right-2')){
        slid.classList.remove('to-right-2');
        slid.style.opacity = '0';
      };
      if(slid.classList.contains('to-left-2')){
        slid.classList.remove('to-left-2');
      };      
    });
    //----------------------------------------------
    $slide[i_L].classList.remove('center-to-left', 'left-2-to-left');
    $slide[i_L].classList.add('left-to-center');    
    if(i_L===0){
      i_L=$slide.length;
    };
    i_L--;    
    $slide[i_L].classList.add('left-2-to-left');
    $slide[i_L].style.opacity = '1';
    //----------------------------------------------
    $slide[i_C].classList.remove('left-to-center', 'right-to-center');
    $slide[i_C].classList.add('center-to-right');
    if(i_C===0){
      i_C=$slide.length;
    };    
    i_C--;
    //----------------------------------------------
    $slide[i_R].classList.remove('center-to-right', 'right-2-to-right');
    $slide[i_R].classList.add('to-right-2');    
    if(i_R===0){
      i_R=$slide.length;
    };   
    i_R--;
    //----------------------------------------------    
  };    

  ////////////////////////////////////////////////////////////////////////////

  // SEMILLAS LISTA ******

  const verListaSemll = (elm)=>{
    const btnSmll = elm.parentElement;
    btnOn(btnSmll);
    if($listaSemCont.classList.contains('cerrar-lista')){
      $listaSemCont.classList.remove('cerrar-lista');
      $listaSemCont.classList.add('list-cont-hidden');
    };
    if($listaSemCont.classList.contains('ver-lista')){
      $listaSemCont.classList.add('cerrar-lista');
      $listaSemCont.classList.remove('ver-lista');
      setTimeout(() => {
        elm.innerHTML = `Ver Lista</br>Completa`;
        d.querySelector('.btn-semll-border').style.top = '0px';
      }, 250);
      d.querySelector('.prod-huerta').scrollIntoView(); 
    };    
    if($listaSemCont.classList.contains('list-cont-hidden')){
      $listaSemCont.classList.add('ver-lista');
      $listaSemCont.classList.remove('list-cont-hidden');
      setTimeout(() => {
        elm.innerHTML = `Cerrar Lista`;
        d.querySelector('.btn-semll-border').style.top = '13px';
      }, 250); 
      d.querySelector('.btn-semll-cntr').scrollIntoView();
    };
  };
  
  ////////////////////////////////////////////////////////////////////////////
  
  // LLAMADORES    
   
  if(isMobile.android() || isBrowser.any()){

    d.addEventListener('click', (e)=>{
      // nav *****
      if(e.target.matches('.btn-hamb') || e.target.matches('.btn-hamb *') || e.target.matches('.item') || e.target.matches('.panel-fondo')){
        navPanelShow();      
      };
      // carousel *****
      if(e.target.matches('.btn-crsl-l *')){
        btnLeft();
        btnOn(d.querySelector('.btn-crsl-l'));
      };
      if(e.target.matches('.btn-crsl-r *')){
        btnRight();
        btnOn(d.querySelector('.btn-crsl-r'));
      };
      // semillas lista *****
      if(e.target.matches('.btn-semll')){
        verListaSemll(e.target);   
      };
    });
  };
  //**************************************************** */
  if(isMobile.ios()){
    d.addEventListener('touchstart', (e)=>{
      // nav *****
      if(e.target.matches('.btn-hamb') || e.target.matches('.btn-hamb *') || e.target.matches('.item') || e.target.matches('.panel-fondo')){
        navPanelShow();      
      };
      // carousel *****
      if(e.target.matches('.btn-crsl-l *')){
        btnLeft();
        btnOn(d.querySelector('.btn-crsl-l'));
      };
      if(e.target.matches('.btn-crsl-r *')){
        btnRight();
        btnOn(d.querySelector('.btn-crsl-r'));
      };
      // semillas lista *****
      if(e.target.matches('.btn-semll')){
        verListaSemll(e.target);  
      };
    }, false);
  };

  // touch del carousel
  $slidesContainer.addEventListener("touchstart", startTouch, false); 
  $slidesContainer.addEventListener("touchmove", moveTouch, false);  

  
  ////////////////////////////////////////////////////////////////////////////
  
  e.preventDefault();        
});

