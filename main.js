(function(){
  document.documentElement.classList.add('js');
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};


  /* ---- intro loader + button/page loaders ---- */
  var L=document.getElementById('loader'), t0=Date.now(), seen=false;
  try{ seen=sessionStorage.getItem('gilly_seen') }catch(e){}
  function hideLoader(){ if(!L) return; L.classList.add('hide') }
  if(L){
    var wait = seen ? 250 : 1900; /* soft intro on first visit, quick after */
    if(seen) L.classList.add('quick');
    var done=function(){ setTimeout(hideLoader, Math.max(0, wait-(Date.now()-t0))); try{sessionStorage.setItem('gilly_seen','1')}catch(e){} };
    document.readyState==='complete' ? done() : window.addEventListener('load',done);
    setTimeout(hideLoader,5000);
    window.addEventListener('pageshow',function(e){ if(e.persisted){ L.classList.add('quick'); hideLoader(); $$('.is-loading').forEach(function(x){x.classList.remove('is-loading')}) } });
  }
  document.addEventListener('click',function(e){
    var el=e.target.closest('a.btn, button.btn, .filters button, .nav-links a'); if(!el||el.classList.contains('is-loading')) return;
    var href=el.getAttribute('href'), external=el.target==='_blank'||(href&&/^(https?:|tel:|mailto:)/.test(href)&&href.indexOf(location.host)<0);
    if(href&&href.charAt(0)==='#') return;
    if(el.tagName==='A'&&href&&!external&&!e.ctrlKey&&!e.metaKey){ /* internal page: show photo loader, then go */
      e.preventDefault(); if(L){ L.classList.add('quick'); L.classList.remove('hide') } setTimeout(function(){ location.href=href },450); return;
    }
    el.classList.add('is-loading'); setTimeout(function(){ el.classList.remove('is-loading') }, external||el.type==='submit' ? 1400 : 500);
  });

  /* header */
  var header=$('.site-header');
  function onScroll(){ header.classList.toggle('solid', window.scrollY>40) }
  if(header && !header.classList.contains('always-solid')){ onScroll(); window.addEventListener('scroll',onScroll,{passive:true}) }
  var burger=$('.burger'), links=$('.nav-links');
  if(burger){ burger.addEventListener('click',function(){ burger.classList.toggle('open'); links.classList.toggle('open') });
    $$('.nav-links a').forEach(function(a){a.addEventListener('click',function(){burger.classList.remove('open');links.classList.remove('open')})}) }

  /* soft crossfade slideshows */
  $$('.slides').forEach(function(box){
    var slides=$$('.slide',box), dotsBox=box.parentElement.querySelector('.dots'), i=0, timer;
    if(!slides.length) return;
    slides.forEach(function(s){ s.style.backgroundImage="url('"+s.dataset.src+"')" });
    var dots=[];
    if(dotsBox){ slides.forEach(function(_,n){ var b=document.createElement('button'); b.setAttribute('aria-label','Show slide '+(n+1)); b.onclick=function(){go(n,true)}; dotsBox.appendChild(b); dots.push(b) }) }
    function go(n,manual){ slides[i].classList.remove('active'); dots[i]&&dots[i].classList.remove('active'); i=(n+slides.length)%slides.length; slides[i].classList.add('active'); dots[i]&&dots[i].classList.add('active'); if(manual){clearInterval(timer);start()} }
    function start(){ timer=setInterval(function(){go(i+1)},6500) }
    go(0); start();
    document.addEventListener('visibilitychange',function(){ document.hidden?clearInterval(timer):(clearInterval(timer),start()) });
  });

  /* reveal on scroll */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    $$('.reveal').forEach(function(el){io.observe(el)});
  } else { $$('.reveal').forEach(function(el){el.classList.add('in')}) }

  /* lightbox */
  var lb=$('.lightbox');
  if(lb){ $$('.gallery figure').forEach(function(f){ f.addEventListener('click',function(){ $('img',lb).src=$('img',f).src; lb.classList.add('open') }) });
    lb.addEventListener('click',function(){lb.classList.remove('open')}); document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')}) }

  /* shop */
  var grid=$('#products');
  if(grid && window.GILLY_PRODUCTS){
    var P=window.GILLY_PRODUCTS, num=window.GILLY_WHATSAPP, fbox=$('#filters');
    var cats=['All'].concat(P.map(function(p){return p.category}).filter(function(v,i,a){return a.indexOf(v)===i}));
    function wa(p){ var t='Hello Gilly Interiors, I would like to order: '+p.name+(p.price?' (KES '+p.price.toLocaleString()+')':'')+'. Is it available?'; return 'https://wa.me/'+num+'?text='+encodeURIComponent(t) }
    function render(cat){
      grid.innerHTML='';
      P.filter(function(p){return cat==='All'||p.category===cat}).forEach(function(p){
        var el=document.createElement('article'); el.className='product reveal in';
        el.innerHTML='<div class="ph"><img loading="lazy" alt="'+p.name+'" src="'+p.img+'"></div><div class="info"><span class="cat">'+p.category+'</span><h3>'+p.name+'</h3>'+(p.note?'<p style="color:#5d6475;font-size:.88rem">'+p.note+'</p>':'')+
          '<div class="price">'+(p.price?'KES '+p.price.toLocaleString()+'<small> /=</small>':'<small>Ask for price</small>')+'</div>'+
          '<a class="btn btn-wa" target="_blank" rel="noopener" href="'+wa(p)+'">Order on WhatsApp</a></div>';
        grid.appendChild(el);
      });
    }
    if(fbox && cats.length>2){ cats.forEach(function(c,i){ var b=document.createElement('button'); b.textContent=c; if(!i)b.className='active'; b.onclick=function(){ $$('button',fbox).forEach(function(x){x.classList.remove('active')}); b.classList.add('active'); render(c) }; fbox.appendChild(b) }) }
    render('All');
  }

  /* quote form -> WhatsApp */
  var form=$('#quoteForm');
  if(form){ form.addEventListener('submit',function(e){ e.preventDefault(); var d=new FormData(form);
    var t='Hello Gilly Interiors,%0A*Name:* '+encodeURIComponent(d.get('name'))+'%0A*Service:* '+encodeURIComponent(d.get('service'))+'%0A*Location:* '+encodeURIComponent(d.get('location')||'-')+'%0A*Details:* '+encodeURIComponent(d.get('message')||'-');
    window.open('https://wa.me/254705566344?text='+t,'_blank') }) }
})();
