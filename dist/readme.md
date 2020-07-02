<p> 
This is the 2nd iteration of the World Bank Sustainable Livestock Guide.
</p>
<p>
I decided to startover from scratch.
<p>
Jekyll is used as the development platform, with gulp being used to help cleanup and seperate the codebase. 
</p>
<p>
All templating and dataloading is done in Jekyll, javascript script tags and css style tags are used in the html wherever makes them the easiest to understand alongside the code. Gulp is used to extract all the tags and consolidate them into page-specific files during the build process. 
</p>
<p>
The full composed site is in _site, and can be takene and worked on from there.

If you want to continue making changes in Jekyll, you will need to run Jekyll and gulp seperately as I have yet to integrate the two. 
Running the following command will clean, build, and integrate this package. 
`jekyll clean && jekyll b && gulp`
</p>

Nothing is minified. The only browser optimization I did was to dynamic