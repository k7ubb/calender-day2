package model

import (
	"errors"
	"time"
)

type Event struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Start     time.Time `json:"start"`
	End       time.Time `json:"end"`
	ClassName string    `json:"className"`
	AllDay    bool      `json:"allDay"`
	Users     []string  `json:"users"`
}

func (e *Event) Update(title string, start time.Time, end time.Time, className string, allDay bool, users []string) error {
	if users == nil {
		users = []string{}
	}
	if title != "" {
		e.Title = title
	}
	if !start.IsZero() {
		e.Start = start
	}
	if !end.IsZero() {
		e.End = end
	}
	e.ClassName = className

	e.AllDay = allDay
	e.Users = users
	return nil
}

type IEventRepository interface {
	FindAll() ([]*Event, error)
	FindById(id string) (*Event, error)
	Store(event *Event) error
	Update(id string, event *Event) error
	Delete(id string) error
}

func NewEvent(title string, start time.Time, end time.Time, className string, allDay bool, users []string) (*Event, error) {
	if title == "" {
		return nil, errors.New("タイトルが空です")
	}
	if start.After(end) {
		return nil, errors.New("開始時刻が終了時刻より後になっています")
	}
	if users == nil {
		users = []string{}
	}
	event := &Event{
		Title:     title,
		Start:     start,
		End:       end,
		ClassName: className,
		AllDay:    allDay,
		Users:     users,
	}
	return event, nil
}

var EventRepository IEventRepository

func GetAllEvents() ([]*Event, error) {
	events, error := EventRepository.FindAll()
	return events, error
}

func GetEventById(id string) (Event, error) {
	event, error := EventRepository.FindById(id)
	return *event, error
}

func StoreEvent(event *Event) error {
	error := EventRepository.Store(event)
	return error
}

func UpdateEvent(id string, event *Event) error {
	event.ID = id
	error := EventRepository.Update(id, event)
	return error
}

func DeleteEvent(id string) error {
	error := EventRepository.Delete(id)
	return error
}
