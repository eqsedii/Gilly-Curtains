(function(){
  document.documentElement.classList.add('js');
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};


  /* ---- intro loader (curtains open) + button/page loaders ---- */
  var L=document.getElementById('loader'), t0=Date.now(), seen=false, pct=0, pEl=L&&L.querySelector('b'), closed=false;
  try{ seen=sessionStorage.getItem('gilly_seen') }catch(e){}
  function setPct(v){ pct=v; if(pEl) pEl.textContent=Math.round(v)+'%' }
  function hideLoader(){ if(!L||closed) return; closed=true; clearInterval(window.__gt); setPct(100);
    if(L.classList.contains('quick')){ L.classList.add('hide') }
    else { L.classList.add('open'); setTimeout(function(){ L.classList.add('hide') },1300) } }
  if(L){
    if(seen) L.classList.add('quick');
    var wait = seen ? 300 : 2400;
    var tick=window.__gt=setInterval(function(){ setPct(Math.min(96,(Date.now()-t0)/wait*100)) },50);
    var done=function(){ setTimeout(hideLoader, Math.max(0, wait-(Date.now()-t0))); try{sessionStorage.setItem('gilly_seen','1')}catch(e){} };
    document.readyState==='complete' ? done() : window.addEventListener('load',done);
    setTimeout(hideLoader,6000);
    window.addEventListener('pageshow',function(e){ if(e.persisted){ L.classList.add('quick'); closed=false; hideLoader(); $$('.is-loading').forEach(function(x){x.classList.remove('is-loading')}) } });
  }
  document.addEventListener('click',function(e){
    var el=e.target.closest('a.btn, button.btn, .filters button, .nav-links a'); if(!el||el.classList.contains('is-loading')) return;
    var href=el.getAttribute('href'), external=el.target==='_blank'||(href&&/^(https?:|tel:|mailto:)/.test(href)&&href.indexOf(location.host)<0);
    if(href&&href.charAt(0)==='#') return;
    if(el.tagName==='A'&&href&&!external&&!e.ctrlKey&&!e.metaKey){
      e.preventDefault(); if(L){ L.classList.add('quick'); L.classList.remove('hide','open'); closed=false; setPct(30) } setTimeout(function(){ location.href=href },450); return;
    }
    el.classList.add('is-loading'); setTimeout(function(){ el.classList.remove('is-loading') }, external||el.type==='submit' ? 1400 : 500);
  });

  /* ---- life: progress bar, image fade-in, stagger, marquee ---- */
  var prog=document.createElement('div'); prog.id='prog'; document.body.appendChild(prog);
  function onProg(){ var h=document.documentElement.scrollHeight-innerHeight; prog.style.width=(h>0?scrollY/h*100:0)+'%' }
  addEventListener('scroll',onProg,{passive:true}); onProg();
  $$('img').forEach(function(im){ if(im.closest('#loader')) return; if(im.complete&&im.naturalWidth){ return } im.classList.add('lz'); var ok=function(){ im.classList.add('loaded') }; im.addEventListener('load',ok); im.addEventListener('error',ok) });
  $$('.grid, .products, .fgrid').forEach(function(g){ Array.prototype.slice.call(g.children).forEach(function(c,i){ c.style.transitionDelay=(i%6)*90+'ms' }) });
  var strip=$('.strip ul'); if(strip){ strip.innerHTML+=strip.innerHTML; strip.classList.add('marquee') }
  document.body.addEventListener('animationend',function(){},{once:true});
  var burger=$('.burger'), links=$('.nav-links');
  if(burger){ burger.addEventListener('click',function(){ document.body.classList.toggle('menu-open',burger.classList.contains('open')) });
    document.addEventListener('click',function(e){ if(document.body.classList.contains('menu-open') && !e.target.closest('.nav-links') && !e.target.closest('.burger')){ burger.classList.remove('open'); links.classList.remove('open'); document.body.classList.remove('menu-open') } });
    $$('.nav-links a').forEach(function(a){ a.addEventListener('click',function(){ document.body.classList.remove('menu-open') }) }) }

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
    slides.forEach(function(s,n){ var set=function(){ s.style.backgroundImage="url('"+s.dataset.src+"')" }; if(n===0) set(); else { var go2=function(){ setTimeout(set,n*500) }; document.readyState==='complete'?go2():window.addEventListener('load',go2) } });
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
