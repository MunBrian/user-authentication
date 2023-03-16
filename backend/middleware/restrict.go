package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func RestrictHome(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(*jwt.Token)

	if !ok {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	claims := user.Claims.(jwt.MapClaims)

	name, ok := claims["userdata"].(string)

	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	c.Set("X-User-Name", name)

	return c.Next()
}

func RestrictResetPassword(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(*jwt.Token)

	if !ok {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	claims := user.Claims.(jwt.MapClaims)

	email, ok := claims["userdata"].(string)

	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	c.Set("X-User-Email", email)

	return c.Next()
}
