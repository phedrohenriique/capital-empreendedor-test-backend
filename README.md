# CE Test - Web Server

## Running the server

Run `npm run dev` to run the server on `http://localhost:8800/`. The server will  **Automatically Reload** if you change any of the source files, since nodemon library was installed.

## Server

The server was build on two main files, server.js and router.js

The server was intended to have full control and rewrite the data.json file ( simulating an DB ).
the functions in the functions.js file were used in all the endpoints for data manipulations and communication with the client side.

The cors library was added to handle eventual inconsistencies in http protocol from client side and adjust the payload headers through the requests.

## Routes

the routes can be seen and adjusted in the router.js file, there will be a controller folder to implement better handling logic from the server, separating how data is manipulated. All the routes are returnning error handlers and giving information to front-end, but that shall be treated better with  specific return variables to the client side.

Routes are separated from users and products, each one with its own method and manipulations, started from its main source path /users... or /purchases...

The get routes are just fetching data, so it was meant to not send payloads, indeed the other routes must have the specified data in their body to be sent with the request.

