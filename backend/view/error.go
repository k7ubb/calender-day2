package view

import "github.com/gin-gonic/gin"

func BadRequest(c *gin.Context, err string) {
	c.JSON(400, gin.H{"error": err})
}

func NotFound(c *gin.Context, err string) {
	c.JSON(404, gin.H{"error": err})
}

func InternalServerError(c *gin.Context, err string) {
	c.JSON(500, gin.H{"error": err})
}
