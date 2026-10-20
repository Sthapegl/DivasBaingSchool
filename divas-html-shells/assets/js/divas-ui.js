/* divas-ui.js — progressive enhancement only. Pages stay readable without JS.
   PREVIEW ONLY: nothing here authenticates, saves, calculates authoritative prices or processes payments. */
(function(){
 var doc=document,root=doc.documentElement;
 root.classList.add("dbs-js");
 var $=function(s,c){return(c||doc).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||doc).querySelectorAll(s))};

 /* Mobile navigation */
 var tg=$("[data-dbs-nav-toggle]"),nav=tg&&doc.getElementById(tg.getAttribute("aria-controls"));
 function navSet(o){nav.classList.toggle("is-open",o);tg.setAttribute("aria-expanded",o);tg.textContent=o?"Close":"Menu"}
 if(tg&&nav){tg.addEventListener("click",function(){navSet(!nav.classList.contains("is-open"))});
  doc.addEventListener("keydown",function(e){if(e.key==="Escape"&&nav.classList.contains("is-open")){navSet(false);tg.focus()}})}

 /* Dismissible notices */
 $$("[data-dbs-dismissible]").forEach(function(a){var b=doc.createElement("button");b.type="button";b.className="dbs-alert-close";b.setAttribute("aria-label","Dismiss notice");b.innerHTML="&times;";a.appendChild(b)});
 /* Footer year */
 $$("[data-dbs-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
 /* Show/hide a target from a checkbox */
 function syncToggle(c){var t=doc.getElementById(c.getAttribute("data-dbs-toggle"));if(t)t.hidden=!c.checked}
 $$("[data-dbs-toggle]").forEach(syncToggle);
 /* Accordions: expand / collapse all */
 $$("[data-dbs-accordion-all]").forEach(function(b){b.hidden=false});
 /* Tabs */
 $$("[data-dbs-tabs]").forEach(function(w){
  var tabs=$$("[role=tab]",w),panels=$$("[role=tabpanel]",w);
  function sel(t,focus){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1});panels.forEach(function(p){p.hidden=p.id!==t.getAttribute("aria-controls")});if(focus)t.focus()}
  tabs.forEach(function(t,i){t.addEventListener("click",function(){sel(t)});
   t.addEventListener("keydown",function(e){var n=e.key==="ArrowRight"?i+1:e.key==="ArrowLeft"?i-1:e.key==="Home"?0:e.key==="End"?tabs.length-1:-1;if(n>-1){e.preventDefault();sel(tabs[(n+tabs.length)%tabs.length],true)}})});
  sel(tabs[0]);
 });

 /* Cart demo (SAMPLE figures only) */
 var money=function(n){return"R "+n.toFixed(2)};
 function cartCalc(){
  var sum=0,items=$$("[data-dbs-cart-item]");
  items.forEach(function(li){var q=Math.max(1,parseInt($("[data-dbs-qty]",li).value,10)||1),p=parseFloat(li.getAttribute("data-dbs-sample-price"))||0;$("[data-dbs-line-total]",li).textContent=money(p*q);sum+=p*q});
  var s=$("[data-dbs-sample-subtotal]");if(s)s.textContent=money(sum);
  var e=$("[data-dbs-cart-empty]"),l=$("[data-dbs-cart-list]"),sm=$("[data-dbs-cart-summary]");
  if(e){e.hidden=items.length>0}if(l)l.hidden=items.length===0;if(sm)sm.hidden=items.length===0;
  var c=$("[data-dbs-cart-count]");if(c)c.textContent=items.reduce(function(a,li){return a+(parseInt($("[data-dbs-qty]",li).value,10)||1)},0);
 }
 var removeTarget=null,opener=null;

 doc.addEventListener("click",function(e){
  var t;
  if(t=e.target.closest("[data-dbs-toggle-password]")){var i=doc.getElementById(t.getAttribute("data-dbs-toggle-password")),show=i.type==="password";i.type=show?"text":"password";t.textContent=show?"Hide":"Show";t.setAttribute("aria-pressed",show);t.setAttribute("aria-label",(show?"Hide":"Show")+" password");return}
  if(t=e.target.closest(".dbs-alert-close")){var a=t.closest(".dbs-alert");a.hidden=true;return}
  if(t=e.target.closest("[data-dbs-accordion-all]")){var open=t.getAttribute("data-dbs-accordion-all")==="open";$$("details.dbs-accordion").forEach(function(d){if(!d.hidden)d.open=open});return}
  if(t=e.target.closest("[data-dbs-qty-step]")){var li=t.closest("[data-dbs-cart-item]"),q=$("[data-dbs-qty]",li);q.value=Math.max(1,(parseInt(q.value,10)||1)+parseInt(t.getAttribute("data-dbs-qty-step"),10));cartCalc();return}
  if(t=e.target.closest("[data-dbs-open-dialog]")){var d=doc.getElementById(t.getAttribute("data-dbs-open-dialog"));opener=t;removeTarget=t.closest("[data-dbs-cart-item]");if(d&&d.showModal)d.showModal();return}
  if(t=e.target.closest("[data-dbs-confirm-remove]")){if(removeTarget){var n=removeTarget.nextElementSibling||removeTarget.previousElementSibling;removeTarget.remove();removeTarget=null;cartCalc();opener=n?$("[data-dbs-open-dialog]",n):$("[data-dbs-cart-empty] a")}t.closest("dialog").close();if(opener&&opener.focus)opener.focus();return}
  if(t=e.target.closest("[data-dbs-close-dialog]")){t.closest("dialog").close();if(opener&&opener.focus&&doc.contains(opener))opener.focus();return}
 });
 doc.addEventListener("change",function(e){
  if(e.target.matches("[data-dbs-toggle]"))syncToggle(e.target);
  if(e.target.matches("[data-dbs-qty]"))cartCalc();
 });
 cartCalc();

 /* Validation (placeholder forms) */
 function errBox(el){var b=doc.getElementById(el.id+"-err");if(!b){b=doc.createElement("span");b.className="dbs-error-text";b.id=el.id+"-err";b.setAttribute("aria-live","polite");var h=el.closest(".dbs-choice")||el.parentNode;h.appendChild(b)}return b}
 function message(el){
  var v=el.validity;
  if(el.hasAttribute("data-dbs-match")){var o=doc.getElementById(el.getAttribute("data-dbs-match"));if(o&&el.value&&el.value!==o.value)return"Passwords do not match."}
  if(v.valueMissing)return el.type==="checkbox"?"Please tick this box to continue.":el.type==="radio"?"Please choose an option.":"This field is required.";
  if(v.typeMismatch)return el.type==="email"?"Enter a valid email address, e.g. name@example.com.":"Enter a valid value.";
  if(v.tooShort)return"Use at least "+el.minLength+" characters.";
  return el.validationMessage||""}
 function check(el){var m=message(el);errBox(el).textContent=m;m?el.setAttribute("aria-invalid","true"):el.removeAttribute("aria-invalid");el.classList.toggle("is-valid",!m&&!!el.value&&el.type!=="checkbox"&&el.type!=="radio");return!m}
 $$("form[data-dbs-preview]").forEach(function(f){f.noValidate=true;
  f.addEventListener("submit",function(e){e.preventDefault();var bad=null;
   $$("input,select,textarea",f).forEach(function(el){if(el.type==="submit"||el.type==="button"||el.closest("[hidden]"))return;if(!check(el)&&!bad)bad=el});
   var n=$("[data-dbs-preview-notice]",f);
   if(bad){bad.focus();if(n)n.hidden=true;return}
   if(n){n.hidden=false;n.focus()}
  });
  f.addEventListener("input",function(e){var el=e.target;if(el.hasAttribute("aria-invalid")||el.hasAttribute("data-dbs-match"))check(el);
   $$("[data-dbs-match=\""+el.id+"\"]",f).forEach(function(m){if(m.value)check(m)})});
  f.addEventListener("focusout",function(e){var el=e.target;if(el.matches("input,textarea,select")&&el.value)check(el)});
 });

 /* Password confirmation live feedback */
 $$("[data-dbs-match]").forEach(function(c){var o=doc.getElementById(c.getAttribute("data-dbs-match")),b=doc.createElement("span");b.className="dbs-success-text";b.setAttribute("aria-live","polite");c.closest(".dbs-form-field").appendChild(b);
  function upd(){b.textContent=c.value&&o.value&&c.value===o.value?"Passwords match.":""}c.addEventListener("input",upd);o.addEventListener("input",upd)});

 /* FAQ search */
 var s=$("[data-dbs-faq-search]");
 if(s){s.addEventListener("input",function(){var q=s.value.trim().toLowerCase(),n=0;$$("[data-dbs-faq-item]").forEach(function(d){var m=!q||d.textContent.toLowerCase().indexOf(q)>-1;d.hidden=!m;if(m)n++});
  var em=$("[data-dbs-faq-empty]");if(em)em.hidden=n>0;var st=$("[data-dbs-faq-count]");if(st)st.textContent=q?n+" matching question"+(n===1?"":"s"):""})}
})();
