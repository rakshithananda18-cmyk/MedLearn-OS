/* global window, document, location, history */
(() => {
  const pages = window.MEDLEARN_PAGES;
  const params = new URLSearchParams(location.search);
  const order = ['landing','welcome','today','plans','calendar','builder','ai','library','search','topic','lesson','studio','knee-sample','drawing','practice','recall','books','profile','account','offline','review','admin','facilitator'];
  let pageId = pages[params.get('page')] ? params.get('page') : 'today';
  let device = ['laptop','tablet','phone'].includes(params.get('device')) ? params.get('device') : 'laptop';
  const product = document.getElementById('product');
  const root = document.getElementById('app');
  const esc = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ui = {
    icon(name,size=20){const svg=window.MEDLEARN_ICONS[name]||window.MEDLEARN_ICONS.Circle;return svg.replace(/width="24"/,'width="'+size+'"').replace(/height="24"/,'height="'+size+'"');},
    image(name,alt,cls=''){return `<img src="assets/posters/${esc(name)}.webp" alt="${esc(alt)}" class="${esc(cls)}">`;},
    button(label,kind='primary',action=''){return `<button type="button" class="dp-btn ${kind==='secondary'?'dp-secondary':kind==='plain'?'dp-plain':''}" ${action?`data-page="${esc(action)}"`:''}>${label}</button>`;},
    status(text,kind=''){return `<span class="dp-status ${esc(kind)}">${esc(text)}</span>`;},
  };
  window.MEDLEARN_UI = ui;
  const navItems=[['today','Today','House'],['plans','Plan','CalendarDays'],['library','Library','BookOpen'],['studio','3D','Box'],['practice','Practice','ClipboardCheck']];
  function render(){
    const page=pages[pageId];
    product.dataset.device=device;
    product.dataset.page=pageId;
    product.dataset.chrome=page.chrome||'study';
    root.innerHTML=page.render(ui);
    const activeNav=page.chrome==='staff'?[['review','Review','ClipboardCheck'],['admin','Admin','Users']]:navItems;
    document.getElementById('product-nav').innerHTML=`<div class="nav-logo">M</div>${activeNav.map(([id,label,icon])=>`<button type="button" data-page="${id}" ${page.nav===id||page.nav==='plan'&&id==='plans'?'aria-current="page"':''}>${ui.icon(icon)}<span>${label}</span></button>`).join('')}<span class="nav-end">${ui.icon('Sun',18)}</span>`;
    document.getElementById('note-title').textContent=page.title;
    document.getElementById('note-goal').textContent=page.goal;
    document.getElementById('note-changes').innerHTML=page.changes.map(item=>`<li>${esc(item)}</li>`).join('');
    document.getElementById('note-acceptance').textContent=page.acceptance;
    document.getElementById('page-picker').value=pageId;
    document.getElementById('preview-label').textContent=`${device[0].toUpperCase()+device.slice(1)} · ${page.title} · proposed design`;
    document.querySelectorAll('[data-device]').forEach(el=>{if(el.tagName==='BUTTON')el.setAttribute('aria-pressed',String(el.dataset.device===device));});
    document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=ui.icon(el.dataset.icon));
    document.title=`${page.title} · MedLearn design proposal`;
    params.set('page',pageId);params.set('device',device);history.replaceState(null,'',location.pathname+'?'+params);
    window.MEDLEARN_READY={page:pageId,device};
  }
  const picker=document.getElementById('page-picker');
  for(const id of order){if(!pages[id])continue;const option=document.createElement('option');option.value=id;option.textContent=pages[id].title;picker.append(option);}
  picker.addEventListener('change',()=>{pageId=picker.value;render();});
  document.addEventListener('click',event=>{
    const pageButton=event.target.closest('button[data-page],a[data-page]');if(pageButton&&pages[pageButton.dataset.page]){pageId=pageButton.dataset.page;render();return;}
    const deviceButton=event.target.closest('button[data-device]');if(deviceButton){device=deviceButton.dataset.device;render();return;}
    const demo=event.target.closest('[data-demo]');
    if(demo){
      if(demo.dataset.demo==='reveal'){root.querySelectorAll('.dp-reveal').forEach(el=>el.hidden=false);demo.hidden=true;}
      else if(demo.dataset.demo==='answer'){root.querySelectorAll('.dp-choice').forEach(el=>el.classList.remove('dp-active'));demo.classList.add('dp-active');const feedback=root.querySelector('[data-feedback]');if(feedback){feedback.hidden=false;feedback.textContent=demo.dataset.correct==='true'?'Correct. Read the explanation, then continue.':'Look once more. Compare the relevant relationship, then try again.';}}
      else {demo.classList.toggle('dp-active');demo.setAttribute('aria-pressed',String(demo.classList.contains('dp-active')));}
    }
  });
  document.getElementById('theme-toggle').addEventListener('click',event=>{const dark=product.dataset.theme!=='dark';product.dataset.theme=dark?'dark':'light';event.currentTarget.setAttribute('aria-pressed',String(dark));event.currentTarget.textContent=dark?'Light preview':'Night preview';});
  document.getElementById('notes-toggle').addEventListener('click',event=>{const hidden=document.querySelector('.review-layout').classList.toggle('hide-notes');event.currentTarget.setAttribute('aria-expanded',String(!hidden));});
  if(params.get('export')==='1')document.body.classList.add('export');
  if(params.get('theme')==='dark')product.dataset.theme='dark';
  render();
})();
