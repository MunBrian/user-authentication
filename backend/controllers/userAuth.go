package controllers

import (
	"os"
	"time"

	"github.com/MunBrian/user-authentication/initializers"
	"github.com/MunBrian/user-authentication/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type LoginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ForgotPasswordData struct {
	Email string `json:"email"`
}

type Password struct {
	Password string `json:"password"`
}

// Sign Up controller
func UserSignUp(c *fiber.Ctx) error {
	//create a struct user of type User model
	var user models.User

	//get data from body
	if err := c.BodyParser(&user); err != nil {
		return c.JSON(err.Error())
	}

	//get task from db using email
	initializers.DB.Where("email = ?", user.Email).First(&user)

	//check user with email exists
	if user.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Email already exists",
		})
	}

	//get user password from body
	userPassword := user.Password

	//get hashedpassword from hashPassword func
	hashedPassword, _ := hashPassword(userPassword)

	//set password to hashedpassword
	user.Password = hashedPassword

	//add user data to db
	initializers.DB.Create(&user)

	return c.JSON(user)
}

// LOgin Controller
func UserLogin(c *fiber.Ctx) error {

	//create formData struct of type LoginData
	var formData LoginData

	//create user struct of type User
	var user models.User

	//get data from body
	if err := c.BodyParser(&formData); err != nil {
		return c.JSON(err.Error())
	}

	//get user from db using email
	initializers.DB.Where("email = ?", formData.Email).First(&user)

	//check if user exists
	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "invalid Credentials",
		})
	}

	//compare formdata password and db user password
	//returns true/false
	match := checkPasswordHash(formData.Password, user.Password)

	//if passwords don't match
	if !match {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "invalid Credentials",
		})
	}

	token, err := generateToken(user.FirstName)

	//check is token id generated succesfully
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "token not generated",
		})
	}

	//if passwords match
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token":   token,
		"message": "Successfully logged in",
	})
}

// Home Controller
func HomePage(c *fiber.Ctx) error {
	// Get "name" claim value from request header
	name := c.GetRespHeader("X-User-Name")

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"name": name,
	})
}

// Forgot Password Controller
func ForgotPassword(c *fiber.Ctx) error {
	var err error

	var emailData ForgotPasswordData

	//get data from body
	if err := c.BodyParser(&emailData); err != nil {
		return c.JSON(err.Error())
	}

	//get token
	token, err := generateToken(emailData.Email)

	if err != nil {
		c.JSON(err.Error())
	}

	//generate and send email with unique token to user's email
	err = GenerateEmail([]string{emailData.Email}, token)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(err)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"message": "email sent successfull",
	})
}

func ResetPassword(c *fiber.Ctx) error {
	//create user struct of type User
	var user models.User

	// Get "email" claim value from request header
	email := c.GetRespHeader("X-User-Email")

	//get user from db using email
	initializers.DB.Where("email = ?", email).First(&user)

	//check if user exists
	if user.ID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "invalid Credentials",
		})
	}

	//struct newpassword of type password
	var newPassword Password

	//get password data from form body
	if err := c.BodyParser(&newPassword); err != nil {
		return c.JSON(err.Error())
	}

	//compare formdata password and db user password
	//returns true/false
	match := checkPasswordHash(newPassword.Password, user.Password)

	//if passwords match
	if match {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  fiber.StatusBadRequest,
			"message": "Password should not be same as previous one.",
		})
	}

	//hash the new password
	hashedNewPassword, _ := hashPassword(newPassword.Password)

	//update users password
	initializers.DB.Model(&user).Update("password", hashedNewPassword)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  fiber.StatusOK,
		"Message": "Password Reset was successful",
	})

}

// generate hashed password
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// compare passwords
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func generateToken(userdata string) (string, error) {

	// Create the Claims
	claims := jwt.MapClaims{
		"userdata": userdata,
		"user":     true,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(os.Getenv("SECRET")))

	return t, err
}
