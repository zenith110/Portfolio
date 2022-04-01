package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"os"

	"github.com/zenith110/portfilo/graph/generated"
	"github.com/zenith110/portfilo/graph/model"
	"github.com/zenith110/portfilo/graph/routes"
)

func (r *mutationResolver) CreateArticle(ctx context.Context, input *model.CreateArticleInfo) (*model.Article, error) {
	var err error
	article, err := routes.CreateArticle(input)
	return article, err
}

func (r *mutationResolver) UpdateArticle(ctx context.Context, uuid *string, input *model.UpdatedArticleInfo) (*model.Article, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteArticle(ctx context.Context, uuid *string) (*model.Article, error) {
	article, err := routes.DeleteArticle(uuid)
	return article, err
}

func (r *mutationResolver) DeleteAllArticles(ctx context.Context) (*model.Article, error) {
	article, err := routes.DeleteArticles()
	return article, err
}

func (r *mutationResolver) Login(ctx context.Context, input *model.LoginUser) (*model.AccessCode, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Article(ctx context.Context, uuid string) (*model.Article, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Articles(ctx context.Context) (*model.Articles, error) {
	articles, err := routes.FetchArticles()
	return articles, err
}

func (r *queryResolver) GithubProjects(ctx context.Context) (*model.GithubProjects, error) {
	githubUser := os.Getenv("GITHUBUSER")
	github, err := routes.FetchProjects(githubUser)
	return github, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
