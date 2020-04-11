# COVID-19 stats and news

A website displaying COVID-19 stats country by country on a world map. Stats in world map are supplied by an API, and same things goes for the news - they're also being fed by an API.
 
## Demo

You can find a live demo of the site on [GitHub pages](https://amandaemk.github.io/project-two/)

## UX
 
The goal of the project is simply to display some basic stats and news related to COVID-19. Keeping this in mind I felt that an uncomplicated, clean design would
allow for the best possible user experience. I purposely avoided a sensationalistic use of colours (ie red for fatalities in the chart).


### User stories

- As a user, I want to see the latest stats for various countries around the world
- As a user, I want to find the latest news on COVID-19 in the UK while avoiding fake news

### Wireframes

You can find the wiresframes for the project in the wireframes folder.

## Features

The features on mobile are the same as on desktop.
 
### Existing features

- World map
    - The main part of the project is the interactive world map displaying the latest COVID-19 data. When you hover a country, you can see the latest stats in a pop-up. If you click a country, a chart will load displaying historic stats.

- News
    - The news section displaying a selection (6 articles) of the latest UK news on COVID-19.

- About
    - For more info and giving credit to the API I'm using

- Contact
    - In case someone would have something to say

### Potential future features

More charts and the ability to select region for news (and perhaps load more articles too) would be good things to add in the future.

## Technologies used

- [JQuery](https://jquery.com)
    - To make DOM manipulation easier

- [SimpleMaps](https://simplemaps.com/resources/free-world-map)
    - SimpleMaps interactive HTML5/Javascript world map is used

- [Flot](https://www.flotcharts.org)
    - To easily create nice lookings charts

- [Smartable AI COVID-19 data & news API](https://developer.smartable.ai/)
    - This API provides all the stats for the world map, and also the news

- [Bootstrap 4.4](https://getbootstrap.com/)
    - To make styling easier

- [Fontawesome](https://fontawesome.com/start)
    - Icons for the news articles are from here

- [Balsamiq](https://balsamiq.cloud/)
    - Created my wireframes using Balsamiq
    
- [Layoutit](https://www.layoutit.com/)
     - Used this bootstrap grid generator to create the basic layout

## Testing

CSS and HTML comes back error free when run through [W3C Markup Validation Service](https://validator.w3.org/)

Since the project is pretty straight forward and there isn't much to test in Jasmine anyway, I opted against it and went with manual testing only.

The project has been continually tested on throughout the development process using the latest version of Chrome for Mac OS (as of 6 April 2020). It has also been tested on iPhone X and iPad Pro. It is optimised for these devices and browsers. 

Examples of such continuous testing, what I cam across and how I dealt with it:
- Links have been clicked to ensure that the open where they should (nav links in same tab, links out in new ones)
- Where identified as necessary little css changes have been made to add to the responsability of the layout (media queries, responsive font sizes)
- Since the chart was not showing up on mobile due to .chart-container not having an height, it was given the height of #country-chart using an event listener.
- When formatting the dates in the news section, the leading zeroes were missing. This was resolved by adding a zero to the front of any number less than 10. This code is placed on top of the script since it won't work inside an ajax function.
- Another things I found out as I was going along was that the statistics API did not have ISO codes for all countries. This is a problem since the map data is using ISO codes as the key, meaning it's not possible to insert country data without an ISO code. Instead of manually adding the ISO code all these countries, I decided just leave it (keeping the map work without them by making sure that any country without an IsoCode will be ignored) in the hopes of the API properly supplying them in the future. I set the default of state_description in mapdata.js to "No data" so that these countries would at least display something. I also changed the colour of them to a lighter colour, so that the user would be abe to clearly tell apart the ones with data from the ones without, and in that way avoid hovering "empty" countries which would be annoying and confusing.
  
You will find that the features are the same on mobile as on desktop. What does change slightly is the layout: instead of the map and chart being side by side in mobile, the chart will be potisioned underneath the map.
Another thing is that on mobile, the news article cards are not displayed 3 x 2 like on desktop, but stacked on top of each other. On iPad Pro the layout will be similar to the one on desktop.

### User story testing

After completing the project, I have performed the following two user story based tests both on mobile and in browser without running into any issues.

**"As a user, I want to see the latest stats for various countries around the world"**

1. World map:
    1. Zoom in on the map and hover a country
    2. Make sure data appears in the pop-up
    3. Click a country and ensure that the chart displaying the right data appears next to it

**"As a user, I want to find the latest news on COVID-19 in the UK while avoiding fake news"**

1. News section:
    1. Go to the News section by clicking the "News" link in navigation bar
    2. Click on all the links (article photo, title and news outlets link) and make sure they work and take you to the right place
    3. (Since the API I chose uses AI technology to spot fake news, I'd say one is safe from them on here)


## Deployment

The project has been backed up using Git. It is deployed on GitHub Pages directly from the master branch. The development version and the deployed one are the same.

## Credits

### Special thanks

- Big thank you to my mentor for all his guidance and encouragement
- This project would not have been anything near what it is if it wasn't for the patience and educational efforts of my friends who have spent countless hours tirelessly explaining the same things to me over and over again until they finally clicked, made inspiring suggestions on how things could potentionally be solved, and always took the time to point me in the right direction when I was lost or had gotten stuck. Thank you!