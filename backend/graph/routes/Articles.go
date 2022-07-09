package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"github.com/zenith110/portfilo/graph/model"
)

type Zinc struct {
	Took     int64 `json:"took"`
	TimedOut bool  `json:"timed_out"`
	Hits     Hits  `json:"hits"`
}

type Hits struct {
	Total    Total `json:"total"`
	MaxScore int64 `json:"max_score"`
	Hits     []Hit `json:"hits"`
}

type Hit struct {
	Index     string `json:"_index"`
	Type      string `json:"_type"`
	ID        string `json:"_id"`
	Score     int64  `json:"_score"`
	Timestamp string `json:"@timestamp"`
	Source    Source `json:"_source"`
}

type Source struct {
	Author      string `json:"Author"`
	ContentData string `json:"ContentData"`
	DateWritten string `json:"DateWritten"`
	Description string `json:"Description"`
	Tags        string `json:"Tags"`
	Title       string `json:"Title"`
	TitleCard   string `json:"TitleCard"`
	UUID        string `json:"UUID"`
	URL         string `json:"Url"`
}

type Total struct {
	Value int64 `json:"value"`
}

func FetchArticles(keyword string) (*model.Articles, error) {
	var err error
	// Create a temporary array of pointers for Article
	var articlesStorage []model.Article
	var zinc Zinc
	data := SearchDocuments("articles", keyword)
	zincError := json.Unmarshal(data, &zinc)
	if zincError != nil {
		log.Fatal(err)
	}
	hits := zinc.Hits.Hits
	totalArticles := 0
	for hit := range hits {
		var tags []model.Tag
		tagsStringsSplit := strings.Split(hits[hit].Source.Tags, ",")
		for tagData := 0; tagData < len(tagsStringsSplit); tagData++ {
			tag := model.Tag{
				Language: tagsStringsSplit[tagData],
			}
			tags = append(tags, tag)
		}
		author := model.Author{Name: hits[hit].Source.Author, Profile: "", Picture: ""}
		article := model.Article{Author: &author, ContentData: hits[hit].Source.ContentData, DateWritten: hits[hit].Source.DateWritten, Description: hits[hit].Source.Description, Tags: tags, Title: hits[hit].Source.Title, TitleCard: hits[hit].Source.TitleCard, UUID: hits[hit].Source.UUID, URL: hits[hit].Source.URL}
		articlesStorage = append(articlesStorage, article)
		totalArticles += 1
	}
	var articles = model.Articles{Article: articlesStorage, Total: totalArticles}

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
