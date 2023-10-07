package controller

import (
	"errors"
	"fmt"
	"geenie_calendar/model"
	"geenie_calendar/view"
	"time"

	"github.com/gin-gonic/gin"
)

func GetAllEvents(c *gin.Context) {
	events, err := model.GetAllEvents()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	view.SuccessEvents(c, events)
}

func GetEvent(c *gin.Context) {
	id := c.Param("id")
	event, err := model.GetEventById(id)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}
	view.SuccessEvent(c, &event)
}

type CreateEventRequest struct {
	Title     string   `json:"title"`
	Start     string   `json:"start"`
	End       string   `json:"end"`
	ClassName string   `json:"className"`
	AllDay    bool     `json:"allDay"`
	Users     []string `json:"users"`
}

func (r *CreateEventRequest) ToEvent() (*model.Event, error) {
	startTime, err := time.Parse(time.RFC3339, r.Start)
	if err != nil {
		return nil, errors.New("開始時刻が不正です")
	}
	endTime, err := time.Parse(time.RFC3339, r.End)
	if err != nil {
		return nil, errors.New("終了時刻が不正です")
	}
	event, err := model.NewEvent(r.Title, startTime, endTime, r.ClassName, r.AllDay, r.Users)
	if err != nil {
		return nil, err
	}
	return event, nil
}

func CreateEvent(c *gin.Context) {
	var eventReq CreateEventRequest
	if err := c.ShouldBindJSON(&eventReq); err != nil {
		view.BadRequest(c, err.Error())
		return
	}
	event, err := eventReq.ToEvent()
	if err != nil {
		view.BadRequest(c, err.Error())
		return
	}
	if err := model.StoreEvent(event); err != nil {
		view.InternalServerError(c, err.Error())
		return
	}
	c.Status(201)
}

type UpdateEventRequest struct {
	Title     *string  `json:"title"`
	Start     *string  `json:"start"`
	End       *string  `json:"end"`
	ClassName *string  `json:"className"`
	AllDay    *bool    `json:"allDay"`
	Users     []string `json:"users"`
}

func (r *UpdateEventRequest) ToEvent() (*model.Event, error) {
	startTime, err := time.Parse(time.RFC3339, *r.Start)
	if err != nil {
		return nil, errors.New("開始時刻が不正です")
	}
	endTime, err := time.Parse(time.RFC3339, *r.End)
	if err != nil {
		return nil, errors.New("終了時刻が不正です")
	}
	event, err := model.NewEvent(*r.Title, startTime, endTime, *r.ClassName, *r.AllDay, r.Users)
	if err != nil {
		return nil, err
	}
	return event, nil
}

func PatchEvent(c *gin.Context) {}

func UpdateEventAllFields(c *gin.Context) {
	id := c.Param("id")
	_, err := model.GetEventById(id)
	if err != nil {
		view.NotFound(c, err.Error())
		return
	}

	var eventReq UpdateEventRequest
	if err := c.ShouldBindJSON(&eventReq); err != nil {
		view.BadRequest(c, err.Error())
		return
	}

	fmt.Println(eventReq)

	event, err := eventReq.ToEvent()
	if err != nil {
		view.BadRequest(c, err.Error())
		return
	}

	if err := model.UpdateEvent(id, event); err != nil {
		fmt.Println(err)
		view.InternalServerError(c, err.Error())
		return
	}
	c.Status(204)
}

func UpdateEvent(c *gin.Context) {
	c.Param("id")
	id := c.Param("id")
	_, err := model.GetEventById(id)
	if err != nil {
		view.NotFound(c, err.Error())
		return
	}

	var eventReq UpdateEventRequest
	if err := c.ShouldBindJSON(&eventReq); err != nil {
		view.BadRequest(c, err.Error())
		return
	}
	fmt.Println(eventReq)

	newEvent, err := findFieldsWhereUpdating(id, eventReq)
	if err != nil {
		view.BadRequest(c, err.Error())
	}

	if err := model.UpdateEvent(id, &newEvent); err != nil {
		fmt.Println(err)
		view.InternalServerError(c, err.Error())
		return
	}
	c.Status(204)
}

// newEventsの値でoldEventsのフィールドを更新する
// newEventsのフィールドが空文字列やゼロ値の場合は更新しない
func findFieldsWhereUpdating(id string, updateValues UpdateEventRequest) (model.Event, error) {
	oldEvent, _ := model.GetEventById(id)
	if updateValues.Title != nil {
		oldEvent.Title = *updateValues.Title
	}
	if updateValues.Start != nil {
		startTime, _ := time.Parse(time.RFC3339, *updateValues.Start)
		oldEvent.Start = startTime
	}
	if updateValues.End != nil {
		endTime, _ := time.Parse(time.RFC3339, *updateValues.End)
		oldEvent.End = endTime
	}
	if updateValues.ClassName != nil {
		oldEvent.ClassName = *updateValues.ClassName
	}
	if updateValues.AllDay != nil {
		oldEvent.AllDay = *updateValues.AllDay
	}
	if updateValues.Users != nil {
		oldEvent.Users = updateValues.Users
	}
	newEvent, err := model.NewEvent(oldEvent.Title, oldEvent.Start, oldEvent.End, oldEvent.ClassName, oldEvent.AllDay, oldEvent.Users)
	if err != nil {
		return model.Event{}, err
	}
	return *newEvent, nil
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")

	_, err := model.GetEventById(id)
	if err != nil {
		view.NotFound(c, err.Error())
		return
	}

	if err := model.DeleteEvent(id); err != nil {
		view.InternalServerError(c, err.Error())
		return
	}
	c.Status(204)
}
