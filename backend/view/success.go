package view

import (
	"encoding/json"
	"geenie_calendar/model"
	"time"

	"github.com/gin-gonic/gin"
)

type Event struct {
	*model.Event
}

var timeLocation *time.Location

func init() {
	loc, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		panic(err)
	}
	timeLocation = loc
}

func (e *Event) MarshalJSON() ([]byte, error) {
	v, err := json.Marshal(&struct {
		ID        string   `json:"id"`
		Title     string   `json:"title"`
		Start     string   `json:"start"`
		End       string   `json:"end"`
		ClassName string   `json:"className"`
		AllDay    bool     `json:"allDay"`
		Users     []string `json:"users"`
	}{
		ID:        e.ID,
		Title:     e.Title,
		Start:     e.Start.In(timeLocation).Format(time.RFC3339),
		End:       e.End.In(timeLocation).Format(time.RFC3339),
		ClassName: e.ClassName,
		AllDay:    e.AllDay,
		Users:     e.Users,
	})
	return v, err
}

func SuccessEvents(c *gin.Context, events []*model.Event) {
	asdf := make([]Event, len(events))
	for i, event := range events {
		asdf[i] = Event{event}
	}
	c.JSON(200, asdf)
}

func SuccessEvent(c *gin.Context, event *model.Event) {
	c.JSON(200, Event{event})
}

func Success(c *gin.Context, body any) {
	c.JSON(200, body)
}
