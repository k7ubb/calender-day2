package model

type User string

type IUsersRepository interface {
	FindAll() ([]User, error)
}

var UserRepository IUsersRepository

func GetAllUsers() ([]User, error) {
	return UserRepository.FindAll()
}
