/* Gilly Interiors: live content from Supabase. If anything fails, the site shows its built-in content as before. */
(function(){
var URL_='https://rjwprkdhioavtzdggndu.supabase.co',KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqd3Bya2RoaW9hdnR6ZGdnbmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMzk2NzUsImV4cCI6MjEwNzgxNTY3NX0.Z6ws6fRZEMoaRPwhAnxyCtVP0iT1i15VWho2ba1b-jo',OLD={phone:'+254 705 566 344',wa:'254705566344',addr:'Kaiyoni Building, opposite Litein Boys Senior School, Litein Town, Kericho County'},CK='gilly_live_v1';
var H={apikey:KEY,Authorization:'Bearer '+KEY},configured=KEY.indexOf('YOUR_')<0,NUM=OLD.wa;
function get(t,q){return fetch(URL_+'/rest/v1/'+t+'?'+q,{headers:H}).then(function(r){if(!r.ok)throw 0;return r.json()})}
function boot(){var s=document.createElement('script');s.src='./main.js';s.async=false;document.body.appendChild(s);var c=document.createElement('script');c.src='./cart.js';c.async=false;document.body.appendChild(c)}
function $$(s,c){return [].slice.call((c||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function apply(d){
 var S={};d.settings.forEach(function(r){S[r.key]=r.value});
 if(d.products){window.GILLY_PRODUCTS=d.products.map(function(p){var o={name:p.name,category:p.category,img:p.image_url,note:(p.note||'')+(p.stock<=0?(p.note?' · ':'')+'Currently out of stock':'')};if(p.price>0)o.price=p.price;return o})}
 if(S.wa){NUM=S.wa;window.GILLY_WHATSAPP=S.wa}
 var h1=document.querySelector('.hero h1');if(h1&&S.headline){h1.textContent=S.headline}
 var hp=document.querySelector('.hero .hero-inner > p');if(hp&&S.sub)hp.textContent=S.sub;
 var sl=document.querySelector('.hero .slide');if(sl&&S.banner)sl.dataset.src=S.banner;
 if(S.wa&&S.wa!==OLD.wa)$$('a[href*="wa.me/'+OLD.wa+'"]').forEach(function(a){a.href=a.href.replace(OLD.wa,S.wa)});
 if(S.phone&&S.phone!==OLD.phone){var tel=S.phone.replace(/[^\d+]/g,'');$$('a[href^="tel:"]').forEach(function(a){a.href='tel:'+tel;a.textContent=a.textContent.replace(OLD.phone,S.phone)})}
 if(S.address&&S.address!==OLD.addr)$$('li,p,span,div').forEach(function(e){if(!e.children.length&&e.textContent.indexOf(OLD.addr)>-1)e.textContent=e.textContent.replace(OLD.addr,S.address)});
 var g=document.querySelector('.gallery');if(g&&d.gallery&&/gallery/.test(location.pathname)){g.innerHTML=d.gallery.map(function(r){return '<figure class="reveal"><img decoding="async" loading="lazy" src="'+esc(r.image_url)+'" alt="'+esc(r.caption)+'"><figcaption>'+esc(r.caption)+'</figcaption></figure>'}).join('')}
 var grid=/services/.test(location.pathname)&&document.querySelector('.grid.g3');
 if(grid&&d.services){var cards=$$(':scope > .card',grid);d.services.forEach(function(s,i){var c=cards[i];if(!c){c=cards[cards.length-1].cloneNode(true);grid.appendChild(c);cards.push(c)}var t=c.querySelector('h3'),p=c.querySelector('p');if(t)t.textContent=s.title;if(p)p.textContent=s.description;c.style.display=''});for(var j=d.services.length;j<cards.length;j++)cards[j].style.display='none'}
}
/* Log every quote request / cart order as an enquiry (still opens WhatsApp as before) */
var wo=window.open;window.open=function(u){try{var m=/wa\.me\/(\d+)\?text=(.*)$/.exec(u||'');if(m){var t=decodeURIComponent(m[2]),n=/\*Name:\*\s*([^\n]*)/.exec(t),sv=/\*Service:\*\s*([^\n]*)/.exec(t),ph=/\*Phone:\*\s*([^\n]*)/.exec(t),it=(t.match(/^\d+\.\s.+$/gm)||[]).map(function(x){return x.replace(/^\d+\.\s/,'')});
 if(configured)fetch(URL_+'/rest/v1/enquiries',{method:'POST',keepalive:true,headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({name:n?n[1].trim().slice(0,100):'Shop order',phone:ph?ph[1].trim().slice(0,30):'',topic:sv?sv[1].trim():(it.length?('Shop: '+it.join(', ')).slice(0,180):'Shop order'),message:t.slice(0,2500),status:'new'})}).catch(function(){});
 if(m[1]===OLD.wa&&NUM!==OLD.wa)arguments[0]=u.replace(OLD.wa,NUM)}}catch(e){}return wo.apply(window,arguments)};
if(!configured){boot();return}
var done=false,go=function(d){if(done)return;done=true;try{if(d)apply(d)}catch(e){}boot()};
var cached=null;try{cached=JSON.parse(localStorage.getItem(CK))}catch(e){}
setTimeout(function(){go(cached)},2500);
Promise.all([get('site_settings','select=*'),get('services','select=*&order=sort,id'),get('products','select=*&order=sort,id'),get('gallery','select=*&order=created_at.desc,id.desc')]).then(function(r){var d={settings:r[0],services:r[1],products:r[2],gallery:r[3]};try{localStorage.setItem(CK,JSON.stringify(d))}catch(e){}go(d)}).catch(function(){go(cached)});
})();
