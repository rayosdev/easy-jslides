easy-jslide
===

Autor Jared Anders Isaksen


Instalation of plugin
---

To use the easy-jslide component, include the jQuery library and the easy-jslides source file into your HTML document:

make sure you link the "jquery.easy-jslide.js" file and the "easy-jslide-styles.css" stylesheet to you webpage

Link example:
---
```
<head>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/
    libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="js/jquery.easy-jslides.js"></script>
    
    <link rel="stylesheet" href="css/easy-jslide-styles.css">
</head>
```



HTML markup:
---

simply add a `<slide>` tag with `<img>` elements or `<div>` elements as child elements. each child element will be its own card in the slide

HTML example:
---
```
<slide>
    <img src="img/boat-sinking.jpg">
    <img src="img/unicorn.jpg">
</slide>
```
```
<slide>
    <img src="img/unicorn.jpg">
    
    <div class="inner-content-example">
        <h2>Inner Content Example</h2>
        <button>Enter</button>
    </div>
</slide>
```