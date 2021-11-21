# nbs-assessment

Project Manager Assessment Exercise for James Nurse

---

## Goal:

We have supplied a file (“items.json”) which contains a list of items, expressed as a JSON array of items. A  number of the items are present within this file more than once and the URL shortener will need to detect  these so that the same short code can be issued for them.

Your task is to:

* Parse the items in the file
* Output any item that is repeated, along with the total number of repeated items in the list
 
Please note that the applications that generate these shortcode creation requests do not maintain a  consistent ordering of keys when serialising the objects. The key order should not be treated as significant – i.e. keys referring to the same item can be ordered in different ways.

You can complete the test in a language of your choice and as part of the final stage interview you will be  asked to present back your solution and describe the logic you have implemented.



# Getting Started

## Pre-requisites
Node installed which can be installed [here](https://nodejs.org/en/download/)

Docker installed which can be installed [here](https://www.docker.com/)

run `npm install`

## Usage

* To run a webserver where you can test using postman `npm run start`
* Instantiates up an instance of the webserver, runs the mocha tests & tears webserver down. `run run test`

---
# Choices

## NodeJS / Express
I used NodeJS as my server for swiftness of building, it is relatively quick to set up from scratch. I've normally used Express with a framework, such as Sails due to the amount of best practices it enforces out the box, however decided to use the minimal framework to show I can set up &  structure code in an understandable way without as many helper functions. Node also has one of the quickest boot-up times, & is nice to use in serverless applications as the minimal framework with express required to get a REST API up means it's lightweight and fast.

---
# Tools

## Swagger docs
Swagger documentation can be found at /api-docs

---
# Improvements


## Server

* Add DTO file & models
  * Having an in & out model will allow me to put validation on the route
* Remove service code from the router, as router should be simpler
* Production ready the app
  * If I was making this production ready I would remove tools such as nodemon which is a development tool rather than a production tool & dockerise it.

## CI/CD

* Use IAC to spool up an environment
* Implement a CI/CD scripts.

## Testing

* I used this opportunity to learn a bit about the Mocha framework, I think that there are a number of places where I could implement things significantly better. I plan to go back & look at this on a weekend where I have more than a few hours spare.
