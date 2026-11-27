export type Entry={id:string;name:string;kind:'income'|'expense';mode:'once'|'monthly'|'installment';amount:number;date:string;duration:number|null};
export type Contribution={id:string;goalId:string;amount:number;date:string};
export type Occurrence=Entry&{part:string|null};
export function monthIndex(s:string):number;
export function shiftMonth(s:string,n:number):string;
export function occurrence(entry:Entry,month:string):Occurrence|null;
export function summarize(entries:Entry[],month:string,rate:number,contributions:Contribution[]):{rows:Occurrence[];income:number;expense:number;saved:number;target:number;balance:number;free:number;afterTarget:number};
export function money(cents:number):string;
