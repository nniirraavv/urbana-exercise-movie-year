# What is the year of the movie

#### Nodejs | GraphQL  ####

## Quick summary ##
This project contains the game "What is the year of the movie". Movie details get from the public API and source written in NodeJS  and integrated with a GRAPHQL API.


### Basic Requirment ###

* **Node.js** - [Install Node.js](https://nodejs.org/en/), including the NPM package management tool.

#### How do I get set up development environment? ####

Open up a terminal in the root directory of the project.

Install Node Modules Dependencies

```bash
npm install
```

Start Development Server

```bash
npm run build
```

**Note**: You are all set for development now, you can try other commands for Test & Production build next.

#### How do I run test? ####

Run Test

```bash
npm run test
```

#### How do I prepare production build? ####

Prepare a production ready build

```bash
npm run build
```

-----------------------

* **`.gitignore `** : Ignored files in git versioning
* **`README.md `** : Application Information
* **`package-lock.json`** : Dependency management
* **`package.json`** : Dependency management
* **`tsconfig.json`** : Typescript config
* **`node_modules`** : Node module packages
* **`build`** : All production build artifacts
* **`src `** : All source code files
    * **`api`** : All available API
        * **`graphQL`** : Holds the Input variable types & response types for GraphQL Queries
	* **`config`** : Application configuration
	* **`data`** : Holds the movies data and query
	* **`loader`** : All loader and configuration files
	
	* **`docker-compose.yml`** : Docker configuraion for Postgres database and Redis

 ## API summary ##
 				## Query ##
        * **`movies`** : Return the list of the movies
        * **`movie`** : Return the search movie details. Search movie using movie title
        * **`play`** : Returns the list of random movies with options
				
				## Mutation ##
        * **`createMatch`** : Get the user information and store in the datbase then start the game.
        * **`submitPlay`** : Store the user game details and score
