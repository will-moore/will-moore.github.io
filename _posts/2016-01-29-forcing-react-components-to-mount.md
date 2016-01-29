---
layout: post
title: Forcing React Components to re-mount
---

I wonder if I'm making a newbie mistake here (just not
found the "right" way to fix this problem) or if this
is a neat way to solve a common use-case...?

The problem
===========

If you want a React component to load data from the server,
you can make an AJAX call in the ```componentDidMount``` function.
When the call returns you can simply call setState() with
the data and the component will display it - great!


{% highlight javascript %}
    componentDidMount: function() {
        $.ajax({
            url: "/load/data/",
            success: function(data) {
                this.setState({data: data});
            }.bind(this);
        });
{% endhighlight %}


However, in the OMERO webclient, we need to use a ```<PlateGrid />```
component to display a plate of images, specified by plateId.
The plateId is a property of the ```<PlateGrid />``` component and is changed
when the selected plate changes in the parent "tree".

<img src="{{ site.baseurl }}/images/ReactCentrePanelPlate.png" style="width:773px; height:389px"/>

However, if we do the loading of the specified plate in the
```componentDidMount``` function, then this does not get called
when the plateId is updated, so the component will not
re-render to show the new plate.


{% highlight javascript %}
	componentDidMount: function() {
        $.ajax({
            url: "/load/plate/" + this.props.plateId,
            success: function(plate) {
                this.setState({plate: plate});
            }.bind(this);
        });
{% endhighlight %}


My solution
===========

I found that if I add a ```key={plateId}``` to my <Plate /> component,
then this would force the component to re-mount each time the
selected plateId changed.
However, I don't see this described anywhere in the React.js docs. Instead
it seems that the ```key``` attribute is used to *avoid* re-mounting a
components in a list, which makes me think that I'm misusing it. Is there
a better way to fix the problem above?

