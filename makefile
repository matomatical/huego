dev/%.js: src/%.jsx dev/
	swc --config jsc.parser.jsx=true $< -o $@

dev/%.html: src/%.html dev/
	cp $< $@

dev/%.css: src/%.css dev/
	cp $< $@

all: dev/index.html dev/styles.css dev/colors.js dev/lib

dev/lib: lib dev/
	cp -r lib dev/

dev/:
	mkdir -p dev/

lib:
	mkdir lib
	curl "https://unpkg.com/react@18.2.0/umd/react.development.js" -o lib/react.development.js
	curl "https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js" -o lib/react-dom.development.js

clean:
	rm -rf dev/

.PHONY: clean all
