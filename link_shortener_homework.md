#Link Shortener

A link shortener is a tool that takes a long URL and shortens it. **WOW!! MAGIC!!**

Link shorteners are especially useful for sites like twitter where you have a limit on how many characters you are allowed to type.

The purpose of a link shortener is to take a long url like this

[https://github.com/ga-students/WDI_SEA_02_Notes/tree/master/week_03_into_to_express/day_04_sequelize](https://github.com/ga-students/WDI_SEA_02_Notes/tree/master/week_03_into_to_express/day_04_sequelize)

and turn it in to something like this...

[https://tr.im/9iRaU](https://tr.im/9iRaU)

####Popular Link Shorteners

* [https://tr.im/](https://tr.im/)
* [http://ow.ly/](http://ow.ly/)
* [https://goo.gl/](https://goo.gl/)
* [http://bit.ly](http://bit.ly)


##User Experience

####User 1 - Url creator

**Description:** Anyone that needs to shorten a URL.

**Usage:** User should be able to come to the site, enter a url, click submit (or press enter) and receive a shortened url that they can share. 


####User 2 - Url recipient

**Description:** Anyone that receives a shared URL (from user 1)

**Usage:** User should be redirected to the original URL used to create the shortened url.



##Site Routes

| Verb | URL | Purpose | Description |
|---|---|---|---|
| GET | / | Home page | Contains a simple form where a user can enter a URL and get a short url |
| POST | /links | Create Link | Accepts data from the form. Stores the url in the database and redirects to the show route. |
| GET | /links/:id | Show Link | Displays the short url of the specified id (so the user can copy / share it) |
| GET | /:hash | Redirect | Takes a hash and redirects the user to the url stored in the database |


##Database Model

This should only require 1 database model called "links" which can contain 3 columns id, url, hash.

**Optional** Try using only 2 columns (id and url)


##Suggested Process

####Set up project / express

* create project directory
* npm init
* Install web server stuff (npm): express ejs body-parser
* Setup a basic express server (res.send('hi') on `GET /` route)
* Build all pages / routes

####Add database

* Install database stuff (npm): pg pg-hstore sequelize
* create database (postgres)
* sequelize init
* Create migration
* Run migration
* Test model (try to create / find links using node console)

####Put it together

* Install hashing module (npm): hashids
* Add code in to your previously created routes so they interact with the database and generate hashes ([draw the rest of the owl](http://www.forimpact.org/wp-content/uploads/2014/01/HowToDrawOwl.jpg)).

##Resources

[Hashids documentation](https://www.npmjs.com/package/hashids)

[Sequelize documentation](http://docs.sequelizejs.com/en/latest/)

[Express documentation](http://expressjs.com/4x/api.html)

##Bonus - Track click count

Keep track of how many times the shortened url is used. To do this you'll just need to add another column `count:Integer` to the links table and increment it every time someone is redirected to that url.

Additionally, add a count to the Show page... eg: "This link has been clicked **X** times."

##Extra Bonus - Link index page

Create a link index `GET /links` that lists all links in the database sorted by the click count (most popular links on top).


