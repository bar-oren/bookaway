Bookaway Home Test

before everything please run: npm i

for running the script open and enter:

$ users

Additional notes:
1) Securiry: helmet was included.

HTTP URLS:

get users:
GET: /users/:page/:maxPerPage 
note: there are 5 users by default.

add user:
POST: /users
Request Body: 
{
	"id": num,
	"email": String,
	"firstName": String,
	"lastName": String,
	"password": String,
	"dateOfBirth": String
}

edit user:
PUT: /users
Request Body: 
{
	"id": num,
	"email": String,
	"firstName": String,
	"lastName": String,
	"password": String,
	"dateOfBirth": String
}

add user:
DELETE: /users
Request Body: 
{
	"id": num,
}