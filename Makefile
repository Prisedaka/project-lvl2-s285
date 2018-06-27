install: install-deps install-flow-typed

run:
	npm run babel-node -- 'src/bin/gendiff.js'

install-deps:
	npm install

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

publish:
	npm publish

lint:
	npm run eslint .

.PHONY: test

install-pack:
	sudo npm -g install gendiff_prisedaka
