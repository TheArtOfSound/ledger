import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html');
const js=read('assets/index-qira-e1676cfd7b.js');
const css=read('assets/ledger-home-clarity-20261119.css');
const tick=String.fromCharCode(96);
assert(html.includes('href="https://ledger.imagineqira.com/"'));
assert.match(html,/<title>Ledger — Show your AI work with a signed record<\/title>/);
assert(html.includes('/assets/ledger-home-clarity-20261119.css'));
assert(html.includes('/assets/index-qira-e1676cfd7b.js?v=claims-20261119'));
assert(html.includes('A signature can establish record integrity, not professional skill.'));
assert(js.includes('Show your AI work. Back it with a signed record.'));
assert(js.includes('Your activity · your device · your choice'));
assert(js.includes('A reader can check whether published bytes changed.'));
assert(js.includes('not proof of skill, identity, authorship, or outcomes.'));
assert(js.includes('PROFILE EXAMPLE / CHECK THE SOURCE'));
assert(js.includes('Its source may be historical or in sample mode.'));
assert(js.includes('See a Ledger record. Check what it proves.'));
assert(!js.includes('A LIVE, SIGNED PROFILE'));
assert(!js.includes('See it working — on real, measured data.'));
assert(!js.includes('Not a token tracker, not an expertise score, and not a leaderboard.'));
assert(js.includes('Ge=We.flatMap(e=>e.lines);function Ke(){let[e,t]=(0,_.useState)(2)'),'Recorded demo must not start blank');
const h=js.slice(js.indexOf('e.name==='+tick+'home'+tick),js.indexOf('e.name==='+tick+'home'+tick)+3400);
assert(h.includes('Inspect an example profile →'));
assert(h.includes('Create your Ledger profile'));
assert(!h.includes('children:'+tick+'Browse people'+tick),'Do not duplicate directory choice in the hero');
assert(h.includes('(0,T.jsx)(Ke,{})')&&h.includes('(0,T.jsx)(Je,{})'),'Keep CLI demo and tour');
assert(css.includes('main#top > section.hero'),'Scope layout to homepage');
assert(css.includes('body.jobsite:has(main#top > section.hero) .mobile-cta-bar{display:none}'));
assert(css.includes('prefers-reduced-motion:reduce'));
assert(css.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));

const verify=read('verify/index.html');
const people=read('people/index.html');
const employer=read('employer/index.html');
const fallback=read('404.html');
for(const page of [html,verify,people,employer,fallback]){
  assert(page.includes('/assets/index-qira-e1676cfd7b.js?v=claims-20261119'), 'Critical routes must not ship stale verification claims');
}
assert(js.includes('Profiles may point to a Ledger-hosted or self-hosted signed snapshot.'));
assert(js.includes('View signed snapshot'));
assert(js.includes('Snapshot link unavailable'));
assert(!js.includes('Every profile in this directory is backed by a snapshot the member hosts themselves'));
assert(!js.includes('self-hosted by member'));
assert(verify.includes('Verify a signed snapshot'), 'Verification metadata must not overstate independence');

console.log('Ledger homepage and claim-boundary source contracts PASS');
