# Employee Directory

My implementation of Postlight's Full Stack Engineer Code Challenge.

## Running:
First, start the backend node server. Navigate to the project root and run:
```
npm install
npm start
```

Next, start the frontend react server. Navigate to the "frontend" directory in the project root and run:
```
npm install
yarn start
```
* Note: This starts a development server. In production you would want to yarn build and deploy.

The database is already populated with data from https://randomuser.me, but if you want to re-populate the database, run:
```
node dbinit
```

Finally, open your browser and navigate to http://localhost:3000

## Comments/TODOs:
First, this was fun! I've been lacking coding challenges lately and it was nice to push myself again.

I knew I wanted a Node backend and a React frontend. I decided to go with Express because it seemed very simple to get up and running. 

I wanted a cloud db to simplify distribution...but I've never worked with MongoDB/Mongoose before. A lot of time was spent figuring out how that all worked and as a result I didn't get as far with the frontend features as I would like, but I'm happy with how it works.

I've worked with REST api's a lot...so I chose not to do that again and instead brushed up on GraphQL.

React, Bootstrap, and Font Awesome are my go to frontend tools. I decided not to mess around because I was already pressed for time.

## Production vs Dev Environment:
You'll probably notice there are a few dev specific things that I left in the code. There are a number of variables, particularly concerning DB connection info, that would be better placed in an .env file. Additionally I left nodemon and graphiql active in case you wanted to look at output from either one.

I would also note that typically I would break the frontend and backend into separate repositories...again I didn't do that for ease of distribution.

### TODO/Known Bugs:
* Pagination isn't responsive at all.
* The employee list should be replaced by a loading animation when fetching.
* Create/Update/Delete wasn't implemented on the frontend. Backend functionality is there.

## Technologies Used:
### Backend:
* [Express (node.js)](https://expressjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Mongoose](https://mongoosejs.com/)
* [GraphQL](https://graphql.org/)
### Frontend:
* [React](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Font Awesome](https://fontawesome.com/)

## Final Thoughts:
Let me know if you have any questions!
