package controllers

import (
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

func UserLogin(c *fiber.Ctx) error {

	//create formData struct of type LoginData
	var formData LoginData

	//create user struct of type User
	var user models.User

	//get data from body
	if err := c.BodyParser(&formData); err != nil {
		return c.JSON(err.Error())
	}

	//get task from db using email
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

func HomePage(c *fiber.Ctx) error {
	// Get "name" claim value from request header
	name := c.GetRespHeader("X-User-Name")

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"name": name,
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

func generateToken(username string) (string, error) {

	// Create the Claims
	claims := jwt.MapClaims{
		"name": username,
		"user": true,
		"exp":  time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))

	return t, err
}
