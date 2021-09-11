# stock-app
Stock Trading Application

### Installation (Local Development)

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

###
### Contributions
Members of the Rubber Duck Team ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/68621202?v=4" width="75px;"/><br /><sub><b>Alizeh Rehman</b></sub>](https://github.com/alizehrehman)<br />(Project Manager)<br /> [💻](https://github.com/alizehrehman/ "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/51034223?v=4" width="75px;"/><br /><sub><b>NylonEric</b></sub>](https://www.NylonEric.dev)<br />(Architecture Owner)<br /> [💻](https://github.com/NylonEric "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/69224945?v=4" width="75px;"/><br /><sub><b>Margo Kearns</b></sub>](https://github.com/margokearns)<br />(UI Owner)<br /> [💻](https://github.com/margokearns "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/72368213?v=4" width="75px;"/><br /><sub><b>Bill Roth</b></sub>](https://github.com/minongcopper)<br />(Software Engineer)<br /> [💻](https://github.com/minongcopper "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/342261?v=4" width="75px;"/><br /><sub><b>kingsleyallen</b></sub>](https://github.com/kingsleyallen)<br />(Software Engineer)<br /> [💻](https://github.com/kingsleyallen "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/264760?v=4" width="75px;"/><br /><sub><b>Sam Brown</b></sub>](https://github.com/baudot)<br />(Software Engineer)<br /> [💻](https://github.com/baudot "Code") [📖]( "Documentation") | [<img src="https://avatars.githubusercontent.com/u/53981503?v=4" width="75px;"/><br /><sub><b>tbrinkman3</b></sub>](https://github.com/tbrinkman3)<br />(Software Engineer)<br /> [💻](https://github.com/tbrinkman3 "Code") [📖]( "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->
### License
<a href="https://choosealicense.com/licenses/mit/">MIT</a>