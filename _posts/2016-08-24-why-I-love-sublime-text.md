---
layout: post
title: Why I love Sublime Text
---

For a long time now, my editor of choice has been Sublime Text 2.
However, it's best features are not obvious out of the box, and
some need installing as plugins.

If you're using Sublime Text then don't miss out: follow these simple
steps to enhance your workflow. If you're not using it, maybe
these tips will persuade you to give it a try!

Keyboard Shortcuts
==================

First, some built-in keyboard short-cuts. You can get much bigger lists
[elsewhere](http://sweetme.at/2013/08/08/sublime-text-keyboard-shortcuts/)
or just by browsing menus in the app, but these are my favorites:

⌘ + D
-----

The <code>⌘ + D</code> key combination first selects the current
word at the cursor and then sequentially multi-selects subsequent
occurences of that word. This is really useful for editing the same
text in multiple places without having to do a search-and-replace
of the whole document.

<img src="{{ site.baseurl }}/images/sublime_cmdD_edit.gif" style="width:648px"/>

But I use this even more frequently to jump through a document to
find the same text elsewhere, such as a method call.

<img src="{{ site.baseurl }}/images/sublime_cmdD_gifsicle.gif" style="width:648px"/>


⌘ + L
-----

Simply use <code>⌘ + L</code> to select a whole line,
usually to copy or delete it.
Often I remove a bunch of console.log or print lines by
selecting them with <code>⌘ + D</code> and <code>⌘ + L</code>
and then <code>Delete</code>.

<img src="{{ site.baseurl }}/images/sublime_cmdDcmdL.gif" style="width:648px"/>

⌘ + /
-----

This is for commenting-out the selected lines. The same
<code>⌘ + /</code> works on many different file types E.g. Python
JavaScript, HTML, CSS adding the correct comment syntax to each. Very handy.

⌘ + [ or ]
----------

This will indent selected text to the left or right by a 'Tab' E.g. 4 spaces.

⌘ + F
-----

Quickly "Find" words in your current document. Or use <code>Shift + ⌘ + F</code>
to perform a "Global Find" of all files in your Project.

⌘ + P
-----

You can use <code>⌘ + P</code> to launch the quick-search prompt for
finding files in your Project. I used to spend a lot of time browsing
the file hierarchy but now I always just search and jump straight to the file.

<img src="{{ site.baseurl }}/images/sublime_cmdP.gif" style="width:700px"/>


Shift + ⌘ + P
-------------

The <code>Shift + ⌘ + P</code> key combination launches the command prompt.
You can use a 'fuzzy search' here to find and run any menu item.
We'll be using this in a bunch of places below.


Package Control
===============

All the packages are installed via Package Control, but even this doesn't
come built-in. Follow these [install instructions](https://packagecontrol.io/installation#st2)
to get started with Package Control.

After a restart, you can use <code>Shift + ⌘ + P</code> to launch the menu shortcut dialog
and type 'Install'. Select "Package Control: Install Package" and wait a moment for the
list of available packages to load. Then you can filter and select to install...

Git
---

The [git package](https://github.com/kemayo/sublime-text-git/wiki) has a bunch of
commands, but the one I use most is 'Git Diff Current' which will show the diff
of the file you're editing. Quickly launch the command prompt
with <code>Shift + ⌘ + P</code> then with fuzzy search <code>'g d c'</code> is enough
to find it:

<img src="{{ site.baseurl }}/images/sublime_GitDiffCurrent.gif" style="width:648px"/>

Git Gutter
----------

This is one of the packages that I couldn't live without.
[Git Gutter](https://github.com/jisaacks/GitGutter) shows your code modifications
in the gutter as you're editing. It's really useful to see which parts
of a file you're currently working on, and for removing unwanted changes
before committing. You can see Git Gutter in all the animations above.

Sublime Linter
--------------

Sublime Linter will give you warnings of syntax errors when you save
(or when editing) instead of during run-time. It works for multiple
languages out of the box, including JavaScript and Python.

<img src="{{ site.baseurl }}/images/sublime_linter.gif" style="width:700px"/>

Conclusion
==========

That may seem like a lot to remember, but you don't have to learn them all at once!
Just pick the ones you find most useful to start with and go from there.

Happy editing!
