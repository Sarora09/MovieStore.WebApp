# Project Owner : Sapan Arora

# Project Name: Movie Collection React.js App

## About: 
This [website](https://movie-collection-react-app.netlify.app/) is built using React.js. I did this project to fetch the APIs and use the results for CRUD operations. CRUD stands for Create, Read, Update, and Delete operation. I have considered two actors for my website. The first actor is the Admin and the second actor is the customers. This project is only functional when the backend is running. I have built a web API using [.NET Core on the back-end](https://movie-collection-api-app.azurewebsites.net/).

<details>
  <summary>Login Credentials for the front-end react website</summary>
  <br>
  
  Username: *admin_access@test.com*
  
  Password: *Password1@*
</details>

## Required Software to run the app:
1) Visual Studio Code to run the react app
2) Node to install the node packages

## Steps to run the app:
You would need to perform the following:
1) Clone this repository to your local machine.
2) Go to your local project directory. Click on the address bar. Write cmd and press enter.
3) You will see the command prompt.
4) In the command prompt, write "code ." and press enter.
5) You will see the Visual Studio Code opened.
6) Open the terminal on Visual Studio Code and write "npm install." It will install all the packages mentioned in the package.json file.
7) After complete installation of packages, you would need to write "npm start" in the terminal, and now you can run this app in the development mode.

## Audience: 

### Admin Role: 

- To update its profile.
- To manage the users, i.e., create, read, update, and delete the user details from the database. 
- To manage the movies, i.e., create, read, update, and delete the movie details from the database.

### Customer role:

- To update its profile
- To pay for the movie and receive the link to watch the movie. The payment method is just for demo purposes. I have not used a real-time payment system in this app.

## Internal Process 

### For Admin:

Admin logins to its profile which sends the request to the backend API. The backend confirms the login details with the database. Successful login on the frontend will direct the admin to the profile page. From there Admin can:
- update its profile
- manage the users
- manage the movies

**Please note that I have manually added the user id in the Nav.js file in this app to render the components on the screen that are only available to the admin and no one else. However, this is not a good strategy to manually put the user id. Proper roles, in my opinion, should be defined on the backend for accessing the resource.**

### For Customer:
- Existing customers need to provide the login details to access the website resources. Backend API will confirm the login details received from the frontend. The backend API will send the JWT token, which the user needs to have for its request to access the resources and perform its roles. Otherwise, the user will not be able to access the website resources.

- New customers need to fill out the signup form, which calls the multiple APIs. Upon the successful signup on the backend, the user will be able to perform its roles.

# Areas of Improvement:

The app is in the development stage and is functional. However, the app requires iterations to improve. This app is for my learning purposes only.
