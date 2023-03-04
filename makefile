dev/%.js: src/%.jsx
	swc --config jsc.parser.jsx=true $< -o $@

dev/%.html: src/%.html
	cp $< $@

dev/%.css: src/%.css
	cp $< $@

all: dev/index.html dev/styles.css dev/colors.js dev/lib

dev/lib: lib
	cp -r lib dev/

lib:
	mkdir lib
	curl "https://unpkg.com/react@18.2.0/umd/react.development.js" -o lib/react.development.js
	curl "https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js" -o lib/react-dom.development.js

clean:
	rm -rf dev/

.PHONY: clean all
