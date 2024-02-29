# Description

[Nest](https://github.com/tanasievlad246/dreamlabs-backend)
A tech challange API with GraphQL Standard.

# Running the app

## Locally

1. Run `npm install`
2. Set up your database locally
3. Create a `.env` file and put the database credentials there as in the `.env.example`
4. Create a `accounting` database `CREATE DATABASE accounting` or whatever other name you see fit
5. Run any of the start commands `npm run start:dev|prod`
6. Run migration `npm run tpyeorm:run-migrations`s
7. Go to `localhost:3000/graphql`

## Docker (Locally)

1. Make sure docker `docker-compose` is installed
2. Run the `docker-compose up --build` in the backend directory
3. Run the migrations `npm run tpyeorm:run-migrations`
4. Go to `localhost:3000/graphql`

## Kubernetes (Locally)
1. Make sure docker is installed
2. Install [minikube](https://minikube.sigs.k8s.io/docs/start/)
3. Enable minikube [ingress addon](https://minikube.sigs.k8s.io/docs/start/)
4. Install [skaffold tool](https://skaffold.dev/docs/install/)
5. In the root folder of the repo run `skaffold dev -p dev`
6. Run in terminal `minikube ip`
7. Go the ip in your browser, `/api` is the api and `/graphql` is the playground
8. Expose the database and run migrations `kubectl port-forward <db-pod-name> 5432:5432` and `npm run tpyeorm:run-migrations`


# Test

## Manual Testing in Playground

* Run the app in whatever environment you choose
* Go to the [Playground](http://localhost:3000/graphql)
  * If locally http://localhost:3000/graphql
  * If in docker http://localhost:3000/graphql
  * If in minikube run `minikube ip` and then go to `http://<ip>/graphql`

## Example queries
```
mutation {
  createCustomer(createCustomerInput: {
    name: "Test customer"
  }) {
    name
    id
  }
	createOneProject(createProjectInput: {
    name: "Test project"
  }) {
    name
    id
  }
}

mutation {
    createInvoice(createInvoiceInput: {
    description: "test"
    amount: 123.44
    currency: USD
    paymentDate: "2024-06-24"
  }) {
  	description
    amount
    currency
    customer {
      name
    }
    project {
      name
    }
  }
}

query {
  findAllInvoices {
    id
    description
  	amount
    isPaid
    storno {
      id
      amount
    }
    project {
      name
    }
    customer {
      name
    }
  }
}

mutation {
  generateOneStornoInvoice(generateInvoiceStornoInput: {
    id: 1337
  }) {
    id
    storno {
      id
      amount
    }
    amount
  }
}

mutation {
  markOneInvoiceAsPaid(markInvoicePaidInput: {
    id: 1337
  }) {
    id
    isPaid
  }
  markOneInvoiceAsUnpaid(markInvoicePaidInput: {
    id: 1337
  }) {
    id
    isPaid
  }
}

query {
  findOneCustomer(findOneCustomerInput: {
    id: "1e026c8a-fa0f-46fb-8e34-f08ec42d4453"
  }) {
    name
    id
  }
}

mutation {
  deleteOneCustomer(deleteOneCustomerInput: {
    id: "test"
  })
}

query {
  findAllCustomers {
    name,
    invoices {
      id
      amount
    }
  }
}
```

## Unit Testing
* `npm install` in the backend folder
* `npm run test` in the backend folder
