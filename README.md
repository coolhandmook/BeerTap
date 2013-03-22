Description
-----------

Inspired by @TheBatTaps twitter feed, this app reads a twitter feed for specially formatted messages describing beers on tap at a pub, turning them into a list of what's currently on tap. It also helps with maintaining one of these lists if you're a pub manager/worker.

Licence
-------

MIT Licence, see LICENCE.txt

For following a pub's twitter feed
----------------------------------

At the moment you don't need to authorise with twitter just to view a pub's feed. Just click the "Follow" button and add the pubs your interested in.

However, with the twitter API v1 being deprecated, you may need to authenticate the app in the near future.

As a tool for bar staff
-----------------------

If you go to the settings page and authenticate with a twitter account, then add that same account as somebody to follow, the app will show a different page allowing you to add, change or remove beers and get the tweet format correct automatically.

Tweet format
------------

You can still of course do the tweets by hand if they're in the correct format.

Tweets must follow this simple format:

    OFF: Some beer
    ON: Another brew

There must be a new line between commands.

Multiple OFF or ON commands per tweet is ok, but the order within a single tweet is important. For example, the following has the net effect of doing nothing - the second line cancels the first out:

    ON: Malty Goodness
    OFF: Malty Goodness

A single command is also ok. For example, these are also valid:

    OFF: Different booze

or

    ON: Tasty stuff

The app collects these together in chronological order and cancels out any previous ONs with an OFF so you end up with a list of current beers on tap.

For example, if these tweets were collected:

    ON: Holy Hops
    ---
    OFF: Malty Goodness
    ON: Worts And All
    ---
    ON: Magic Bevvy
    ---
    OFF: Holy Hops
    ON: Great Grog

You'd end up with this list:

* Worts And All
* Magic Bevvy
* Great Grog

