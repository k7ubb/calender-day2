package repository

import (
	"fmt"
	"geenie_calendar/model"
	"reflect"
	"testing"
)

func TestOnmemoryEventRepository_Store(t *testing.T) {
	tests := []struct {
		name          string
		defaultEvents []*model.Event
		args          *model.Event
		wantErr       bool
	}{{
		name:          "t1",
		defaultEvents: []*model.Event{},
		args: &model.Event{
			Title:     "test",
			ClassName: "test",
			AllDay:    false,
			Users:     []string{},
		},
		wantErr: false,
	}}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			events := &OnmemoryEventRepository{
				events: tt.defaultEvents,
			}
			err := events.Store(tt.args)
			fmt.Println(*(events.events[0]))
			if (err != nil) != tt.wantErr {
				t.Errorf("OnmemoryEventRepository.Store() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestOnmemoryEventRepository_FindById(t *testing.T) {
	tests := []struct {
		name          string
		defaultEvents []*model.Event
		args          string
		want          *model.Event
		wantErr       bool
	}{{
		name: "t1",
		defaultEvents: []*model.Event{{
			ID:        "test",
			Title:     "test",
			ClassName: "test",
			AllDay:    false,
			Users:     []string{},
		}},
		args:    "test",
		wantErr: false,
		want: &model.Event{
			ID:        "test",
			Title:     "test",
			ClassName: "test",
			AllDay:    false,
			Users:     []string{},
		},
	},{
		name: "t1",
		defaultEvents: []*model.Event{{
			ID:        "test",
			Title:     "test",
			ClassName: "test",
			AllDay:    false,
			Users:     []string{},
		}},
		args:    "test1",
		wantErr: true,
	}}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			events := &OnmemoryEventRepository{
				events: tt.defaultEvents,
			}
			got, err := events.FindById(tt.args)
			if (err != nil) != tt.wantErr {
				t.Errorf("OnmemoryEventRepository.FindById() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("OnmemoryEventRepository.FindById() = %v, want %v", got, tt.want)
			}
		})
	}
}
