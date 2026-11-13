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
