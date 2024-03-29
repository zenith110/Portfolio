DEV_FILE = dev.yml
PROD_FILE = prod.yml
DEV_DOCKER_COMPOSE=docker-compose -f $(DEV_FILE)
PROD_DOCKER_COMPOSE=docker-compose -f $(PROD_FILE)
default: build

#==================================================#
# Builds and does other docker functionality #
#==================================================#
build: # Builds using all the dockerfiles and docker-compose provided
	@echo "Building site backend"
	@$(DEV_DOCKER_COMPOSE) up --build
clean: # Removes all orphans processes
	@echo "Cleaning up processes for docker-compose"
	@$(DEV_DOCKER_COMPOSE) down -v
stop:
	@echo "Putting down container now!"
	@$(DEV_DOCKER_COMPOSE) down 
detached: # Runs the containers in daemon mode
	@echo "Running processes in detached mode!"
	@$(DEV_DOCKER_COMPOSE) up -d --build
prod-build:
	@echo "Now running in prod enviroment"
	@$(PROD_DOCKER_COMPOSE) up --build
prod-detached:
	@echo "Now running in prod enviroment"
	@$(PROD_DOCKER_COMPOSE) up -d --build
fetch:
	@echo "Fetching latest sub-modules!"
	git submodule update --init --recursive
#===============================================#
#     Application specific commands #
#===============================================#
generate-schema: # Runs generate schema command from go makefile
	$(MAKE) -C Portfolio-Backend/ generate-schema
build-tailwind: # Runs generate schema command from go makefile
	@$(DEV_DOCKER_COMPOSE) exec frontend npm run build:tailwind
build-fontawesome: # Runs generate schema command from go makefile
	@$(DEV_DOCKER_COMPOSE) exec frontend npm run build:fontawesome
build-frontend:
	@$(DEV_DOCKER_COMPOSE) build-tailwind build-fontawesome
