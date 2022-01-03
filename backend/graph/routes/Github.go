package routes

import (
	"context"
	"fmt"

	"github.com/google/go-github/github"
	"github.com/rs/zerolog"

	// "github.com/rs/zerolog/log"
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
	// name, HTMLURL, Description
	fmt.Println(repos[0])
	var githubproj model.GithubProjects
	return &githubproj, err
}
