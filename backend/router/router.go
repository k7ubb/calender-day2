package router

import (
	"geenie_calendar/controller"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {

	api := r.Group("/api")

	api.GET("/events", controller.GetAllEvents)
	api.POST("/events", controller.CreateEvent)
	api.PUT("/events/:id", controller.UpdateEventAllFields)
	api.PATCH("/events/:id", controller.UpdateEvent)
	api.DELETE("/events/:id", controller.DeleteEvent)
	api.GET("/users", controller.GetAllUsers)
}
