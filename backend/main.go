package main

import (
	"github.com/MunBrian/user-authentication/controllers"
	"github.com/MunBrian/user-authentication/initializers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDB()
}

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Post("/signup", controllers.UserSignUp)

	app.Post("/login", controllers.UserLogin)

	err := app.Listen(":8000")

	if err != nil {
		panic(err)
	}
}
