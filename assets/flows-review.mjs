import {MAX_REPORT_BYTES,parseFlowsReport,privateReview} from './flows-report.mjs';
const byId=id=>document.getElementById(id),allowedOrigin='https://flows.oortstack.com';
let report=null,original='',checksum='',generation=0,received=false;
const nonce=new URLSearchParams(location.hash.slice(1)).get('handoff');
if(nonce)history.replaceState(null,'',location.pathname+location.search);
const error=message=>{byId('report-error').textContent=message;if(message){report=null;original='';checksum='';byId('review').hidden=true;}};
function summary(label,value){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;byId('report-summary').append(dt,dd);}
function count(value){return Number.isSafeInteger(value)&&value>=0?String(value):'Not recorded';}
async function load(text){
  const current=++generation;
  try{
    const value=parseFlowsReport(text);
    const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
    if(current!==generation)return;
    report=value;original=text;checksum=[...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
    byId('report-summary').replaceChildren();byId('review-notes').value='';
    byId('review-title').textContent=value.route.title.slice(0,300);
    summary('Exported',typeof value.exportedAt==='string'?value.exportedAt.slice(0,80):'Not recorded');
    summary('Steps reported',`${count(value.run.stepsVerified)} of ${count(value.run.stepsTotal)}`);
    summary('Checks reported',`${count(value.run.checksPassed)} of ${count(value.run.checksTotal)}`);
    summary('Route status',value.run.routeComplete===true?'Reported complete by Flows':'Incomplete or not recorded');
    summary('Repository',typeof value.project?.repository==='string'?value.project.repository.slice(0,500):'Not recorded');
    summary('Report checksum',checksum);
    byId('report-json').textContent=text;byId('review').hidden=false;error('');
    byId('handoff-status').textContent='Report opened privately. Review its claims below and save a copy when you are ready.';
    byId('review-title').focus();
  }catch(e){if(current===generation)error(e instanceof Error?e.message:'Could not open this report.');}
}
byId('report-file').addEventListener('change',async event=>{const file=event.target.files?.[0];event.target.value='';if(!file)return;if(file.size>MAX_REPORT_BYTES){error('Choose a report smaller than 2 MB.');return;}try{await load(await file.text());}catch{error('This file could not be read. Choose it again.');}});
function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
byId('save-review').addEventListener('click',()=>{if(report)download('qira-ledger-private-review.json',JSON.stringify(privateReview(report,byId('review-notes').value,checksum),null,2));});
byId('save-original').addEventListener('click',()=>{if(report)download('flows-evidence-report.json',original);});
let readyTimer;
function stop(){clearInterval(readyTimer);window.removeEventListener('message',receive);}
async function receive(event){
  if(received||event.origin!==allowedOrigin||event.source!==window.opener||event.data?.type!=='qira:flows-report'||event.data.nonce!==nonce)return;
  received=true;stop();
  try{const text=JSON.stringify(event.data.report);parseFlowsReport(text);await load(text);event.source.postMessage({type:'qira:ledger-received',nonce},allowedOrigin);}catch(e){error(e instanceof Error?e.message:'Could not receive this report.');}
}
if(nonce&&/^[a-f0-9-]{36}$/.test(nonce)&&window.opener){
  byId('handoff-status').textContent='Waiting for your Flows report. Keep the Flows tab open until it arrives.';
  window.addEventListener('message',receive);
  const ready=()=>window.opener?.postMessage({type:'qira:ledger-ready',nonce},allowedOrigin);
  ready();readyTimer=setInterval(ready,500);setTimeout(()=>{stop();if(!received)byId('handoff-status').textContent='The direct handoff expired. Download JSON in Flows and open it here, or try Review in Ledger again.';},120000);
}
