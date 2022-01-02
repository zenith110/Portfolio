package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"github.com/zenith110/portfilo/graph/generated"
	"github.com/zenith110/portfilo/graph/model"
	"github.com/zenith110/portfilo/graph/routes"
	"os"
)

var databaseUri = os.Getenv("DATABASEURI")

func (r *mutationResolver) CreateArticle(ctx context.Context, input *model.NewArticle) (*model.Article, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Login(ctx context.Context, input *model.LoginUser) (*model.AccessCode, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Article(ctx context.Context, name string) (*model.Article, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Articles(ctx context.Context) (*model.Articles, error) {
	routes.FetchArticles(databaseUri)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
