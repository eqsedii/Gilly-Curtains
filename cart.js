/* Gilly Interiors – product sections, lightbox, persistent cart + WhatsApp quote */
(function(){
  var P=window.GILLY_PRODUCTS||[], NUM=window.GILLY_WHATSAPP||'254705566344', KEY='gilly_cart_v1';
  var css='.gc-sec{margin:0 0 2.6rem}.gc-h{font-family:var(--serif);color:var(--blue);font-size:1.5rem;display:flex;align-items:center;gap:.7rem;margin-bottom:1rem}.gc-h:after{content:"";flex:1;height:2px;background:linear-gradient(90deg,var(--orange),transparent);border-radius:2px}.gc-h small{font:600 .72rem var(--sans);letter-spacing:.12em;color:#fff;background:var(--blue);padding:.2rem .6rem;border-radius:99px}'+
  '.gc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}@media(min-width:900px){.gc-grid{gap:1.5rem;max-width:760px}}'+
  '.gc-card{position:relative;background:#fff;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .35s,box-shadow .35s;animation:gcIn .6s both}.gc-card:hover{transform:translateY(-6px);box-shadow:0 18px 44px rgba(10,60,168,.22)}.gc-card:before{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;background:linear-gradient(135deg,var(--orange),var(--blue));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:.35s;pointer-events:none;z-index:2}.gc-card:hover:before,.gc-card.on:before{opacity:1}'+
  '@keyframes gcIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}'+
  '.gc-ph{position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--sand);cursor:zoom-in;border:0;padding:0;width:100%;display:block}.gc-ph img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.gc-card:hover .gc-ph img{transform:scale(1.08)}.gc-ph:after{content:"⤢";position:absolute;right:.6rem;top:.6rem;width:2rem;height:2rem;border-radius:50%;background:rgba(255,255,255,.85);backdrop-filter:blur(6px);display:grid;place-items:center;color:var(--blue);font-weight:700;opacity:0;transform:scale(.6);transition:.3s}.gc-card:hover .gc-ph:after{opacity:1;transform:none}'+
  '.gc-info{padding:.9rem 1rem 1.1rem;display:flex;flex-direction:column;gap:.3rem;flex:1}.gc-info h4{font:600 1rem var(--sans);color:var(--ink)}.gc-info p{font-size:.82rem;color:var(--muted);flex:1}'+
  '.gc-btn{position:relative;overflow:hidden;margin-top:.5rem;border:0;cursor:pointer;font:700 .85rem var(--sans);letter-spacing:.14em;color:#fff;padding:.75rem 1rem;border-radius:99px;background:linear-gradient(135deg,var(--orange),var(--red));box-shadow:0 8px 20px rgba(255,90,0,.3);transition:.3s}.gc-btn:before{content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:gcShine 3s infinite}@keyframes gcShine{to{left:140%}}.gc-btn:hover{transform:translateY(-2px)}.gc-btn.added{background:linear-gradient(135deg,#1db954,#0a8f3c);box-shadow:0 8px 20px rgba(29,185,84,.35)}'+
  '#gcFab{position:fixed;right:1.1rem;bottom:1.1rem;z-index:900;width:3.7rem;height:3.7rem;border-radius:50%;border:0;cursor:pointer;font-size:1.6rem;color:#fff;background:linear-gradient(135deg,var(--blue),#1b6cff);box-shadow:0 12px 30px rgba(10,60,168,.45);display:none;place-items:center;transition:transform .3s}#gcFab.show{display:grid;animation:gcPop .5s}#gcFab:hover{transform:scale(1.1) rotate(-6deg)}#gcFab b{position:absolute;top:-.3rem;right:-.3rem;min-width:1.45rem;height:1.45rem;padding:0 .3rem;border-radius:99px;background:var(--orange);font:700 .78rem/1.45rem var(--sans);text-align:center;border:2px solid #fff}#gcFab.bump{animation:gcBump .5s}@keyframes gcPop{from{transform:scale(0)}to{transform:scale(1)}}@keyframes gcBump{40%{transform:scale(1.28)}}'+
  '.gc-veil{position:fixed;inset:0;background:rgba(8,20,50,.55);backdrop-filter:blur(4px);z-index:950;opacity:0;pointer-events:none;transition:.3s}.gc-veil.open{opacity:1;pointer-events:auto}'+
  '#gcDrawer{position:fixed;top:0;right:0;height:100%;width:min(420px,100%);background:rgba(255,255,255,.96);backdrop-filter:blur(14px);z-index:960;transform:translateX(105%);transition:transform .45s cubic-bezier(.2,.9,.3,1);display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.25)}#gcDrawer.open{transform:none}'+
  '.gc-dh{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 1.2rem;background:linear-gradient(135deg,var(--blue),#1b6cff);color:#fff}.gc-dh h3{font-family:var(--serif);font-size:1.3rem}.gc-x{background:rgba(255,255,255,.2);border:0;color:#fff;width:2.1rem;height:2.1rem;border-radius:50%;font-size:1.1rem;cursor:pointer}'+
  '.gc-list{flex:1;overflow:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem}.gc-it{display:flex;align-items:center;gap:.8rem;background:#fff;border-radius:14px;padding:.55rem;box-shadow:0 4px 16px rgba(10,30,80,.1);animation:gcIn .4s both}.gc-it img{width:3.6rem;height:3.6rem;border-radius:10px;object-fit:cover}.gc-it div{flex:1;font:600 .9rem var(--sans);line-height:1.25}.gc-it small{display:block;color:var(--muted);font-weight:500}'+
  '.gc-q{display:flex;align-items:center;gap:.3rem;margin-top:.3rem}.gc-q button{width:1.6rem;height:1.6rem;border-radius:50%;border:1.5px solid var(--blue);background:#fff;color:var(--blue);font-weight:700;cursor:pointer}.gc-q span{min-width:1.3rem;text-align:center;font-weight:700}.gc-rm{background:#ffe9e5;border:0;color:var(--red);width:2rem;height:2rem;border-radius:50%;cursor:pointer;font-size:1rem}.gc-rm:hover{background:var(--red);color:#fff}'+
  '.gc-empty{text-align:center;color:var(--muted);margin:auto;padding:2rem}.gc-empty span{font-size:3rem;display:block}'+
  '.gc-df{padding:1rem 1.2rem 1.3rem;display:grid;gap:.6rem;border-top:1px solid #eee}.gc-order{border:0;cursor:pointer;padding:.95rem;border-radius:99px;font:800 .95rem var(--sans);letter-spacing:.14em;color:#07391b;background:var(--wa);box-shadow:0 10px 24px rgba(37,211,102,.4);transition:.3s}.gc-order:hover{transform:translateY(-2px)}.gc-clear{background:none;border:1.5px solid #e1e4ec;border-radius:99px;padding:.7rem;font:600 .85rem var(--sans);color:var(--muted);cursor:pointer}.gc-clear:hover{border-color:var(--red);color:var(--red)}'+
  '#gcZoom{position:fixed;inset:0;z-index:970;background:rgba(5,12,30,.88);backdrop-filter:blur(8px);display:grid;place-items:center;padding:1rem;opacity:0;pointer-events:none;transition:.3s}#gcZoom.open{opacity:1;pointer-events:auto}#gcZoom figure{max-width:min(92vw,620px);text-align:center;transform:scale(.88);transition:.4s cubic-bezier(.2,.9,.3,1)}#gcZoom.open figure{transform:none}#gcZoom img{max-width:100%;max-height:72vh;border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.6)}#gcZoom figcaption{color:#fff;margin-top:.8rem;font:600 1.05rem var(--sans)}#gcZoom .gc-btn{padding:.75rem 2rem;margin-top:.8rem}'+
  '.gc-toast{position:fixed;left:50%;bottom:5.4rem;transform:translate(-50%,20px);background:#10204a;color:#fff;padding:.6rem 1.1rem;border-radius:99px;font:600 .85rem var(--sans);z-index:980;opacity:0;transition:.35s;pointer-events:none}.gc-toast.show{opacity:1;transform:translate(-50%,0)}.gc-fly{position:fixed;z-index:990;border-radius:50%;object-fit:cover;pointer-events:none;transition:all .75s cubic-bezier(.5,-.2,.7,.6)}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{} }catch(e){ return {} } }
  function save(c){ try{ localStorage.setItem(KEY,JSON.stringify(c)) }catch(e){} }
  var cart=load();
  function find(n){ for(var i=0;i<P.length;i++) if(P[i].name===n) return P[i] }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;') }
  function count(){ var t=0; for(var k in cart) if(find(k)) t+=cart[k]; return t }

  var fab=document.createElement('button'); fab.id='gcFab'; fab.setAttribute('aria-label','Open cart'); fab.innerHTML='🛒<b>0</b>';
  var veil=document.createElement('div'); veil.className='gc-veil';
  var drawer=document.createElement('aside'); drawer.id='gcDrawer';
  var zoom=document.createElement('div'); zoom.id='gcZoom';
  var toast=document.createElement('div'); toast.className='gc-toast';
  [veil,drawer,zoom,toast,fab].forEach(function(e){document.body.appendChild(e)});

  function say(m){ toast.textContent=m; toast.classList.add('show'); clearTimeout(say.t); say.t=setTimeout(function(){toast.classList.remove('show')},1600) }
  function openCart(o){ drawer.classList.toggle('open',o); veil.classList.toggle('open',o) }

  var ci=(function(){try{return JSON.parse(localStorage.getItem('gilly_ci'))}catch(e){}})()||{n:'',p:''};
  function drawCart(){
    var keys=Object.keys(cart).filter(find), n=count();
    fab.querySelector('b').textContent=n; fab.classList.toggle('show',n>0);
    var h='<div class="gc-dh"><h3>🛒 Your Cart ('+n+')</h3><button class="gc-x" data-a="close" aria-label="Close">✕</button></div><div class="gc-list">';
    if(!keys.length) h+='<div class="gc-empty"><span>🛍️</span>Your cart is empty.<br>Tap ORDER on any product to add it.</div>';
    keys.forEach(function(k,i){ var p=find(k); h+='<div class="gc-it" style="animation-delay:'+i*.05+'s"><img src="'+p.img+'" alt=""><div>'+esc(p.name)+'<small>'+esc(p.category)+'</small><span class="gc-q"><button data-a="dec" data-k="'+esc(k)+'">−</button><span>'+cart[k]+'</span><button data-a="inc" data-k="'+esc(k)+'">+</button></span></div><button class="gc-rm" data-a="rm" data-k="'+esc(k)+'" aria-label="Remove item">🗑</button></div>' });
    h+='</div>'; if(keys.length) h+='<div class="gc-df"><input id="gcName" autocomplete="name" placeholder="Your name" value="'+esc(ci.n)+'" style="width:100%;box-sizing:border-box;padding:.75rem .9rem;border:1.5px solid #d9dde6;border-radius:12px;font:inherit"><input id="gcPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Your phone number" value="'+esc(ci.p)+'" style="width:100%;box-sizing:border-box;padding:.75rem .9rem;border:1.5px solid #d9dde6;border-radius:12px;font:inherit"><button class="gc-order" data-a="send">ORDER NOW</button><button class="gc-clear" data-a="clear">Remove all items</button></div>';
    drawer.innerHTML=h;
    document.querySelectorAll('.gc-btn[data-n]').forEach(function(b){ var on=!!cart[b.dataset.n]; b.classList.toggle('added',on); b.textContent=on?'✓ ADDED':'ORDER'; if(b.closest('.gc-card')) b.closest('.gc-card').classList.toggle('on',on) });
    var zb=zoom.querySelector('.gc-btn'); if(zb){ var on=!!cart[zb.dataset.n]; zb.classList.toggle('added',on); zb.textContent=on?'✓ ADDED':'ORDER' }
  }
  function toggle(n,from){
    if(cart[n]){ delete cart[n]; say('Removed from cart') }
    else { cart[n]=1; say('Added to cart ✓'); fly(from); fab.classList.remove('bump'); void fab.offsetWidth; fab.classList.add('bump') }
    save(cart); drawCart();
  }
  function fly(from){
    var img=from&&(from.closest('.gc-card')||document).querySelector('.gc-ph img'); if(!img||!fab.classList.contains('show')&&false) return;
    var r=img.getBoundingClientRect(); if(!r.width) return;
    var f=document.createElement('img'); f.src=img.src; f.className='gc-fly'; f.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
    document.body.appendChild(f); fab.style.display='grid';
    requestAnimationFrame(function(){ var t=fab.getBoundingClientRect(); f.style.left=t.left+'px'; f.style.top=t.top+'px'; f.style.width='30px'; f.style.height='30px'; f.style.opacity='.3' });
    setTimeout(function(){ f.remove(); fab.style.display='' },780);
  }
  drawer.addEventListener('input',function(e){ if(e.target.id=='gcName')ci.n=e.target.value; if(e.target.id=='gcPhone')ci.p=e.target.value; try{localStorage.setItem('gilly_ci',JSON.stringify(ci))}catch(x){} });
  function send(){
    var keys=Object.keys(cart).filter(find); if(!keys.length) return;
    var nm=(ci.n||'').trim(),ph=(ci.p||'').replace(/[^\d+]/g,''); if(nm.length<2||ph.length<9){ say('Please enter your name and phone number'); var f=document.getElementById(nm.length<2?'gcName':'gcPhone'); if(f) f.focus(); return }
    var t='Hello Gilly Interiors, I would like a quote for:\n\n'; keys.forEach(function(k,i){ t+=(i+1)+'. '+k+' x'+cart[k]+'\n' });
    t+='\n*Name:* '+nm+'\n*Phone:* '+ph+'\n\nPlease share availability, prices and delivery. Thank you!';
    window.open('https://wa.me/'+NUM+'?text='+encodeURIComponent(t),'_blank');
  }

  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-a],.gc-btn[data-n],.gc-ph,#gcFab,.gc-veil,#gcZoom'); if(!b) return;
    if(b.id==='gcFab'){ openCart(true); return }
    if(b.classList.contains('gc-veil')){ openCart(false); return }
    if(b.classList.contains('gc-ph')){ var p=P[b.dataset.i]; zoom.innerHTML='<figure><img src="'+p.img+'" alt="'+esc(p.name)+'"><figcaption>'+esc(p.name)+'</figcaption><button class="gc-btn" data-n="'+esc(p.name)+'"></button></figure>'; zoom.classList.add('open'); drawCart(); return }
    if(b.id==='gcZoom'&&!e.target.closest('.gc-btn')){ zoom.classList.remove('open'); return }
    if(b.dataset.n){ toggle(b.dataset.n,b); return }
    var a=b.dataset.a, k=b.dataset.k;
    if(a==='close') openCart(false);
    else if(a==='inc'){ cart[k]++; save(cart); drawCart() }
    else if(a==='dec'){ if(cart[k]>1) cart[k]--; save(cart); drawCart() }
    else if(a==='rm'){ delete cart[k]; save(cart); drawCart() }
    else if(a==='clear'){ cart={}; save(cart); drawCart(); say('Cart cleared') }
    else if(a==='send') send();
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ openCart(false); zoom.classList.remove('open') } });
  window.addEventListener('storage',function(e){ if(e.key===KEY){ cart=load(); drawCart() } });
  window.addEventListener('pageshow',function(){ cart=load(); drawCart() });

  /* product sections: 2 products per row, grouped by category */
  var host=document.getElementById('products');
  if(host){
    host.className=''; host.style.display='block'; var fb=document.getElementById('filters'); if(fb) fb.style.display='none';
    var cats=[]; P.forEach(function(p){ if(cats.indexOf(p.category)<0) cats.push(p.category) });
    host.innerHTML=cats.map(function(c){
      var items=P.map(function(p,i){return [p,i]}).filter(function(x){return x[0].category===c});
      return '<section class="gc-sec"><h3 class="gc-h">'+esc(c)+' <small>'+items.length+'</small></h3><div class="gc-grid">'+items.map(function(x,j){ var p=x[0];
        return '<article class="gc-card" style="animation-delay:'+j*.08+'s"><button class="gc-ph" data-i="'+x[1]+'" aria-label="View '+esc(p.name)+' full size"><img loading="lazy" alt="'+esc(p.name)+'" src="'+p.img+'"></button><div class="gc-info"><h4>'+esc(p.name)+'</h4>'+(p.note?'<p>'+esc(p.note)+'</p>':'')+'<button class="gc-btn" data-n="'+esc(p.name)+'">ORDER</button></div></article>' }).join('')+'</div></section>';
    }).join('');
  }
  drawCart();
})();
