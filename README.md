* See code live at: https://aiglobelam.github.io/

## During development, test code using webpack dev server
1) `npm run dev`

## Test built code for github.io locally
Start a webserver serving built code to see if the built code works
1) `npm run build:githubio` puts code in to `build/githubio` folder 
2) cd into root of project if not already there `/`
3) run command `python -m SimpleHTTPServer` to start a webserver
4) open browser [localhost:8000](http://localhost:8000/) to see built code
5) commit push dance smile
