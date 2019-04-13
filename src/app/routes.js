import { routes as accounts } from './accounts';
import { routes as transactions } from './transactions';
import { routes as budgets } from './budgets';

/*
* Spread syntax: allows an iterable to expand in places
* where 0 or more arguments are expected.
*/
export default [...accounts, ...transactions, ...budgets];
