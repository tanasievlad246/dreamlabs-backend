# Description

[Nest](https://github.com/tanasievlad246/dreamlabs-backend) A tech challange API with GraphQL Standard.

# Running the app

## Locally

1. Run `npm install`
2. Set up your database locally
3. Create a `.env` file and put the database credentials there as in the `.env.example`
4. Run any of the start commands `npm run start:dev|prod`

## Docker (Locally)

1. Make sure docker `docker-compose` is installed
2. Run the `docker-compose up --build` in the backend directory

## Kubernetes (Locally)
1. Make sure docker is installed
2. Install [minikube](https://minikube.sigs.k8s.io/docs/start/)
3. Enable minikube [ingress addon](https://minikube.sigs.k8s.io/docs/start/)
4. Install [skaffold tool](https://skaffold.dev/docs/install/)
5. In the root folder of the repo run `skaffold dev -p dev`
6. Run in terminal `minikube ip`
7. Go the ip in your browser, `/api` is the api and `/graphql` is the playground


# Test

## Manual Testing in Playground

* Run the app in whatever environment you choose
* Go to the [Playground](http://localhost:3000/graphql)
  * If locally http://localhost:3000/graphql
  * If in docker http://localhost:3000/graphql
  * If in minikube run `minikube ip` and then go to `http://<ip>/graphql`

## Unit Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
