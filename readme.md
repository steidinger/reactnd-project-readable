# Udacity Project Readable

This project contains the code for the Udacity project *Readable*. It contains a reference to Udacity's api server for the project in the Git submodule 'api-server' and the code for the client in the folder 'frontend'.

## Installation (Using the provided API server)

If you want to use the included Git submodule to run the api server, please clone this repository using `git clone --recursive`. Afterwards you will need to run `npm install` in the folder *api-server* and in the project's root folder.

Once all dependencies are installed you can start both the api server and the frontend server by running `npm start` in the project's root folder. 

The frontend will be available as http://localhost:3000.

### Installation (Using your own API server)

Alternatively you can use your own copy of the api server as long as it is available at http://localhost:5001.

Please run `npm install` in the project's root folder. This will install all dependencies for the frontend and for the root project.

Once all dependencies are installed you can start the frontend server by running `npm start` in the folder 'frontend'. 

The frontend will be available as http://localhost:3000.
