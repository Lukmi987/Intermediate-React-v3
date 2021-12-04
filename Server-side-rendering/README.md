SERVER-SIDE-RENDERING
-not always better, 
- more servertime

-Because it is going to run in NODE that means we can not refer to window anywhere.
- For example BrowserRouter definitely refers to the Window so we can not use Browser Router in node

We create ClientApp.js on for stuff that runs in browser
    - Google Analytics for example


The Doom is the slowest part of the browser, and so anytime that I do a documentGetElementById it might slow old devices