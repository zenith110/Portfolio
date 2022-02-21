package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/zenith110/portfilo/graph"
	"github.com/zenith110/portfilo/graph/generated"
	"github.com/zenith110/portfolio/graph/middleware"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("GRAPHQLPORT")
	if port == "" {
		port = defaultPort
	}
	auth, err := middleware.Auth.authenticator.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authenticator: %v", err)
	}


	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	http.Handle("/auth", auth)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
