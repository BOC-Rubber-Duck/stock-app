<p align="center">
<img src="https://github.com/BOC-Rubber-Duck/Diamond_Hands.png">
</p>

# Diamond Hands Stock App
<em>Diamond Hands</em> is an application to help beginners query, buy, & sell stock. See how you stack up against all the pros on Diamond Hands. Or add your friends for a friendly wager!

##
* This Stock "paper-trading" app was the final capstone project for the Hack Reactor <a href="https://www.hackreactor.com/">Software Engineering Immersive Program.</a>
* The Rubber Ducks engineering team were a part of the Remote Part Time Program Cohort 28 (RPP28)


## Features
* The main features of this appalication include:
  - Secure Login
    - ![Image of Login](./readme-imgs/login/main.png)

  - Leaderboard of all users of the application, ranked by net gain
  - View your profile with stocks owned, cash, and portfolio value
  - The ability to search for and buy/sell 'stocks'
  - View stocks owned by other users
  - "Friend" other users to narrow the leaderboard view

## Installation (Local Development)

#### In MacOS:
* From the root directory, install the following:

1. Download the Github repo:

```
 git clone git@github.com:BOC-Rubber-Duck/stock-app.git
```

2. Download NVM:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
3. Install packages:
```
npm install
```

### Dependencies
* The app requires various packages available via NPM. All of these packages are enumerated in the <a href="https://github.com/BOC-Rubber-Duck/stock-app/blob/main/package.json">package.json</a> file in the repository. Installation instructions are in the following sections.

* In addition to running a server, a PostgreSQL database instance will have to be deployed and accessible to the server. Instructions for doing so are below:

* The stock prices are sourced via a free API service with https://marketstack.com.
To get an API key, register for a free account  with 1000 API requests/mo here: <a href="https://marketstack.com/documentation">MarketStack API</a>

### Running Local
* The following are the scripts that are relevent for local development and deployment (Found in <a href="https://github.com/BOC-Rubber-Duck/stock-app/blob/main/package.json">package.json</a> file):
1. "react-dev" webpack build script
```
npm run react-dev
```
2. "start" nodemon server start
```
npm start
```
3. "test" jest testing
```
npm test
```
4. "test-coverage" jest test with coverage
```
npm run test-coverage
```
5. "react-prod" webpack build script in production mode
```
npm run react-prod
```

### PostgreSQL Database Setup:
To run on MacOS: https://wiki.postgresql.org/wiki/Homebrew :
```
brew install postgresql
brew services start postgresql
psql postgres
```
Check services:
```
brew services
```
Login as "user"
```
psql -h localhost -p 5432 -U user -d database_name
```
run an .sql file to initialize (must be in same folder as command execution):
Generic:
```
psql -h host -U username -d myDataBase -a -f myInsertFile
```
specific to this instance:
```
psql -h 127.0.0.1 -U user -d stonks -f setup.sql
```
### Local PostgreSQL setup using docker:
Run a Docker image from official PostgreSQL image: https://wkrzywiec.medium.com/database-in-a-docker-container-how-to-start-and-whats-it-about-5e3ceea77e50
1. run this command from the level that you would like to access the mounted files from:
```
docker run -d \
    --name postgres_db \
    -e POSTGRES_PASSWORD=<password> \
    -e POSTGRES_USER=user \
    -e POSTGRES_DB=stonks \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -p 5432:5432 \
    -v /custom/mount:/var/lib/postgresql/data \
    postgres
```
2. check that the container is running:
```
sudo docker ps
```
4. connect to a Docker containerized service from the host:
```
psql -h localhost -p 49153 -d docker -U docker --password
```
### Deploy Production

### CI/CD recommendations:

#### Continuous Integration:

We used Github's own actions functions to setup continuous integration. The <a href="https://github.com/BOC-Rubber-Duck/stock-app/blob/main/.github/workflows/test-suite.yml">test-suite.yml</a> instructions are triggered on any Pull Requests before approval is allowed. More information can be found at:
https://docs.github.com/en/actions/guides/about-continuous-integration

