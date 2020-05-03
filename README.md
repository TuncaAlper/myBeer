# Project

Project created with React as a front-end framework over Javascript. Preferred to use React-Hooks instead of Class components, and deployed to Heroku. To see the live version, you can click the link below.

https://mybeer1.herokuapp.com/

# My Beer!

User can search for beer informations via BreweryDB api. 

- User can search beers by name from the search bar. 
- User can see all the available countries and beer types through the main page.
- User can select the country and beer type to filter beers accordingly. 


# My Work

First, I draw a schema on a paper to build my ideas and to be able to see what I need in order to accomplish this app. I also make it to provide myself a path to see how i can implement a transmission for the informations through components and pages. Then, I checked the BreweryDB api's documentation.

Due to paginated api, api's restrictions on free developer version and possible performance decreases; I did not want to fetch beers data page by page as waterfall. I chose to make a request based on a user's behavior on the page. 
In order to get over the cors issue, I added 'cors-anywhere.herokuapp' endpoint to beginning of api endpoints.

I wanted to implement a search bar to search a beer with a word or letters. Instead of checking all beers or using a filter, user can reach to beer details page more quickly with that search result. 

On the initial page setup, the website is fetching the country and type data, then it is sorting them by name in order to render on the page. With that list of data, user can see all the available options for countries and types, and can also make a filter among those options. Based on the users' filter, platform starts to fetch beer data through the paginated api to display all related beers.

According to the conditions below, platform starts fetching the data from the next page until the end of the last page:
- if there are less then 10 beers to fit user criteria,
- if user scroll down until the end of list, 


While implementing React, instead of using the class component order, I choose to use functional components with hooks which is a powerful tool after the recent developments. Using hooks will provide more simplified and easy to read codebase, as well as it makes the coding process faster in this kind of small projects, and I wanted to improve my self-knowledge about it as well. Additionally, I integrated the lodash library to learn it and used it in some places to simplfy the coding. 

Finally, to accomplish basic user interface, I started the project with bootstrap library. However, after some point, to show my ui capacity, I removed the bootstrap and created .css files to style the page without any library. While adding css, I checked the visuality in some other devices as well. 