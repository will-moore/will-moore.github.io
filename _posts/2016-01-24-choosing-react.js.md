---
layout: post
title: Choosing React.js
---

We've recently been considering how to clean up the aging "jQuery soup"
that the OMERO web client has accumulated over the years.

Of course there are now a large number of javascript frameworks to choose
from that weren't around when the web client was created.

However, we're not in a position where we can start a new application from scratch.
Even if we had the resourses, it is generally agreed
[to be a bad idea](https://www.reddit.com/r/javascript/comments/3v43qf/im_a_web_developer_who_uses_jquery_to_write_a/).

This means we need to gradually update parts of the app, as time allows, while
continuing to develop the existing functionality.
In my mind, this rules out the adoption of a full application framework such as
Angular or Ember. Simply the size of the move is prohibitive given the amount
of unstructured jQuery code that we have. We have no idea how long it would
take to get everything working in the new framework.

On the other hand, React can be used within existing pages simply by specifying
the DOM element you want to render. Therefore it can be used on a small part
of the code without breaking the entire app.

<img src="{{ site.baseurl }}/images/ReactCentrePanel.png" style="width:773px; height:389px"/>

After doing a [little experimenting](https://github.com/will-moore/react_omero)
with React, I decided to [try it on the centre panel of the webclient](https://github.com/openmicroscopy/openmicroscopy/pull/4413). This was a good spot to evaluate React since
the buggy jQuery code was poor at handling a number of different update events.
Although that is very much a work in progress, I have found it really nice to
replace the jQuery code with a much simpler React code.

I still have a few issues to work out (watch this space) but
OMERO webclient is very likely to be adopting React in the not-too-distant future.
