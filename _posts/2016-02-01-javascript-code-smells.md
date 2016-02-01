---
layout: post
title: Javascript Code smells
---

I've just been flicking through some
[slides on "Javascript Code Smells"](http://elijahmanor.com/talks/js-smells/) from
[Elijah Manor's blog post](http://elijahmanor.com/javascript-smells/) and picked
up a few tips I'm going to keep in mind and thought I'd share.


Code complexity
---------------

It's all too easy to keep on adding code to a particular function as you work through
the logic in your mind. But then you look back and find that it's a massive
unreadable block. Simply splitting this into smaller functions improves the readability
and makes it more self-documenting. I've not gone so far as to use tooling to
highlight convoluted code (as suggested in the talk), but it's just something to
be watch out for.


forEach DOM element
-------------------

This isn't really a code smell, but another useful tip I got from the talk.

Although most projects seem to end up using jQuery at some point, it's nice to try
and get by without, until you need it. One thing that you miss is the nice iteration
through DOM elements. I've got used to the functional programming style of
using ```forEach``` to iterate through lists, but the DOM API NodeList doesn't support this.
A nice workaround is to use ```[].forEach.call```, passing in the NodeList:


{% highlight javascript %}
var boxes = document.querySelectorAll('.Box');

[].forEach.call(boxes, function(element, index) {
  element.innerText = "Box: " + index;
});
{% endhighlight %}

Much nicer than using a ```for``` loop!


The "this abyss" smell
----------------------

This is something that I've been doing routinely for as long as I've been
writing javascript. Assigning 'this' to another name, usually 'self',
so that it's accessible within the scope of an inner function.
For example, in some recent React.js code:

{% highlight javascript %}
render: function(){
    var self = this;
    var icons = this.imgJson.map(function(image){
        return (
            <ImageIcon
                key={image.id}
                iconSize={self.props.iconSize}
                handleIconClick={self.handleIconClick} />
        );
    });

    return (<div>{icons}</div>)
}
{% endhighlight %}

I've even found places where I've added ```var self = this;```
just out of habit, even though I didn't go on to use the ```self```!

There's several ways to fix the "this abyss", as shown in the talk.
For example, you can use ```.bind(this)```. When appied to the
code above it becomes that much cleaner:

{% highlight javascript %}
render: function(){
    var icons = this.imgJson.map(function(image){
        return (
            <ImageIcon
                key={image.id}
                iconSize={this.props.iconSize}
                handleIconClick={this.handleIconClick} />
        );
    }.bind(this));

    return (<div>{icons}</div>)
}
{% endhighlight %}

Hope you found these little tips useful, and thanks Elijah for the talk!
