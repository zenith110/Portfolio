package routes

import (
	"context"
	"fmt"
	"log"

	"github.com/zenith110/portfilo/graph/model"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateArticle(input *model.CreateArticleInfo) (*model.Article, error) {

	client := ConnectToMongo()
	collection := client.Database("blog").Collection("articles")
	article := model.Article{Title: *input.Title, Author: &model.Author{Name: *input.Author, Profile: "", Picture: ""}, ContentData: *input.ContentData, DateWritten: *input.DateWritten, URL: *input.URL, Description: *input.Description, UUID: *input.UUID}
	res, err := collection.InsertOne(context.TODO(), article)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a single document: ", res.InsertedID)
	return &article, err
}
func DeleteArticle(uuid *string) (*model.Article, error) {
	client := ConnectToMongo()
	collection := client.Database("blog").Collection("articles")
	article := model.Article{UUID: *uuid}
	deleteResult, deleteError := collection.DeleteOne(context.TODO(), bson.M{"uuid": *uuid})
	if deleteResult.DeletedCount == 0 {
		log.Fatal("Error on deleting data", deleteError)
	}
	return &article, deleteError
}
