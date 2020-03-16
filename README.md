# evolutionary_algorithms

A study of evolutionary algorithms with JavaScript.

## Server

Server works in cluster mode, and process individuals in parallel to improve performance, the algorithm steps can be modified changing the constraints file.


## App

I use a react app to visualize the progress over generations, it works with graphql subscriptions to fetch real time updated data.

## How to use

### Dependencies 
  - Redis
  - NodeJs
  
### Start server
  `yarn && yarn build && yarn start`
  
### Start app
  `yarn && yarn relay && yarn start`
