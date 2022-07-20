
# Project Title

TASKEMAN (Task Management App) API 


## Authors

- [@kmiqbal19](https://github.com/kmiqbal19)


## API Reference

#### User signup

```http
   POST /api/v1/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `email` | `string` | **Required**. Your email address |
| `password` | `string` | **Required**. Your given password |
| `passwordConfirm` | `string` | **Required**. Your password confirmation |

#### User login

```http
   POST /api/v1/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email address |
| `password` | `string` | **Required**. Your given password |


#### User Update Data

```http
   PUT /api/v1/users/updateUserData
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email address |
| `name` | `string` | **Required**. Your name |
| `photo` | `file` | **Not Required**. Your image |





#### Change Password

```http
  PATCH /api/v1/users/changePassword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `currentPassword` | `string` | **Required** Users current password |
| `password` | `string` | **Required**. Users password |
| `passwordConfirm` | `string` | **Required**. Users password Confirmation |

#### Get all tasks

```http
  GET /api/v1/tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `jwt` | `string` | **Required**. Your jwt token |

#### Get task

```http
  GET /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to fetch |
| `jwt` | `string` | **Required**. Your jwt token |

#### Update task
```http
  PATCH /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to update |
| `jwt` | `string` | **Required**. Your jwt token |

#### Create task
```http
  POST /api/tasks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwt` | `string` | **Required**. Your jwt token |
| `title` | `string` | **Required**. Your task title |
| `description` | `string` | **Required**. Your task description |
| `photo` | `file` | **Not Required**. Your task photo |

#### Delete task
```http
  DELETE /api/task/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to delete |
| `jwt` | `string` | **Required**. Your jwt token |




## Documentation

[Documentation](https://documenter.getpostman.com/view/20397790/UzR1J2S3)


## Demo

Insert gif or link to demo


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` 
`JWT_SECRET_KEY` 
`JWT_EXPIRES_IN` 
`JWT_COOKIE_EXPIRES_IN`
`CLOUDINARY_NAME`
`CLOUDINARY_API`
`CLOUDINARY_SECRET`


![Logo](https://i.ibb.co/7jrh2YF/Taskeman.png)

