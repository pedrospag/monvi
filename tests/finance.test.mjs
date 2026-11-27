import test from 'node:test';import assert from 'node:assert/strict';import {occurrence,summarize,shiftMonth} from '../lib/finance.mjs';
const e={id:'a',name:'Notebook',kind:'expense',mode:'installment',amount:10000,date:'2027-01-31',duration:3};
test('parcelas preservam centavos e vencimento',()=>{assert.deepEqual(['2027-01','2027-02','2027-03'].map(m=>occurrence(e,m).amount),[3334,3333,3333]);assert.equal(occurrence(e,'2027-02').date,'2027-02-28');assert.equal(occurrence(e,'2027-04'),null)});
test('recorrência finita e pontual',()=>{assert.equal(occurrence({...e,mode:'monthly',duration:2},'2027-03'),null);assert.equal(occurrence({...e,mode:'once'},'2027-02'),null);assert.equal(occurrence({...e,mode:'monthly',duration:null},'2028-01').amount,10000)});
test('saldo, meta e aportes sem duplicação',()=>{const s=summarize([e,{...e,id:'b',kind:'income',mode:'monthly',duration:null,amount:300000}],'2027-02',20,[{date:'2027-02-01',amount:50000}]);assert.equal(s.income,300000);assert.equal(s.expense,3333);assert.equal(s.target,60000);assert.equal(s.free,246667);assert.equal(s.afterTarget,236667)});
test('virada de ano',()=>assert.equal(shiftMonth('2027-12',1),'2028-01'));
