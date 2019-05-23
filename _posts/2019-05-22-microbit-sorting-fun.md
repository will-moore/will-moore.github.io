---
layout: post
title: Microbit sorting fun
---


At the last Code club of the year this week, we tried a fun microbit game that the kids
really enjoyed and was also a great learning exercise.

The idea was to try some sorting challenges, with the children sorting themselves using
a microbit each to tell them whether their number was greater or smaller than their colleagues'.

Here's the code.
First, on start, we set the Radio group so that all the micro-bits can talk to each
other. We also pick a 'secret' random number.

<img src="{{ site.baseurl }}/images/microbit-sort/1-start.png" style="width:350px" />

Next, when the user presses button A, we send their number to all the other micro-bits.

<img src="{{ site.baseurl }}/images/microbit-sort/2-buttonA.png" style="width:242px" />

When the Radio recieves a number from another microbit, we show a down-arrow if our
number is less than the recieved number. Otherwise we show an up-arrow.

<img src="{{ site.baseurl }}/images/microbit-sort/3-recieve.png" style="width:394px" />

This allows users to compare their numbers. So the challenge for the kids is to
sort themselves into order using only this information.
When they think that they are all sorted, they can press A+B to reveal thier
numbers and hopefully they will find that they are correctly ordered.

<img src="{{ site.baseurl }}/images/microbit-sort/4-buttonAB.png" style="width:197px" />

We first tried this with about 10 kids at once and it was a bit chaotic,
and easy to lose track of each child's position.

It worked much better to start with 3 children and they managed to sort themselves
correctly. Then they tried with 4, 5, 6 and 7 kids. Each time the sorting challenge
was more complex but they worked out a sorting algorithm amonst themselves which
was great to see.

When the numbers got up to around 8 or more, it got tricky again.
Afterwards, I realised that we could have taken a sorted line of 6 or 7 kids,
and added 1 child at a time, inserting themselves into the correct spot in 
the line.

Anyway, it was a lot of fun and the kids really enjoyed it. Give it a try!
