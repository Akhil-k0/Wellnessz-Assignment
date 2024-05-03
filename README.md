POSTMAN COLLECTION.JSON
{
	"info": {
		"_postman_id": "c03d69c9-ca66-4795-ad2e-0fda6a595db9",
		"name": "Node.js REST APIs",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "34570837"
	},
	"item": [
		{
			"name": "Get All Posts",
			"request": {
				"method": "GET",
				"header": [],
				"url": "http://localhost:3000/api/posts"
			},
			"response": []
		},
		{
			"name": "Insert New Post",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"uuid": "c5c6643d-8861-4c6a-b7ac-98f2578e17bf"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"title\": \"New Post\",\n    \"desc\": \"Description of new post\",\n    \"tag\": \"Tag1\",\n    \"image\": \"http://example.com/image.jpg\"\n}"
				},
				"url": "http://localhost:3000/api/posts"
			},
			"response": []
		}
	]
}


Nodejs Task
Make a Rest API using Nodejs + SQL
API requirements are as follows:
1.      Make a model of Posts (with fields: title, desc, tag, image...)
2.      Create an endpoint to get all posts and it should be configured with the following options:
•       An Option to sort, and paginate the data
•       An Option keyword that filters the posts that contains that keyword either in the title or description
•       An Option Tag that gives us the posts associated with that           particular tag.
 3.      Create an endpoint that Inserts a POST in the posts collection.
•   	Upload the image to cloud services (AWS S3, Cloudinary or others...)


Other requirements are -
 If possible, deploy the solution into production.   
The code should be clean and maintainable.
Share the POSTMAN collection of the same with examples attached to each api(s)
