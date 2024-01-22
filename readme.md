## Grocery 

### Pre-Requesting
    ```
    Nodejs
    Postgres Database
    ```


### Install Dependencies
    ```npm install```

### Add .env File Or Setup environment variaabales
    ```
    POSTGRES_HOST=localhost
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD="1234"
    POSTGRES_PORT=5432
    POSTGRES_DIALECT=postgres
    POSTGRES_DATABASE=grocery
    NODE_ENV=development
    DEBUG=true
    PORT=5002
    ```

### Feed Admin User
 ```npm run db:feed```

### Start App
 ```
 npm run start:dev
 docker-compose up
 
 ```

 ### Build App
 ```npm run build```

### Endpoints
```
POST: http://localhost:5002/api/auth/login
Body: {
        "email":"admin@gmail.com",
        "password":"admin@1234"
    }
Response:{
        accessToken:""
     }


GET: http://localhost:5002/api/item
GET: http://localhost:5002/api/user/1
GET: http://localhost:5002/api/user
GET: http://localhost:5002/api/role
GET: http://localhost:5002/api/role/1
GET: http://localhost:5002/api/order

POST: http://localhost:5002/api/user/create
Body: {
    "firstname":"keshav",
    "lastname":"vyavahare",
    "email":"kvyavahare52+1@gmail.com",
    "mobilenumber":"9834712342",
    "password":"test@1234"
} 

POST: http://localhost:5002/api/role/create
Body:{
    "name":"User",
    "permissions":["ORDER_LIST_VIEW","ITEM_DETAILS_VIEW","ITEM_LIST_VIEW","ORDER_CREATE"]
}

POST: http://localhost:5002/api/role/assign
Body: {
    "user_id":2,
    "role_id":3
}
POST: http://localhost:5002/api/item/create
Body:{
    "name":"Sugar",
    "stock": 50,
    "price":40,
    "unit":"kg",
    "gst_rate":18,
    "min_level":10,
    "danger_level":15
}
POST: http://localhost:5002/api/order/create
Body: {
    "discount":5,
    "ship_and_packaging_charges":1000,
    "items":[{
        "item_id":1,
        "quantity":3
    }]
}

DELETE: http://localhost:5002/api/item/1
DELETE: http://localhost:5002/api/user/1/remove-role/1
DELETE: http://localhost:5002/api/user/1
DELETE: http://localhost:5002/api/role/1



```
