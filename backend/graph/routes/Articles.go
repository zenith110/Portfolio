package routes

import (
	"context"
	"fmt"
	"log"

	"github.com/zenith110/portfilo/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func FetchArticles() (*model.Articles, error) {
	var err error
	// Create a temporary array of pointers for Article
	var articlesStorage []model.Article
	client := ConnectToMongo()
	db := client.Database("blog").Collection("articles")
	findOptions := options.Find()
	//Passing the bson.D{{}} as the filter matches documents in the collection
	cur, err := db.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		fmt.Printf("An error has occured, could not find collection! \nFull error %s", err.Error())
	}
	var totalArticles int = 0
	// Find returns a cursor, loop through the values in the cursor
	for cur.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var article model.Article
		err := cur.Decode(&article)
		if err != nil {
			fmt.Printf("An error has occured, could not find decode article data! \nFull error %s", err.Error())
		}

		articlesStorage = append(articlesStorage, article)
		totalArticles += 1
	}
	var articles = model.Articles{Article: articlesStorage, Total: totalArticles}
	if err := cur.Err(); err != nil {
		fmt.Printf("An error has occured, could not parse cursor data! \nFull error %s", err.Error())
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	
	return &articles, err
}

func DeleteArticles() (*model.Article, error) {
	client := ConnectToMongo()
	fmt.Print("Connected to mongodb!")
	if err := client.Database("blog").Collection("articles").Drop(context.TODO()); err != nil {
    	log.Fatal(err)
	}
	var article model.Article
	var err error
	return &article, err
}
