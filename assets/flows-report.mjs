export const MAX_REPORT_BYTES=2_000_000;
export function parseFlowsReport(text){
  if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_REPORT_BYTES)throw new Error('Choose a report smaller than 2 MB.');
  let value;try{value=JSON.parse(text);}catch{throw new Error('This file is not valid JSON. Export the JSON evidence report from Flows.');}
  if(!value||Array.isArray(value)||value.kind!=='flows-build-evidence-report'||value.schemaVersion!==2||typeof value.route?.title!=='string'||!value.route.title.trim()||!Array.isArray(value.steps)||!value.run||typeof value.run!=='object'||Array.isArray(value.run))throw new Error('Choose a Flows evidence report (version 2). Run packs and signed Ledger snapshots use their own import paths.');
  return value;
}
export function privateReview(report,notes,checksum){
  return {kind:'ledger-flows-private-review',schemaVersion:1,reviewedAt:new Date().toISOString(),classification:'user_reviewed_external_report',sourceReportSha256:checksum,notes:String(notes).slice(0,10000),checks:{signatureVerified:false,authorshipVerified:false,testExecutionVerified:false},sourceReport:report};
}
