# BE TESTING
# Features
- Fundamental of Express
- Fundamental of Mongoose
- RESTful API
- CRUD operations with MongoDB
# Project Structure
- server.js : Responsible for connecting the MongoDB and starting the server.
- app.js : Configure everything that has to do with Express application. 
- config.env: for Enviroment Varaiables
- routes -> The goal of the route is to guide the request to the correct handler function which will be in one of the controllers
- controllers -> Handle the application request, interact with models and send back the response to the client 
- models -> (Business logic) related to business rules, how the business works and business needs ( Creating new user in the database, checking if the user password is correct, validating user input data)
