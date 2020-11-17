package operations

import (
	"database/sql"
	"log"
	"strings"
	"time"

	"github.com/vonage/vonage-go-sdk"
)

//CheckTodo Checks the expired todos, send message and updates
func CheckTodo(smsClient *vonage.SMSClient, db *sql.DB) {

	timer := time.NewTicker(30 * time.Minute)
	quit := make(chan struct{})

	for {
		select {
		case <-timer.C:
			sqlQuery := `SELECT * FROM todos`
			res, err := db.Query(sqlQuery)
			var todoList Todo

			t := time.Now().Local()
			s := t.String()
			currentDate := strings.Split(s, ".")[0]

			for res.Next() {
				res.Scan(&todoList.Key, &todoList.Task, &todoList.Date, &todoList.Status, &todoList.Email, &todoList.Number)
				splitedDate := strings.Split(todoList.Date, "T")
				todoDate := splitedDate[0] + " " + splitedDate[1] + ":00"
				if currentDate >= todoDate && todoList.Status == "Pending" {
					res, err := smsClient.Send("Vonage APIs", "584247519745", todoList.Task+" has expired!", vonage.SMSOpts{})

					if err != nil {
						log.Fatalf("Error: %s", err)
					}

					if res.Messages[0].Status == "0" {
						log.Printf("Message sent task: %s, phone: %s", todoList.Task, todoList.Number)
					}
					ExecuteUpdate("Expired", todoList.Key, db)
				}

			}

			if err != nil {
				log.Fatal(err)
			}
		case <-quit:
			timer.Stop()
		}
	}

}
