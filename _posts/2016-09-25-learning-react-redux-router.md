---
layout: post
title: Learning React Redux & Router
---

<img src="{{ site.baseurl }}/images/redux-store.png" style="width:7200p; height:321px"/>

I love having a nice side project, to [learn something new
and keep up with the web](http://wesbos.com/overwhelmed-with-web-development/).

Starting out on a new project with React, I decided it was
time I learnt a few new things: mostly Redux and React-Router,
with a bit more ES6 thrown in for good measure!
Even though Dan says 
[You might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367#.bvo7vu4d0),
everyone's talking about it so there must be something worth looking at...

Starting with Redux
-------------------

Where to start? The tutorial at [redux.js.org](http://redux.js.org/) seemed
the obvious choice. The introduction made a lot of sense and the sections
on actions, reducers and store were pretty straight-forward. Even the
unfamiliar ES6 arrow functions were cool! Looking good so far...

Usage with React
----------------

The learning curve [starts ramping up a bit with React-Redux](https://medium.com/front-end-hacking/redux-is-kicking-my-trash-6b8356eaa90a#.ks7cxqszw) and really blasts off in the "Advanced"
section with ```Async Actions```:

{% highlight javascript %}
# Help! What does 'return dispatch =>' mean again?!?

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
{% endhighlight %}

But with the finishing line in sight I muddled through this and ```React Router```
section and I was done! 

I even managed to build all this into my nascent app.
But something was missing, and trying to fix it flummoxed me for a while...


The missing link
----------------

The tutorial was great, but I found that it missed one vital piece of info.
In any app that uses React Router *and* loads data via Async Actions, you need to
link these. However, it's not clear where this linking should happen.

From [previous React experience]({{ site.baseurl }}/forcing-react-components-to-mount/), I knew that you can use a component's ```componentDidMount``` function to kick off loading
of data. For this to work with React Router and Redux, you'd need a single component
to have access to the url parameter **AND** the Redux store.

OK, I can do this...

{% highlight javascript %}

// Component gets the userId from the url...
const mapStateToProps = (state, ownProps) => {
    return {
        userId: ownProps.params.userId,
    }
}

// ...and gets a fetchUser() function here...
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUser: (userId) => {
            dispatch(fetchUser(userId))
        }
    }
}

// ...and in the Component we combine them like this:
componentWillMount() {
    this.props.fetchUser(this.props.userId);
}

{% endhighlight %}


This worked OK initially: when first visiting a url, E.g. /users/:userId/ the ```componentDidMount```
uses the ```userId``` to load the specified ```user```. However, when the url changes
to a new ```userId```, nothing new is loaded since ```componentDidMount``` is not fired again.

Calling ```fetchUser(userId)``` under other lifecycle methods just got me into endless loops. 😢😖

Looking for a solution
----------------------

Googling for a solution picked up some promising results:
[firing actions in response to route transitions in react-router](https://github.com/reactjs/redux/issues/227) described the exact issue I was having! This led to [React router integration](https://github.com/reactjs/redux/issues/177),
which led to [Docs: Usage with React Router](https://github.com/reactjs/redux/issues/637).
However, these discussions contained so many different opinions and examples that it was
impossible for newbie-me to identify a solution.
It didn't help that many examples used older versions of Redux and Router. 
But when [Dan committed to writing the docs](https://github.com/reactjs/redux/issues/637#issuecomment-180319955) I felt the answer was within my grasp!

So, it was kinda frunstrating to find that issue was close with
[this PR](https://github.com/reactjs/redux/pull/1929) which was part of the tutorial I'd
already covered! So, back to square 1.

Redux Examples
--------------

Eventually I looked at the [Redux examples](http://redux.js.org/docs/introduction/Examples.html).
Only the [Real World Example](https://github.com/reactjs/redux/tree/master/examples/real-world)
had the solution I needed, but it was a lot more complex than anything covered before
and took a long time before I could get into it.

I finally found what seemed to be the solution.
I needed to add this alongside the ```componentWillMount()``` from above:

{% highlight javascript %}

componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
        this.props.fetchUser(nextProps.userId)
    }
}
{% endhighlight %}

Finishing up
------------

To consolidate everything above, I wanted to try and write my own minimal
[Real World Example](https://github.com/will-moore/react-router-async-tryout/)
that loaded users from the github api.

This was harder than expected and I ended up starting from scratch
with the [React Router tutorial](https://github.com/reactjs/react-router-tutorial).

I used the [lesson 10](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/10-clean-urls)
example as my starting point and built the app on top of that.
This uses ```hashHistory``` instead of ```browserHistory``` which makes it easier
to host on a static page.


Try the example
---------------

And here's the app embedded in this page. You'll see the
url hash change in the browser when you click and load users:

<html>
<div id="app" style="border: solid red 1px; padding: 10px"></div>

<script src="https://will-moore.github.io/react-router-async-tryout/bundle.js"></script>
</html>


Is this right?
--------------

It seems wrong to *need* a UI component to fetch data in response to url changes.
Surely the Redux store itself should be able respond to url changes and fetch
data as needed?

Is this what [React Redux Router](https://github.com/reactjs/react-router-redux)
is for? That's probably the next thing I need to look at.

I'd be interested to know if others have found this issue tricky,
or maybe this would be a no-brainer if I was a bit more fluent in React
before starting React Redux.

Thanks for reading to the end!

