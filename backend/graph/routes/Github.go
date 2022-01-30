package routes

import (
	"context"
	"fmt"

	"github.com/google/go-github/github"
	"github.com/rs/zerolog"

	"github.com/zenith110/portfilo/graph/model"
)

/*
@Params - nil
@Description - Fetches github projects and returns the data in an array for the graphql endpoint to grab
*/
func FetchProjects(githubUser string) (*model.GithubProjects, error) {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	client := github.NewClient(nil)
	ctx := context.Background()
	repos, _, err := client.Repositories.List(ctx, githubUser, nil)
	var projects []*model.Project
	// name, HTMLURL, Description

	// var githubproj model.GithubProjects{Projects}
	for repo := range repos {
		if repos[repo] != nil {
			projects = append(projects, &model.Project{
				Name:   *repos[repo].Name,
				Link:   *repos[repo].HTMLURL,
				Readme: *repos[repo].Description,
			})
		} else {
			fmt.Print("Found a nil!")
		}
	}
	fmt.Print("projects is: ", projects)
	var gitProjects = model.GithubProjects{Projects: projects}
	return &gitProjects, err
}
