
# Project Title

User authentication web app created using React, Gofiber, and TailwindCss.

## Description

This project covers the user authentication process which includes:
- Sign Up
- Log in
- Forget passwords
- Reset password

JWT authentication has been used to secure the app.

**Tech Stack**  used to create the app:

<ins>frontend</ins>
* React 
* TailwindCss.

<ins>backend</ins>
* Go Fiber, which is a Golang web framework.

<ins>database.</ins>
* PostgreSQL 

<ins>ORM library.</ins>
* GORM


## Getting started

You must first ensure that you have a [PostgreSQL](https://www.postgresql.org/) database on your local machine.

To install this project:
1. Clone the repository to your local machine. You can do this by running the following command on your terminal.

```
	git clone https://github.com/MunBrian/user-authentication.git
```

2. Navigate to the project directory then navigate to the frontend folder and install the required dependencies by running:

```
	npm install
```

3. Navigate to the backend folder and install the required Golang dependencies by running this command on the terminal:

```
	go mod tidy
```

4. On your backend root folder create a .env file with the following variables:

```
DBNAME="<database name>"
DBPORT="<database port>"
DBUSER="<database username>"
PASSWORD="<database password>"
SECRET="<secret key to sign your jwt token>"
EMAILPASSWORD="<sender email password>"
EMAIL="<sender email address>"
```

- Generate a one-time Gmail app password in your Gmail account and use it as the value of the "EMAILPASSWORD" env variable.

## Usage

1. Start the PostgreSQL database, by running the following command:
	- On Windows
		1. Open the Windows command prompt or PowerShell
		2. Navigate to the directory where PostgreSQL is installed (usually `C:\Program Files\PostgreSQL\<version>\bin` ).
		3. Run the `pg_ctl` command with the `-D` option and the path to your data directory. For Example:  
		```
			pg_ctl -D C:\Program Files\PostgreSQL\<version>\data start
		```

	- On Linux using Ubuntu
		1. Open the Ubuntu terminal on your system.
		2. Type the following command to start the PostgreSQL server:
		```
			sudo service postgresql start
		```
				
2. Navigate to the backend folder on the project folder and run the following command on your terminal to start the server:
```
	go run main.go
```

3. Navigate to the frontend folder on the project folder and open a new terminal and run the following command on your terminal to run the react scripts:
```
	npm run start
```

## Contact
If you have any questions or feedback about this project you can contact me at my email address 
[bk.mungai254@gmail.com](mailto:bk.mungai254@gmail.com)
