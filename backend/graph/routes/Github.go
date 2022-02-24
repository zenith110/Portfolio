package routes

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"regexp"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"

	"github.com/zenith110/portfilo/graph/model"
)
type Language struct{
	Language string
}
/*
Given a language url, loop through the json contents and append it into a tag struct
*/
func ParseLanguages(languagesUrl string) ([]model.Tag){
	var tags []model.Tag
	req, err := http.Get(languagesUrl)
	if err != nil{
		panic(err)
	}
	bodyData, err := ioutil.ReadAll(req.Body)
	if err != nil {
		panic(err)
	}
	tagsData := string(bodyData)
	regexPattern := regexp.MustCompile(`([A-Za-z])\w+`)
	regexData := regexPattern.FindAllString(tagsData, -1)
	for stackData := range regexData{
		var tag model.Tag
		tag.Language = regexData[stackData]
		tags = append(tags, tag)
	}
	return tags
}
func StringConvert(text *string) (string){
	if text != nil{
		return *text
	}
	return ""
}
/*
@Params - nil
@Description - Fetches github projects and returns the data in an array for the graphql endpoint to grab
*/
func FetchProjects(githubUser string) (*model.GithubProjects, error) {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: os.Getenv("GITHUBACCESSTOKEN")},
	)
	tc := oauth2.NewClient(ctx, ts)
	// transport := &oauth2.Transport{
	// 	Source: oauth2.StaticTokenSource(
	// 	&oauth2.Token{AccessToken: os.Getenv("GITHUBACCESSTOKEN")}),
		
	// }
	client := github.NewClient(tc)
	repos, _, err := client.Repositories.List(ctx, githubUser, nil)
	if _, ok := err.(*github.RateLimitError); ok {
		fmt.Println("hit rate limit")
	}
	var projects []*model.Project
	for repo := 0; repo < len(repos); repo++ {
				projects = append(projects, &model.Project{
				Name:   StringConvert(repos[repo].Name),
				Link:   StringConvert(repos[repo].HTMLURL),
				Readme: StringConvert(repos[repo].Description),
				Languages: ParseLanguages(StringConvert(repos[repo].LanguagesURL)),
				Stars: repos[repo].GetStargazersCount(),
				
			})
	}
	var gitProjects = model.GithubProjects{Projects: projects}
	return &gitProjects, err
}
