package repository

import (
	"errors"
	"fmt"
	"geenie_calendar/model"

	"github.com/google/uuid"
)

var _ model.IEventRepository = &OnmemoryEventRepository{}

type OnmemoryEventRepository struct {
	events []*model.Event
}

func (events *OnmemoryEventRepository) FindAll() ([]*model.Event, error) {
	return events.events, nil
}

func (events *OnmemoryEventRepository) FindById(id string) (*model.Event, error) {
	for _, event := range events.events {
		if event.ID == id {
			return event, nil
		}
	}
	return nil, errors.New("イベントが見つかりませんでした")
}

func (events *OnmemoryEventRepository) Store(event *model.Event) error {
	event.ID = uuid.New().String()
	events.events = append(events.events, event)
	return nil
}

func (events *OnmemoryEventRepository) Update(id string, newEvent *model.Event) error {
	oldEvent, err := events.FindById(id)
	if err != nil {
		return err
	}
	*oldEvent = *newEvent
	return nil
}

func (events *OnmemoryEventRepository) Delete(id string) error {
	_, err := events.FindById(id)
	if err != nil {
		return err
	}
	fmt.Println("asdf")
	for i, event := range events.events {
		if event.ID == id {
			events.events = append(events.events[:i], events.events[i+1:]...)
			return nil
		}
	}
	return nil
}
