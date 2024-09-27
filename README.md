# FOOD-DELIVERY

an Food-Delivery Website built with MERN stack.

## Front End Deploy Client URL

https://cerulean-squirrel-ea5cb5.netlify.app/

## Front End Deploy Admin URL

https://food-delivery-admin-e7t0.onrender.com


## Backend End Deploy URL

https://food-delivery-backend-server-y65q.onrender.com


##Instruction

after cloning, run this command in the root folder
```bash
npm install
```
navigate to "frontend" folder, run these commands 
```bash
npm install
npm run build
```
wait for application build
after that open the backend/config/config.env
and update the MongoDB connection string
```bash
...
DB_LOCAL_URI=mongodb://localhost:27017/ecommerce
```

navigate back to "root" folder and run this command for loading demo data
```bash
npm run seeder
```

run this below command to run the app in production mode
```bash
npm run prod
```


## Test
open the http://localhost:8000 and test the 
