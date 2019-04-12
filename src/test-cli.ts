import { PersonalDataCheckRegionalDef } from "./schema";

import { PersonalDataCheck } from "./index";
import { cs } from "./regional/cs";

const regionalDefs: { [key: string]: PersonalDataCheckRegionalDef } = { cs }

const argv = require('minimist')(process.argv.slice(2));

const input = argv._[0];

const regional = regionalDefs[argv.regional] || undefined;
if (argv.regional) console.log("Regional:", regional ? argv.regional : "Not found");

const checker = new PersonalDataCheck(regional);
console.log(checker.check(input));