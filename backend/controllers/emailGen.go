package controllers

import (
	"fmt"
	"net/smtp"
)

func GenerateEmail(email []string, token string) error {

	var err error

	body := fmt.Sprintf(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body>
    <p>Someone asked for a password reset at <a href="http://localhost:3000/" target="_blank">Login-signup app</a></p>
    
    <p>Email %v </p>
    
    <p>If you want to reset your password, please follow this link.</p>
    
    <a href="http://localhost:3000/reset/%v" target="_blank">Password reset</a>
    
    <p>if you did not request to reset your <a href="http://localhost:3000/" target="_blank">Login-signup app</a>
        password, then you can ignore this message. </p>
</body>
</html>`, email, token)

	auth := smtp.PlainAuth(
		"",
		"bk.mungai254@gmail.com",
		"cqrosyngpapcxdez",
		"smtp.gmail.com",
	)

	headers := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";"

	msg := "Subject: Password Reset\n" + headers + "\n\n" + body

	err = smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"bk.mungai254@gmail.com",
		email,
		[]byte(msg),
	)

	if err != nil {
		return err
	}

	return nil
}
