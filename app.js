const $=s=>document.querySelector(s);
const IMG={arches:"images/dining-hall-arches.jpg",orange:"images/banquet-hall-orange-chairs.jpg",lounge:"images/dining-hall-lounge.jpg",redwhite:"images/banquet-hall-red-white-chairs.jpg",evening:"images/dining-hall-evening.jpg",f1:"images/food/paneer-chilly.jpg",f2:"images/food/paneer-curry.jpg",f3:"images/food/mocktails.jpg"};
for(let i=1;i<=14;i++)IMG["m"+i]="images/menu/page-"+String(i).padStart(2,"0")+".jpg";
const MENU=window.MENU_DATA;
if($("#mb"))$("#mb").onclick=()=>$("#nl").classList.toggle("on");
const order=["soup","starters-tandoor","starters-chinese","snacks","paneer-main","veg-main","kofta","kaju-mushroom","dal","chinese-main","rice-biryani","breads","sizzlers-baked","salad-papad-raita","mocktail","beverages","milk-shake","dessert"];
const cats=order.map(id=>MENU.categories.find(c=>c.id===id)).filter(Boolean);
const esc=s=>s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const price=p=>p==null?"MRP":"\u20B9"+p;
const row=i=>'<div class="it"><span class="n">'+esc(i.name)+(i.signature?'<span class="tag">Signature</span>':'')+'</span><span class="d"></span><span class="p">'+price(i.price)+'</span></div>';
const block=c=>'<div class="mcat"><h3>'+esc(c.title)+'</h3><div class="u">'+c.unit+'</div><div class="items">'+c.items.map(row).join("")+'</div></div>';
if($("#cnt"))$("#cnt").textContent=cats.reduce((a,c)=>a+c.items.length,0)+"+ Dishes";
if($("#sig")){const sg=[];cats.forEach(c=>c.items.filter(i=>i.signature).forEach(i=>sg.push('<div><span><b>'+esc(i.name)+'</b><small>'+esc(c.title)+'</small></span><span>'+price(i.price)+'</span></div>')));$("#sig").innerHTML=sg.join("")}
if($("#mlist")){
  let cur=cats[0].id;
  const draw=()=>{const q=$("#q").value.trim().toLowerCase();
    $("#tabs").style.display=q?"none":"flex";
    if(q){const out=cats.map(c=>({...c,items:c.items.filter(i=>i.name.toLowerCase().includes(q))})).filter(c=>c.items.length);
      $("#mlist").innerHTML=out.length?out.map(block).join(""):'<p class="note">No dishes found.</p>';
    }else $("#mlist").innerHTML=block(cats.find(c=>c.id===cur));
    document.querySelectorAll(".tab").forEach(t=>t.setAttribute("aria-selected",t.dataset.id===cur))};
  $("#tabs").innerHTML=cats.map(c=>'<button class="tab" role="tab" data-id="'+c.id+'">'+esc(c.title)+'</button>').join("");
  $("#tabs").onclick=e=>{const t=e.target.closest(".tab");if(t){cur=t.dataset.id;draw()}};
  $("#q").oninput=draw;draw();
  $("#mnote").textContent="GST extra. Rates are subject to change without prior notice.";
  const view=card=>{$("#listv").hidden=card;$("#cardv").hidden=!card;$("#vl").setAttribute("aria-pressed",!card);$("#vc").setAttribute("aria-pressed",card)};
  $("#vl").onclick=()=>view(false);$("#vc").onclick=()=>view(true);
  if(location.hash==="#card")view(true);
  $("#mc").innerHTML=Array.from({length:14},(_,i)=>'<button data-l="mc" data-k="'+i+'" aria-label="Open menu page '+(i+1)+'"><img src="'+IMG["m"+(i+1)]+'" alt="Kshitij menu card page '+(i+1)+'" loading="lazy"></button>').join("");
}
const G=[["arches","Dining hall"],["orange","Banquet hall"],["f1","Paneer chilly"],["lounge","Dining hall"],["f2","Paneer curry"],["redwhite","Conference and banquet hall"],["f3","Mocktails"],["evening","Dining hall in the evening"]];
if($("#gal"))$("#gal").innerHTML=G.map((g,k)=>'<button data-l="g" data-k="'+k+'" aria-label="Open photo: '+g[1]+'"><img src="'+IMG[g[0]]+'" alt="Kshitij Restaurant: '+g[1]+'" loading="lazy"></button>').join("");
const L={g:G.map(x=>x[0]),mc:Array.from({length:14},(_,i)=>"m"+(i+1))};let cl="g",k=0;const lb=$("#lb"),lbi=$("#lbi");
const show=(l,i)=>{cl=l;k=(i+L[l].length)%L[l].length;lbi.src=IMG[L[l][k]];lb.classList.add("on")};
document.addEventListener("click",e=>{const b=e.target.closest("[data-l]");if(b)show(b.dataset.l,+b.dataset.k);const z=e.target.closest(".zb");if(z){L.z=[z.dataset.z];show("z",0)}});
lb.onclick=e=>{if(e.target.classList.contains("x")||e.target===lb)lb.classList.remove("on");else if(e.target.classList.contains("pv"))show(cl,k-1);else if(e.target.classList.contains("nx"))show(cl,k+1)};
document.addEventListener("keydown",e=>{if(!lb.classList.contains("on"))return;if(e.key==="Escape")lb.classList.remove("on");if(e.key==="ArrowLeft")show(cl,k-1);if(e.key==="ArrowRight")show(cl,k+1)});
if($("#rf")){$("#dt").min=new Date().toISOString().split("T")[0];
  $("#rf").onsubmit=e=>{e.preventDefault();const v=id=>$("#"+id).value.trim();
    const t="Hello Kshitij Restaurant, I\u2019d like to reserve a table.\nName: "+v("n")+"\nPhone: "+v("ph")+"\nDate: "+v("dt")+"\nTime: "+v("tm")+"\nGuests: "+v("g")+"\nOccasion: "+v("oc")+(v("nt")?"\nNotes: "+v("nt"):"");
    window.open("https://wa.me/919924294440?text="+encodeURIComponent(t),"_blank","noopener")}}
