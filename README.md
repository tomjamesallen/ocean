# Jekyll + React / Flux Boilerplate

A starting point for building single page React apps on top of Jekyll, or for adding a little bit of React on top of a standard Jekyll site.

## Why?

Jekyll sites are free to host with Github Pages, provide basic compilation of site content, and via the wonderful editor [Prose.io](http://prose.io/) Markdown files can be edited online with no need for clients to dig into the code.

## What should I use this for?

As of yet I haven't dug into matching the React router to the content built by Jekyll - I think this _could_ work quite well, but I haven't tested it yet. Feel free to fork away and give it a go. So for now, I see two ways of using this:

1. A basic static site, but with React rendering dynamic elements, such as sound or video players etc. Jekyll handles serving up the different pages, React is an add-on.
2. A single page app, where the React Router uses hash-history, and Jekyll serves up data. Jekyll is pretty good for dynamically rendering JS to the page, based on the content or meta data from posts (or any other content), so you can essentially create a basic JS api that the React App can load in. It's not the prettiest way to create an API, but it works.

## Getting started

To install, simply download the repository (or git clone) and run `npm install` (you will also need gulp [installed globally][gulp]). Once that's done its thing, run `gulp` to start the development watch task; this will start the development server, and watch all assets for changes. You can open the site in your browser at `http://localhost:8899`. Once you're ready to push your changes to the server, run `gulp build` to compile all the site assets into `/_site`.

### The directories

The directory setup is a little convoluted, on account of Jekyll liking all of its src files to be in the root directory, and the two step build process (gulp / jekyll).

* `/src` contains the src JS and Scss files, the ones that you'll want to work on.
* `/dist` contains the compiled JS.
* `/_site` contains the final, compiled site - Gulp runs first, so `/src` is compiled into `/dist` and then Jekyll picks up dist, along with all its other assets, and compiles the lot into `/_site`.

Inspired by [https://robwise.github.io/blog/jekyll-and-gulp](https://robwise.github.io/blog/jekyll-and-gulp).

[gulp]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
