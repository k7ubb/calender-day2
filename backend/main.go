package main

import (
	"geenie_calendar/model"
	"geenie_calendar/model/repository"
	"geenie_calendar/router"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	setupUserRepository()
	setupEventRepository()
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	router.SetupRouter(r)

	if err := r.Run("127.0.0.1:8080"); err != nil {
		panic(err)
	}
}

func setupEventRepository() {
	model.EventRepository = &repository.OnmemoryEventRepository{}

	event, err := model.NewEvent("インターン(Webアプリケーション)", time.Date(2023, 9, 7, 12, 0, 0, 0, time.FixedZone("JST", 9*60*60)), time.Date(2023, 9, 7, 20, 0, 0, 0, time.FixedZone("JST", 9*60*60)), "仕事", false, []string{})
	if err != nil {
		panic(err)
	}

	model.StoreEvent(event)
}

func setupUserRepository() {
	model.UserRepository = &repository.OnmemoryUserRepository{
		Users: []model.User{
			"Dennis Ritchie",
			"Jedi Luke Skywalker",
			"Ken Thompson",
			"Linus Torvalds",
			"Neumann",
		},
	}
}
