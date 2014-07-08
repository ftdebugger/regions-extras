Regions extra
=============

Extra regions for marionette.

Replace region
--------------

Allow you specify region as placeholder to replace with real view dom element.

For example we have this template:

```html
<body>
    <div id="region"></div>
</body>

```

and this script:

```js

var ReplaceRegion = require("regions-extra/replace-region"),
    region = new ReplaceRegion({
        el: "#region"
    });
    
    region.show(new SomeList());
```

the result wil be:

```html
<body>
    <ul>
        <!-- some code that generate view -->
    </ul>
</body>
```


Region helper
-------------

Handlebars helper, which mark place for region and inject it to `Marionette.Layout` that use it.

For example:

```handlebars
<div class="some">

    {{region "test"}}

</div>

```

and `Layout`:

```js
require("region-extras");

var Layout = Marionette.Layout.extend({
     template: require("./tpl/template.hbs"),

     onRender: function () {
         this.test.show(new SomeView()); // region 'test' will be appeared here automatic
     }
 });
```

it is use `replace-region` by default for now
