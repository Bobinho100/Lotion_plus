
# Lotion Plus

In this assignment, you will create a backend on AWS for the Lotion app you created in a previous assignment. You will use Terraform for creating resources on AWS.

You may use the front-end you built in the previous assignment here if it works properly. If not, you need to make sure it does by the time you demo your work. This could be a group assignment (groups of maximum 2 students). Please read the [Group Assignment](https://github.com/ucalgary-ensf381/lotion-plus#couple-group-assignment) part carefully so you won't lose any points.

## Architecture Overview

<br/>
<p align="center">
  <img src="https://res.cloudinary.com/mkf/image/upload/v1678683690/ENSF-381/labs/lotion-backedn_djxhiv.svg" alt="lotion-architecture" width="800"/>
</p>
<br/>

## :foot: Steps

- Make sure to see the demo video on D2L
- Clone the repo
- Make sure you're inside the root directory of the repo and then run `npm install` to install all the necessary packages
- Run `npm start` and you should be able to see the page open up on your default browser
- Add your infrastructure code in the `main.tf` file
- Add your function code for the `get-notes-<your-ucid>` function in the [`functions/get-notes/main.py`](functions/get-notes/main.py) file
- Add your function code for the `save-note-<your-ucid>` function in the [`functions/save-note/main.py`](functions/save-note/main.py) file
- Add your function code for the `delete-note-<your-ucid>` function in the [`functions/delete-note/main.py`](functions/delete-note/main.py) file
- Push your changes to the `main` branch before the deadline to be graded
- Create a new **PRIVATE** repo under your username and add it as a new remote to the project: `git remote add personal <github-address>`. This could be the same repo you used for the previous assignment. You don't have to create a new one. I say **PRIVATE** in case you accidentally put some sensitive information in your repo (e.g. AWS Credentials. DON'T DO THAT!!)
- Push your changes to your personal repo as well: `git push personal main`
- Use [Netlify](https://www.netlify.com/) to deploy your application and drop the link to your website in the [NETLIFY-ADDRESS](./NETLIFY-ADDRESS.md) file

## :page_with_curl: Notes

- You must use Google as the login method for the app. The demo uses the `@react-oauth/google` library. To use Google as a login method, you need to create a project on Google Cloud Platform first and use the `client_id` you generate in your app. See this [tutorial](https://blog.logrocket.com/guide-adding-google-login-react-app/) on how to create such a project and connect it to your React app. It's Free, but you need to put in credit card info to create a Google Cloud account
- You must create all your resources on AWS with Terraform. Put all your configuration in the [`main.tf`](infra/main.tf) file
- You must use AWS DynamoDB for the database. Feel free to use the same setup (Partition and Sort Key) shown in the Demo. The demo uses a table named `lotion` (you must name your table `lotion-<your-ucid>`) with `email` as Partition Key and note `id` as Sort Key. This is an easy setup which will let you store everybody's notes in one table and retrieve/update/delete them easily. Note that if you use this method, you need to use the DynamoDB [Query](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb/table/query.html) operation to retrieve all the notes for a user
- You must use [Lambda Function URLs](https://masoudkarimif.github.io/posts/aws-lambda-function-url/) for this assignment to connect your backend to the frontend
- You must create 3 Lambda functions for this assignment:

  - `get-notes-<your-ucid>`: to retrieve all the notes for a user. The function reads the user email from the query parameter `email`, and receives `email` and `access_token` (this is the token you get from the Google login library) in the headers. Function URL only allows `GET` requests
  - `save-note-<your-ucid>`: to save/create/update a note for a user. The function reads the note to be saved/created/updated from the body of the request, and receives `email` and `access_token` in the headers. Function URL only allows `POST` requests
  - `delete-note-<your-ucid>`: to delete an existing note for a user. The function reads the user email from the query parameter `email`, and receives `email` and `access_token` in the headers. Function URL only allows `DELETE` requests

- You need to use the `email` and `access_token` you get in the headers of the requests to make sure the user is authenticated properly. If not, the functions should return the HTTP status code `401` for unauthenticated requests
- In order to get the full mark, you need to **DEMO your work in PERSON**. You could either demo it to a TA or the instructor. Demo is 50% of the assignment

## Things I used
- I created all resources with AWS on terraform. Put all my configuration in the [`main.tf`](infra/main.tf) file
- used AWS DynamoDB for the database
- Created 3 Lambda functions using python
- 



## :heavy_check_mark: Things you may change

- You may use a different library for Google authentication
- You may use a CSS framework to build the UI
- You may choose either Python or Golang to write your Lambda functions

## :name_badge: Things you may not change (points will be deducted if you do)

- Use of a DynamoDB table
- Use of 3 Lambda functions to build the backend
- Use of Terraform to build the resources on AWS
- Naming patterns discussed above: your resources must have your UCID(s) in their name

## Links and preview

# The link to the project is:
https://stirring-cocada-6f9544.netlify.app
## Preview of the project
Homepage
<img width="1511" alt="Screenshot 2023-07-22 at 9 27 28 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/d2fa03fe-b4d3-4ba1-a995-ed93a0988ecd">
After Signing In
<img width="1512" alt="Screenshot 2023-07-22 at 9 30 16 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/12e5a621-782b-4829-8b2f-2f71d4ecae5d">
Editing Mode, writing a note
<img width="1512" alt="Screenshot 2023-07-22 at 9 32 22 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/9510c9c2-6bcf-4ef9-988d-2dd21fe61e90">
Saving a note
<img width="1512" alt="Screenshot 2023-07-22 at 9 33 25 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/2059e615-fc3b-477b-a510-a2e2067ad460">
Deleting a Note
<img width="1512" alt="Screenshot 2023-07-22 at 9 42 04 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/eee993dc-c8f1-4cee-a5de-c58598eebdb8">
  Note deleted

  <img width="1512" alt="Screenshot 2023-07-22 at 9 43 46 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/da2f8162-33b2-4f30-88f3-e3fb6ef02a68">

  Support mobile view
  <img width="448" alt="Screenshot 2023-07-22 at 9 45 22 PM" src="https://github.com/Bobinho100/Lotion_plus/assets/114113147/88086c9f-035b-4454-9e59-5b4d4782034b">

  












