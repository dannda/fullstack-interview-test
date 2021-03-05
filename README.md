# fullstack-interview-test
To use with Docker you only need to download the **Dockerfile** and **docker-compose.yaml** files.

Move to the directory containing the files and run

  `docker build . --tag webapp:1.0.1`
  
and

  `docker-compose up`
 
This will run the development servers for backend (Django) and frontend (Angular).

Open `localhost:4200` in your browser.
