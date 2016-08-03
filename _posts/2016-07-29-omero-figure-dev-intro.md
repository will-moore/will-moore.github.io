---
layout: post
title: OMERO.figure dev introduction
---

Since a few other developers on the OME team are showing an interest
in starting to work on [OMERO.figure](http://figure.openmicroscopy.org/),
I'm giving an intro chat/workshop soon.
So, here's a few hastily assembled thoughts on what you might need to know...

Setup
=====

You'll want to have the [OMERO.web framework running on your machine](https://www.openmicroscopy.org/site/support/omero5.2/developers/Web/Deployment.html).

Hopefully the instructions at [github.com/ome/figure](https://github.com/ome/figure)
are enough to get OMERO.figure setup and running locally.
As always, any suggestions for improving those docs are welcome.

You'll want to have ```$ grunt watch``` running the whole time you're developing.

Code Layout
===========

JavaScript
----------

OMERO.figure is largely JavaScript, based on [Backbone.js](http://backbonejs.org/), under ```static/figure/```. A couple of files there are compiled by the grunt task. 

 - ```static/figure/figure.js``` is all the JavaScript code, simply concatenated.
 - ```static/figure/js/templates.js``` is the compiled ```underscore.js``` templates.

Probably these 2 files should be separate from the source code. Source code should probably be moved to it's own top-level ```src/``` dir, and certainly ```templates.js``` should be moved up a dir to ```static/figure/templates.js```.

HTML
----

The main HTML page is at [templates/figure/index.html](https://github.com/ome/figure/blob/master/templates/figure/index.html). Any HTML that is
there when the app starts (page layout, menus etc) can be added here.
We use the [Twitter bootstrap](http://getbootstrap.com/) framework (current version 3.0.0) for all this.
The index.html also includes a fair number of dialogs that are hidden initially.

Underscore templates
--------------------

All the dynamic HTML is based on [Underscore.js](http://underscorejs.org/)
templates under [/static/figure/templates/](https://github.com/ome/figure/tree/master/static/figure/templates)
These are compiled by grunt as described above.

Django
------

Since this is a Django app, Python ```urls.py``` and ```views.py``` are
top-level files and contain all the web-server code for connecting to
OMERO, saving figures, running figure export scripts etc.

Figure export script
--------------------

The Python script for generating PDF and TIFF exports of the figure is
at [scripts/omero/figure_scripts/Figure_To_Pdf.py](https://github.com/ome/figure/blob/master/scripts/omero/figure_scripts/Figure_To_Pdf.py).
This uses [ReportLab](http://www.reportlab.com/) to generate PDF
(read the [User Guide](https://www.reportlab.com/docs/reportlab-userguide.pdf))
and [Pillow](https://pillow.readthedocs.io/) to generate TIFFs.


Building / Working with Git
===========================

The building of ```figure.js``` and ```templates.js``` happens during
development with the ```$ grunt watch```. This means that there's no 
build step by ci during deployment time or at release time.
This means that deploying and releasing are simpler, BUT it means that
you need to include the changes in these files in your commits.


JavaScript code overview
========================

The main code is started in the jQuery 'ready' function in
```static/figure/js/app.js```. Here we create the main Backbone
Models and Views and define the various ```routes``` that we
need. Then we 'start' the browsing history.

The FigureModel contains all the state and logic for the figure
we're editing. It includes a ```PanelList``` collection of panels
which are the individual image panels on the figure.
The FigureView handles most of the UI rendering and events for the
main app, E.g. top level menus etc. It also creates a
```new PanelView()``` each time a ```Panel``` is added to the
panels collection. The ```Panel View``` handles rendering of
each panel in the main figure canvas.

The ```RightPanelView``` manages rendering of the floating
dialog that shows details of selected panels. It listens to
selction changes on the ```FigureModel```, and creates
child Views for the selected panels each time.

Dialogs
-------

There's quite a bit of functionality that happends in
modal dialogs, E.g. drawing ROIs, cropping panels,
opening figure files etc. As mentioned above, the HTML for
each dialog is in the figure/index.html
```<div class="modal" id="roiModal" ...```

The bootstrap modal dialogs can then be shown with 
``` $("#roiModal").modal("show"); ```

In general, the UI logic for these is in a ```ModalView```
E.g. ```RoiModalView``` that is instantiated once when the
app starts and the ```FigureView``` is created, see
```FigureView.initialize()```. The ```FigureModel``` is passed to
each ```View``` so that the View can access the currently
selected ```Panels```.
Any code that needs to be run when the dialog opens can
listen for that with
{% highlight javascript %}
$("#roiModal").bind("show.bs.modal", function(){...
{% endhighlight %}


Getting started
===============

Often the easiest way to find the bit of code you need to work on
for a particular feature is to use the browser dev tools to
right-click on the part of the app UI you want to work on and
"Inspect Element". Then you can see the underlying html and search
the code base for matches.  
NB: be careful that you don't find and start to edit the compiled
```figure.js``` code!

I think that's enough for now. I may add more info later,
depending on feedback from the workshop.

Good Luck!

UPDATE
------

Today (3rd August 2016) I went through this OMERO.figure intoduction with a number of
our team and then a coding demo. The code changes from the demo are in
[the first commit](https://github.com/ome/figure/pull/160/commits/e957801ce6677c6133918e8a05712365d13c6f11)
of the [Lookup Tables PR #160](https://github.com/ome/figure/pull/160).
