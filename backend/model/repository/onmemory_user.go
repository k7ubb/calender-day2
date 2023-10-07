package repository

import "geenie_calendar/model"

type OnmemoryUserRepository struct {
	Users []model.User
}

var _ model.IUsersRepository = &OnmemoryUserRepository{}



func (users *OnmemoryUserRepository) FindAll() ([]model.User, error) {
	return users.Users, nil
}
