package main

import (
	"github.com/MunBrian/user-authentication/controllers"
	"github.com/MunBrian/user-authentication/initializers"

	"github.com/MunBrian/user-authentication/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v3"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDB()
}

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Post("/signup", controllers.UserSignUp)

	app.Post("/login", controllers.UserLogin)

	app.Post("/forgot-password", controllers.ForgotPassword)

	// JWT Middleware
	app.Use(jwtware.New(jwtware.Config{SigningKey: []byte("secret")}))

	app.Get("/home", middleware.Restrict, controllers.HomePage)

	err := app.Listen(":8000")

	if err != nil {
		panic(err)
	}

}
