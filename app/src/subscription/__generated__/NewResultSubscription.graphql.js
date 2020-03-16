/**
 * @flow
 * @relayHash 6db374b8a3d277db50fc580dd3eae1d7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewResultSubscriptionVariables = {||};
export type NewResultSubscriptionResponse = {|
  +NewResult: ?{|
    +fitness: ?number,
    +generation: ?number,
    +value: ?number,
    +population: ?$ReadOnlyArray<?number>,
    +populationResultMean: ?number,
  |}
|};
export type NewResultSubscription = {|
  variables: NewResultSubscriptionVariables,
  response: NewResultSubscriptionResponse,
|};
*/


/*
subscription NewResultSubscription {
  NewResult {
    fitness
    generation
    value
    population
    populationResultMean
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "NewResult",
    "storageKey": null,
    "args": null,
    "concreteType": "NewResultPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "fitness",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "generation",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "value",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "population",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "populationResultMean",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NewResultSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "NewResultSubscription",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "NewResultSubscription",
    "id": null,
    "text": "subscription NewResultSubscription {\n  NewResult {\n    fitness\n    generation\n    value\n    population\n    populationResultMean\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3752c881d0fc032025098e0331c834ac';

module.exports = node;
