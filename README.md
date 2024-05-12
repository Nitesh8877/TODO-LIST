Todo App API Documentation
Todo Controller
createTodo
Endpoint: POST /todos
Description: Creates a new todo item.
Request Body:
description: Description of the todo item (string).
status: Status of the todo item (string).
Response:
201 Created: Todo item created successfully.
400 Bad Request: If there's an error creating the todo item.
updateTodo
Endpoint: PUT /todos/:id
Description: Updates an existing todo item.
Request Parameters:
id: ID of the todo item to update.
Request Body:
description: Updated description of the todo item (string).
status: Updated status of the todo item (string).
Response:
200 OK: Todo item updated successfully.
400 Bad Request: If the todo item with the provided ID is not found or there's an error updating the todo item.
deleteTodo
Endpoint: DELETE /todos/:id
Description: Deletes a todo item.
Request Parameters:
id: ID of the todo item to delete.
Response:
200 OK: Todo item deleted successfully.
400 Bad Request: If the todo item with the provided ID is not found or there's an error deleting the todo item.
getAllTodos
Endpoint: GET /todos
Description: Retrieves all todo items.
Response:
200 OK: List of todo items retrieved successfully.
204 No Content: If no todo items are found.
getTodoById
Endpoint: GET /todos/:id
Description: Retrieves a todo item by ID.
Request Parameters:
id: ID of the todo item to retrieve.
Response:
200 OK: Todo item retrieved successfully.
204 No Content: If no todo item is found with the provided ID.
uploadTodosFromCSV
Endpoint: POST /todos/upload
Description: Uploads todo items from a CSV file.
Request Body:
csv: CSV file containing todo items.
Response:
200 OK: File uploaded successfully.
400 Bad Request: If no CSV file is provided.
downloadTodosAsCSV
Endpoint: GET /todos/download
Description: Downloads todo items in CSV format.
Query Parameters:
status: Filter by status (optional).
sortBy: Sort by field (optional).
order: Sort order (optional).
Response:
CSV file containing todo items.
listingTodo
Endpoint: GET /todos/listing
Description: Retrieves paginated and sorted todo items.
Query Parameters:
status: Filter by status (optional).
page: Page number (optional, default: 1).
limit: Number of items per page (optional, default: 10).
sortBy: Sort by field (optional).
order: Sort order (optional).
Response:
200 OK: List of paginated and sorted todo items.
204 No Content: If no todo items are found.
User Controller
signup
Endpoint: POST /signup
Description: Registers a new user.
Request Body:
name: Name of the user.
email: Email of the user.
password: Password of the user.
Response:
201 Created: User registered successfully.
400 Bad Request: If the email is already in use or there's an error registering the user.
Auth Controller
signin
Endpoint: POST /signin
Description: Authenticates a user.
Request Body:
email: Email of the user.
password: Password of the user.
Response:
200 OK: User authenticated successfully. Returns user details and JWT token.
400 Bad Request: If the provided credentials are invalid or there's an error authenticating the user.
Middleware
verifyToken
Description: Verifies JWT token in request header.
Usage: Middleware used to authenticate requests.
Response:
401 Unauthorized: If no token is provided or the token is invalid.
Server Configuration
Port: Server runs on the configured port number.
