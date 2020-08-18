<p> 
<h2>
This is the 2nd iteration of the World Bank Sustainable Livestock Guide.
</h2>
<br>
<br>
The full composed site is in /dist, and can be taken and worked on from there. This contains all the individual rendered static html pages and their related css/js.
<br>
<br>
Jekyll is used as the development platform, with gulp being used to help cleanup and seperate the codebase. 
<br>
All templating and template data loading is done in Jekyll. Javascript script tags and css style tags are used in the html wherever makes them the easiest to understand alongside the code. Gulp is used to extract all the tags and consolidate them into page-specific files during the build process stored in the same asset directory.
<br> 
<br>
The github site is stored in /docs
<br>
To use the jekyll dev enviroment:
<br> 
You must have node/npm & ruby/gem pre-installed.
<br> 
To install:
<h4>gem install bundler</h4>
<h4>npm install</h4>
<br> 
To rebuild for dist run: 
<h4>npm run-script build </h4>
<br> 
To rebuild the github site:
<h4>npm run-script deploy </h4>
<br>
If you want to continue using the Jekyll dev enviroment in a livereload/watch capacity, you will need to run Jekyll liveserver and gulp watch seperately as I have yet to integrate the two in the dev enviroment.
<h4>jekyll serve --livereload</h4>
<br>npm run
<h4>gulp watch</h4>
<br>
Nothing is minified.
<br>
/assets/data/map.js is where the ISL Guide data map is located, along with the iconMap.
<br>
All the guidance html documents are stored in /assets/data/guidance and /ah for animal health and /e for enviromental health respecitively. The documents can be updated/marked up in these html documents or a html document can be served by the server.
</p>
