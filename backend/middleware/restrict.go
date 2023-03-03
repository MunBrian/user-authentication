package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func Restrict(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(*jwt.Token)

	if !ok {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	claims := user.Claims.(jwt.MapClaims)

	name, ok := claims["name"].(string)

	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	c.Set("X-User-Name", name)

	return c.Next()
}
