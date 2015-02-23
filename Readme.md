Regions extras [![Build Status](https://travis-ci.org/ftdebugger/regions-extras.svg)](https://travis-ci.org/ftdebugger/regions-extras)
==============

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
var ReplaceRegion = require("regions-extras/region/ReplaceRegion"),
    region = new ReplaceRegion({
        el: "#region"
    });
    
region.show(new SomeList({
    tagName: 'ul'
));
```

the result wil be:

```html
<body>
    <ul>
        <!-- some code that generate view -->
    </ul>
</body>
```

It is register in region manager as `replace`.

Async replace region
--------------------

This region work like replace region, but it delay view render. Region expect implemented `then` method in view, which 
return promise (`jQuery.Deferred` for example). View will be rendered when promise fulfilled.

```js
var AsyncReplaceRegion = require("regions-extras/region/AsyncReplaceRegion");
var AsyncView = Backbone.View.extend({
    then: function() {
        return this.model.fetch();
    }
});

var region = new AsyncReplaceRegion({
    el: "#region"
});
    
region.show(new SomeList({
    model: new User({id: 12})
));
```

It is register in region manager as `async_replace`.

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

It is use `replace` region by default for now.

Additionally, region helper allow you override some useful options:

### tagName

```handlebars
{{region tagName="ul"}} -> <ul id="region123"></ul>
```


### tagName

```handlebars
{{region tagName="ul"}} -> <ul id="region123"></ul>
```

### regionClass

You can specify class of region to create

```handlebars
{{region "test" regionClass=YOUR_REGION_CLASS}}
```

### regionType

It is like `regionClass` option, but use region manager to create region

in js

```js
var manager = require('regions-extras/region/manager');
manager.addRegion('my_region', SomeRegionClass);
```

and in template

```handlebars
{{region "test" regionType="my_region"}}
```

If you require builtin regions (`ReplaceRegion` or `AsyncReplaceRegion`) we register it for you

```handlebars
{{region "test" regionType="replace"}} ## By default
{{region "test" regionType="async_replace"}}
```

### async

This option is sugar for `regionType` option. It is append `async_` prefix to `regionType`

```handlebars
{{region "test" async=true}}

is equal to

{{region "test" regionType="async_replace"}}
```

Changelog
=========

v1.0.5
------

 * Add region manager
 * Ass async, regionType options
 * Add AsyncReplaceRegion
 
v1.0.4
------

 * Ass regionClass option

v1.0.3
------

 * #4 Can't use region for second time
 * Karma + jasmine specs
 
v1.0.2
------

 * Pass `view` option through helper
 
v1.0.1
------

 * `tag` and `tagName` option to setup tagName

v1.0.0
------

 * Marionette 2.0
