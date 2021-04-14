target:
		make -j 2 start-node run-app
.PHONY: target

run-app:
		cd frontend/hotspot-map/src; yarn start;
.PHONY: run-app

start-node:
		cd backend; node app.js;
.PHONY: start_node