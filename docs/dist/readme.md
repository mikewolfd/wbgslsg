<p> 
<h2>
This is the 2nd iteration of the World Bank Sustainable Livestock Guide.
</h2>
Jekyll is used as the development platform, with gulp being used to help cleanup and seperate the codebase. 
<br>
All templating and initial data loading is done in Jekyll. Javascript script tags and css style tags are used in the html wherever makes them the easiest to understand alongside the code. Gulp is used to extract all the tags and consolidate them into page-specific files during the build process. 
<br>
The full composed site is in /dist, and can be taken and worked on from there. 
<br>
To rebuild run: 
<h4>npm run-script build </h4>
If you want to continue making changes in Jekyll, you will need to run Jekyll liveserver and gulp watch seperately as I have yet to integrate the two in the dev enviroment.
<br>
Nothing is minified.

/assets/data/map.js is where the ISL Guide data map is located, along with the iconMap.

All the guidance html documents are stored in /assets/data/guidance and /ah for animal health and /e for enviromental health respecitively. The documents can be updated/marked up in these html documents or a html document can be served by the server.

</p>