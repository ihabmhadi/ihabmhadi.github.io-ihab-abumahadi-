const b=document.querySelector('#theme');if(localStorage.getItem('theme')==='light')document.body.classList.add('light');b?.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark')});

// Static GitHub Pages submission: prepare a mailto message in the visitor's email app.
const ideaForm=document.getElementById('ideaForm');
if(ideaForm){ideaForm.addEventListener('submit',function(event){
 event.preventDefault();
 if(!ideaForm.reportValidity())return;
 const get=id=>document.getElementById(id).value.trim();
 const subject='Collaboration idea: '+get('ideaType');
 const body=['New collaboration proposal','', 'Name: '+get('ideaName'),'Email: '+get('ideaEmail'),'Category: '+get('ideaType'),'','Project idea:',get('ideaDescription'),'','Proposed collaboration:',get('ideaCollab')||'Not specified'].join('\n');
 document.getElementById('ideaStatus').textContent='Your email application should open with the proposal. Please press Send there to submit it.';
 window.location.href='mailto:ihab.mhadi@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});}

// Optional hosted submission service. Configure an actual Formspree endpoint in portal-config.js.
const portalForm=document.getElementById('portalForm');
if(portalForm)portalForm.addEventListener('submit',async function(e){
 e.preventDefault();if(!portalForm.reportValidity())return;
 const status=document.getElementById('portalStatus'),submit=document.getElementById('pSubmit');
 const data=new FormData(portalForm);const ref='IA-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+(crypto.randomUUID?crypto.randomUUID().slice(0,8).toUpperCase():Math.random().toString(36).slice(2,10).toUpperCase());data.set('proposal_reference',ref);data.set('_subject','New collaboration proposal '+ref);
 const endpoint=window.PORTAL_FORM_ENDPOINT||'';
 if(endpoint){submit.disabled=true;status.textContent='Sending your proposal…';try{const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'}});if(!response.ok)throw Error('Submission service returned '+response.status);status.textContent='Proposal submitted successfully. Your reference: '+ref+'. Save this number for future correspondence. Submission does not imply acceptance.';portalForm.reset();}catch(err){status.textContent='Online submission could not be confirmed. Please retry or use the email option. No reference has been registered.';}finally{submit.disabled=false;}return;}
 const entries=[...data.entries()].filter(([key])=>!key.startsWith('_')).map(([key,value])=>key+': '+value).join('\n\n');const subject='Collaboration proposal '+ref+' — '+data.get('project_title');
 status.textContent='Your email application should open. You must press Send in that application to deliver the proposal. Your draft reference is '+ref+' (not registered until sent).';
 window.location.href='mailto:ihab.mhadi@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(entries);
});

// V7: accessible project category filters
const projectFilters=document.querySelectorAll('.filter-btn[data-filter]');
projectFilters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;projectFilters.forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});document.querySelectorAll('.project-card[data-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;});}));
