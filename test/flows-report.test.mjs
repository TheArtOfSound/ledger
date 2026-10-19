import test from 'node:test';
import assert from 'node:assert/strict';
import {parseFlowsReport,privateReview} from '../assets/flows-report.mjs';
const report={kind:'flows-build-evidence-report',schemaVersion:2,route:{title:'A real change'},run:{routeComplete:true,independentVerificationComplete:true},steps:[]};
test('accepts a Flows report without upgrading its claims to verified evidence',()=>{
  const parsed=parseFlowsReport(JSON.stringify(report));
  const review=privateReview(parsed,'Reviewed the diff','a'.repeat(64));
  assert.deepEqual(review.sourceReport,report);
  assert.deepEqual(review.checks,{signatureVerified:false,authorshipVerified:false,testExecutionVerified:false});
  assert.equal(review.classification,'user_reviewed_external_report');
});
test('rejects unrelated, malformed, oversized, and unsupported reports',()=>{
  for(const text of ['no JSON','null','[]',JSON.stringify({...report,kind:'ledger-signed-snapshot'}),JSON.stringify({...report,schemaVersion:3}),JSON.stringify({...report,route:{title:''}}),' '.repeat(2_000_001)])assert.throws(()=>parseFlowsReport(text));
});