#### Continuous Deployment:

Use <a href="https://www.cloudsavvyit.com/7138/how-to-set-up-automatic-builds-for-docker-images-on-github/">Github actions</a> to trigger a new Docker image build on any push to main branch. Instrutions can be found in the <a href="https://github.com/BOC-Rubber-Duck/stock-app/blob/main/.github/workflows/docker-publish.yml">docker-publish.yml</a> file.

#### To Run on AWS EC2 Instance:
In the AWS instance, run the following commands to install docker, then deploy the app:
```
yum update
yum install docker
```

Set docker to start on reboot:
```
sudo systemctl enable docker
sudo systemctl start docker
```

Run the latest version of the app:
```
sudo docker run -d --name stonks-app -p 80:3000 ghcr.io/boc-rubber-duck/stock-app:main
```

By setting up a watchman service on the AWS instance, the newly deployed image will then trigger an image pull and re-deployment of the revised app. Instructions are found in the documentation for the watchman service here: https://containrrr.dev/watchtower/

Run the package with the following arguments to set the polling interval in seconds as well as several other usefull flags for development.

```
sudo docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
  -i 600 \
  --cleanup \
  --debug
```

### Run Database on AWS instance:
```
sudo yum update
sudo yum install docker
sudo systemctl enable docker
sudo systemctl start docker
```

Then run this script to pull down the official PostgreSQL docker image and run a container with the appropriate file mounting:
```
docker run -d \
    --name postgres_db \
    -e POSTGRES_PASSWORD=<password> \
    -e POSTGRES_USER=<user> \
    -e POSTGRES_DB=stonks \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -p 5432:5432 \
    -v /custom/mount:/var/lib/postgresql/data \
    postgres
```
Finally, you'll need to populate the database by running the scripts either locally from an ssh session in the instance, or via an exposed port remotely. Change <localhost> to your database IP if accessing remotely.

```
psql -h localhost -p 49153 -d docker -U docker --password
```
Run the following commands from the './db/' folder of this project:
```
psql -h <IPADDRESS> -U user -d stonks -f setup.sql
```


## Contributions
Members of the Rubber Duck Team ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->

| [<img src="https://avatars.githubusercontent.com/u/68621202?v=4" width="75px;"/><br /><sub><b>Alizeh Rehman</b></sub>](https://github.com/alizehrehman)<br />(Project Manager)<br /> [💻](https://github.com/alizehrehman/ "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/51034223?v=4" width="75px;"/><br /><sub><b>NylonEric</b></sub>](https://www.NylonEric.dev)<br />(Architecture Owner)<br /> [💻](https://github.com/NylonEric "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/69224945?v=4" width="75px;"/><br /><sub><b>Margo Kearns</b></sub>](https://github.com/margokearns)<br />(UI Owner)<br /> [💻](https://github.com/margokearns "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/72368213?v=4" width="75px;"/><br /><sub><b>Bill Roth</b></sub>](https://github.com/minongcopper)<br />(Software Engineer)<br /> [💻](https://github.com/minongcopper "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/342261?v=4" width="75px;"/><br /><sub><b>kingsleyallen</b></sub>](https://github.com/kingsleyallen)<br />(Software Engineer)<br /> [💻](https://github.com/kingsleyallen "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/264760?v=4" width="75px;"/><br /><sub><b>Sam Brown</b></sub>](https://github.com/baudot)<br />(Software Engineer)<br /> [💻](https://github.com/baudot "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/53981503?v=4" width="75px;"/><br /><sub><b>tbrinkman3</b></sub>](https://github.com/tbrinkman3)<br />(Software Engineer)<br /> [💻](https://github.com/tbrinkman3 "Code") [📖]( "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
## License
<a href="https://choosealicense.com/licenses/mit/">MIT</a>