# competition-administration-service

Service to administer competitions

## Competition
An competition may be one or more races. The competition is dedicated to one class of competitors.

The start list can be created with a draw, using a point system, a cup standing, a stage event overall standing, a qualification system or other methods.

A race is given a start list and produces a result list, which is an ordering of the competitors.

----------------
The above is based on [International Competition Rules (ICR) Cross-Country](http://www.fis-ski.com/mm/Document/documentlibrary/Cross-Country/02/95/69/ICRCross-Country2017_clean_English.pdf)


-------------------------
![Alt text](https://g.gravizo.com/svg?
  digraph G {
    aize ="4,4";
    main [shape=box];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red];
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a string"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
  }
)
