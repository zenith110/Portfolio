package routes

import (
	"context"
	"fmt"
	"github.com/zenith110/portfilo/graph/model"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func FetchArticles(databaseUri string, dbName string, dbCollection string) (*model.Articles, error) {
	// Create a temporary array of pointers for Article
	var articlesStorage []*model.Article
	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(databaseUri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	db := client.Database(dbName).Collection(dbCollection)
	findOptions := options.Find()
	//Passing the bson.D{{}} as the filter matches documents in the collection
	cur, err := db.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	var totalArticles int = 0
	// Find returns a cursor, loop through the values in the cursor
	for cur.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var article model.Article
		err := cur.Decode(&article)
		if err != nil {
			log.Fatal(err)
		}

		articlesStorage = append(articlesStorage, article)
		totalArticles += 1
	}
	var articles = model.Articles{Articles: articlesStorage, Total: totalArticles}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	// Close the cursor once finished
	cur.Close(context.TODO())

	fmt.Printf("Found multiple documents: %+v\n", articlesStorage)
	return &articles, err
}
