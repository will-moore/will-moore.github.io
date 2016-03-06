---
layout: post
title: React render - purely props and state?
---

In React.js, components should use ``props`` and ``state`` as the source of data for
rendering HTML. The ``props`` is for static data and the ``state`` is for
the component to store data that changes.

A component's render() function is usually described as a "pure" function that takes props and
state and returns the same HTML each time, with no side effects.
But is it an anti-pattern if render() is not a pure function? 

In the scenario below, I'm caching some some data as a simple attribute of the component,
and re-using this in subsequent calls to render().


{% highlight javascript %}
var ImageGallery = React.createClass({

    render: function() {

        // we cache the parent node for subsequent calls to render()
        this.previousParent = parentNode;

        // ...other code omitted... see jsfiddle below
    }
});
{% endhighlight %}


This is what I've done to implement the particular behaviour I wanted...


The problem
===========

Our application uses [jsTree](https://www.jstree.com/) to load and browse
collections of images. The jstree is outside of the React part of the application.
We use React to render image thumbnails in a gallery when they (or their parent folder)
are selected in the tree. The jstree manages all ``state`` and the React components
merely recieve selected images as ``props``.
However, when an image is de-selected in the tree (Cmd-click),
we still want to see the same folder of thumbnails in the gallery.

<img src="{{ site.baseurl }}/images/reactCachePreviousParent.gif" style="width:773px"/>

The current solution
====================

To get this behaviour, I simply cache the parent jsTree node on every render().
Then, on subsequent calls to render(), if nothing is selected in the tree, I
use the previously cached parentNode. You can try this in the jsfiddle below.

It seems wrong to be storing data within React components without using ``props``
or ``state``. But I can't update ``props`` (immutable), and I can't ``setState()`` in a ``render()`` call
because this will lead to recursion!

Maybe I should just be happy with the way it is, but I can't help wondering if there's
a nicer way to do this?
I guess I could cache the parentNode outside of the React code, such as in the jsTree itself,
but this seems like it would be a lot more code, so only worth it if there's a good reason.
If you have any ideas, please feel free to try them in the jsfiddle and let me know
what you come up with, Thanks!

<script async src="http://jsfiddle.net/will_moore/jdbp5dqk/25/embed/js,html,result/"></script>



