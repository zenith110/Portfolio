package routes

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/zenith110/portfilo/graph/model"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)
func CreateArticle(title *string, author *string, contentData *string, dateWritten *string, url *string) (*model.Article, error){
	mongoURI := os.Getenv("MONGOURI")
	// Set client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
	collection := client.Database("blog").Collection("articles")
	article := model.Article{Title: *title, Author: &model.Author{Name: *author, Profile: "", Picture: ""}, ContentData: *contentData, DateWritten: *dateWritten, URL: *url}
	res, err := collection.InsertOne(context.TODO(), article)
	if err != nil {
    log.Fatal(err)
	}

	fmt.Println("Inserted a single document: ", res.InsertedID)
	return &article, err
}