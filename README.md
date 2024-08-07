# Book Review App

Welcome to the Book Review App! This README will guide you through setting up and running the application locally on your computer.


- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (or a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))


First, clone the repository to your local machine:

git clone https://github.com/maaz342/book-review-app.git
cd book-review-app

Setup Backend

Navigate to the backend directory:
cd backend

Install the dependencies:
npm install (since package.json file is provided)

Create a .env file:
You need to create a .env file in the backend directory with the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-review-app
JWT_SECRET=your_jwt_secret
Replace mongodb://localhost:27017/book-review-app with your MongoDB connection string if you are using a cloud database.
Replace your_jwt_secret with a secret key for JWT.

Start the backend server:
npm run dev

The backend server will run on http://localhost:5000.

Setup Frontend

Navigate to the frontend directory:
cd ../frontend

Install the dependencies:
npm install (since package.json file is provided)

Start the frontend development server:
npm start



