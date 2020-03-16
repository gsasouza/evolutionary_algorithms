!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t){e.exports=require("graphql")},function(e,t){e.exports=require("cluster")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("redis")},function(e,t){e.exports=require("graphql-subscriptions")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("kcors")},function(e,t){e.exports=require("koa-router")},function(e,t){e.exports=require("koa-graphql")},function(e,t){e.exports=require("graphql-playground-middleware-koa")},function(e,t){e.exports=require("subscriptions-transport-ws")},function(e,t,r){e.exports=r(13)},function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(2),s=r.n(a),i=r(3);const l=r.n(i).a.createClient();l.on("error",(function(e){console.error(e)}));const u=e=>new Promise((t,r)=>{l.lrange(e,0,-1,(function(e,n){e&&r(e),t(n)}))}),p=(e,t,r)=>{if("object"==typeof t){const n=JSON.stringify(t);return l.rpush([e,n],r)}return l.rpush([e,t],r)},c=(e,t)=>l.llen(e,t),T=e=>new Promise((t,r)=>{l.get(e,(e,n)=>{e&&r(e),t(n)})});var I=l;const f=e=>{const t=e%global.workers.length;return global.workers[t]},b="CREATE",g="TEST",S="SELECTION",L="ANALYZE",E=(e=O[0],t=O[1])=>Math.random()*(t-e+1)+e,O=[0,100],y=(e,t)=>{const r=JSON.parse(e||"{}"),n=JSON.parse(t||"{} ");return Number.parseFloat(r.result)>Number.parseFloat(n.result)?r:n},d=()=>{const e=E();return p("POPULATION_LIST",e,()=>process.send({type:q.CREATED_INDIVIDUALS}))},h=()=>{c("POPULATION_LIST",(e,t)=>{if(global.step===b)return 2e3===t?(global.step=g,_()):void 0})};function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(Object(r),!0).forEach((function(t){A(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const v=({payload:e})=>{const{individual:t}=e,r=(n=Number.parseFloat(t),2*Math.cos(.39*n)+5*Math.sin(.5*n)+.5*Math.cos(.1*n)+10*Math.sin(.7*n)+5*Math.sin(1*n)+5*Math.sin(.35*n));var n;return p("TESTED_LIST",{value:t,result:r},()=>{process.send({type:q.TESTED_INDIVIDUALS})})},_=async()=>{(await u("POPULATION_LIST")).forEach((e,t)=>{f(t).send({type:Q.TEST_INDIVIDUAL,payload:{individual:e}})})},m=async()=>{const e=await u("TESTED_LIST"),t=await P(e);await(async e=>{const{generationsWithRate:t,lastChange:r,maxGenerationsWithRate:n,baseRate:o}=global.mutationConfig;if(n){if(t>=n){if(r&&"decrease"===r)return void(global.mutationConfig=D({},global.mutationConfig,{generationsWithRate:0,rate:10*o,maxGenerationsWithRate:50,lastChange:"increase"}));global.mutationConfig=D({},global.mutationConfig,{generationsWithRate:0,rate:o,maxGenerationsWithRate:0,lastChange:null})}return}const a=await u("PAST_LIST"),s=a.slice(Math.max(a.length-100,0)),i=s.reduce((e,t)=>e+Number.parseFloat(t),0)/s.length;console.log(i,Math.abs(i-e.result)),Math.abs(i-e.result)<1e-13&&(global.mutationConfig=D({},global.mutationConfig,{generationsWithRate:0,rate:o/10,maxGenerationsWithRate:100,lastChange:"decrease"}))})(t),(e=>{I.set("BEST_RESULT",JSON.stringify(e)),I.del("POPULATION_LIST"),p("POPULATION_LIST",Number.parseFloat(e.value))})(t),e.filter((e,r)=>r!==t.index).forEach((e,t)=>{f(t).send({type:Q.SELECT_INDIVIDUAL,payload:{individual:e,mutationConfig:global.mutationConfig}})})},P=async e=>e.reduce((e,t,r)=>{const{result:n,value:o}=JSON.parse(t);return n>e.result?{value:o,result:n,index:r}:e},{result:0});var w=r(4);const R={NEW:"NEW_RESULT"};var U=new w.PubSub;function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const M=async({payload:e})=>{const{mutationConfig:t}=e,r=await u("TESTED_LIST"),n=((e,t)=>{const{rate:r}=t,n=.5*O[1],o=e+(E(O[0],n)-E(O[0],n))*r;return o>O[1]?o-O[1]:o<O[0]?o+O[1]:o})(await(async e=>{const t=await T("BEST_RESULT"),r=y(e[Math.round(E(0,1998))],e[Math.round(E(0,1998))]),n=y(e[Math.round(E(0,1998))],e[Math.round(E(0,1998))]);return(Number.parseFloat(r.value)+Number.parseFloat(n.value)+Number.parseFloat(JSON.parse(t).value))/3})(r),t);p("POPULATION_LIST",n,()=>process.send({type:q.SELECTED_INDIVIDUALS}))},x=()=>(global.step=b,I.del("TESTED_LIST"),h()),G=async()=>{global.mutationConfig=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){j(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},global.mutationConfig,{generationsWithRate:global.mutationConfig.generationsWithRate+1});const e=await T("GENERATIONS")||1,t=await T("BEST_RESULT"),{result:r,value:n}=JSON.parse(t);if(p("PAST_LIST",r),I.set("GENERATIONS",`${Number.parseInt(e)+1}`),process.env.TERMINAL)return console.log(`${Number.parseInt(e)}# FITNESS: ${r}, MUTATION RATE: ${global.mutationConfig.rate}`);const o=await u("TESTED_LIST"),a=await u("POPULATION_LIST"),s=o.reduce((e,t)=>{const r=JSON.parse(t);return e+Number.parseFloat(r.result)},0)/o.length;return p("PAST_POPULATION_MEAN_LIST",s),(async({generation:e,fitness:t,value:r,population:n,populationResultMean:o})=>{await U.publish(R.NEW,{NewResult:{fitness:t,generation:e,value:r,population:n,populationResultMean:o}})})({generation:Number.parseInt(e),fitness:r,value:Number.parseFloat(n),population:a.map(e=>Number.parseFloat(e)),results:o,populationResultMean:s})},V=async()=>{if(await G(),process.env.TERMINAL)return x();setTimeout(x,100)},Q={CREATE_POPULATION_INDIVIDUAL:"CREATE_POPULATION_INDIVIDUAL",TEST_INDIVIDUAL:"TEST_INDIVIDUAL",SELECT_INDIVIDUAL:"SELECT_INDIVIDUAL"},q={START:"START",CREATED_INDIVIDUALS:"CREATED_INDIVIDUALS",TESTED_INDIVIDUALS:"TESTED_INDIVIDUALS",SELECTED_INDIVIDUALS:"SELECTED_INDIVIDUALS"};var F=({type:e})=>{switch(e){case q.START:return new Array(2e3).fill(null).forEach((e,t)=>{f(t).send({type:Q.CREATE_POPULATION_INDIVIDUAL})});case q.CREATED_INDIVIDUALS:return h();case q.TESTED_INDIVIDUALS:return void c("TESTED_LIST",async(e,t)=>{if(global.step===g)return 2e3===t?(global.step=S,m()):void 0});case q.SELECTED_INDIVIDUALS:return void c("POPULATION_LIST",(e,t)=>{if(global.step===S)return 2e3===t?(global.step=L,V()):void 0});default:return}},k=r(5),W=r(6),J=r.n(W),B=r(7),$=r.n(B),Y=r(8),Z=r.n(Y),z=r(9),H=r.n(z),K=r(10),X=r.n(K),ee=r(11),te=r(0);var re={type:new te.GraphQLObjectType({name:"NewResultPayload",fields:()=>({fitness:{type:te.GraphQLFloat,resolve:({fitness:e})=>e},value:{type:te.GraphQLFloat,resolve:({value:e})=>e},generation:{type:te.GraphQLInt,resolve:({generation:e})=>e},population:{type:new te.GraphQLList(te.GraphQLFloat),resolve:({population:e})=>e},populationResultMean:{type:te.GraphQLFloat,resolve:({populationResultMean:e})=>e}})}),subscribe:()=>U.asyncIterator(R.NEW)},ne=new te.GraphQLObjectType({name:"Subscription",fields:{NewResult:re}});const oe=new te.GraphQLObjectType({name:"Result",description:"Result data",fields:()=>({fitness:{type:te.GraphQLFloat,resolve:({fitness:e})=>e},value:{type:te.GraphQLFloat,resolve:({value:e})=>e},generation:{type:te.GraphQLInt,resolve:({generation:e})=>e},population:{type:new te.GraphQLList(te.GraphQLFloat),resolve:({population:e})=>e},pastResults:{type:new te.GraphQLList(te.GraphQLFloat),resolve:async()=>u("PAST_LIST")},populationResultsMean:{type:Object(te.GraphQLList)(te.GraphQLFloat),resolve:async()=>u("PAST_POPULATION_MEAN_LIST")}})}),ae=new te.GraphQLObjectType({name:"Query",description:"The root of all... queries",fields:()=>({status:{type:te.GraphQLString,resolve:()=>"online"},results:{type:oe,resolve:()=>({fitness:0,generation:0})}})});var se=new te.GraphQLSchema({query:ae,subscription:ne});global.workers=[],global.step=b,global.mutationConfig={baseRate:.1,rate:.1,generationsWithRate:0,maxGenerationsWithRate:0,lastChange:null};const ie=s.a.cpus().length;var le=()=>{I.del("POPULATION_LIST"),I.del("TESTED_LIST"),I.del("PAST_LIST"),I.del("GENERATIONS"),I.del("BEST_RESULT"),I.del("PAST_POPULATION_MEAN_LIST");for(let e=0;e<ie;e++){const e=o.a.fork();global.workers.push(e),e.on("message",e=>F(e))}(()=>{const e=new J.a,t=new Z.a;t.all("/playground",X()({endpoint:"/graphql",subscriptionEndpoint:"ws://localhost:5000/subscriptions"})),t.all("/graphql",H()({schema:se,graphiql:!1})),e.use($()()),e.use(t.routes()).use(t.allowedMethods());const r=Object(k.createServer)(e.callback());r.listen(5e3,()=>{console.log("Server started on port 5000"),ee.SubscriptionServer.create({onConnect:e=>console.log("Client subscription connected!",e),onDisconnect:()=>console.log("Client subscription disconnected!"),execute:te.execute,subscribe:te.subscribe,schema:se},{server:r,path:"/subscriptions"})})})(),F({type:q.START})};var ue=e=>{const{type:t}=e;switch(t){case Q.CREATE_POPULATION_INDIVIDUAL:return d();case Q.TEST_INDIVIDUAL:return v(e);case Q.SELECT_INDIVIDUAL:return M(e);default:return}};var pe=()=>{o.a.worker.on("message",e=>ue(e))};o.a.isMaster?le():pe(),o.a.on("exit",e=>{console.log("mayday! mayday! worker",e.id," is no more!"),o.a.fork()}),o.a.on("online",(function(e){console.log("Worker "+e.process.pid+" is listening")}))}]);