package controller

import (
	"geenie_calendar/model"
	"geenie_calendar/view"

	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	users, err := model.GetAllUsers()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	view.Success(c, users)
}
