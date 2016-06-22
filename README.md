#Apache HTTP 2.0 Log Parser

This repo is a test for reading Apache log files to determine the best files to server-push based on the original request file.

#Setting up

Add these lines to your Apache setup:

```apache
LogFormat "[%{Referer}i] %t %m %U%q %H" http2
CustomLog /http2_log http2
```

If you are using the [Polymer Shop setup](https://github.com/pixelcodeUK/apache-http-2) modify the `000-default.conf` file and add the above code inside the `<VirtualHost *:443>` (make sure to delete the server push headers).

#Running the parser

```sh
node logparser.js
```

If you load the index.html page of the [Polymer Shop setup](https://github.com/pixelcodeUK/apache-http-2) this is the output:

```js
{ '/':
   Set {
     '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
     '/src/shop-app.html',
     '/bower_components/app-layout/app-header/app-header.html',
     '/bower_components/app-layout/app-scroll-effects/effects/waterfall.html',
     '/bower_components/app-layout/app-toolbar/app-toolbar.html',
     '/bower_components/app-layout/helpers/helpers.html',
     '/bower_components/app-route/app-location.html',
     '/bower_components/app-route/app-route.html',
     '/bower_components/iron-flex-layout/iron-flex-layout.html',
     '/bower_components/iron-media-query/iron-media-query.html',
     '/bower_components/iron-pages/iron-pages.html',
     '/bower_components/iron-selector/iron-selector.html',
     '/src/shop-category-data.html',
     '/src/shop-home.html',
     '/bower_components/polymer/polymer.html',
     '/bower_components/iron-resizable-behavior/iron-resizable-behavior.html',
     '/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html',
     '/bower_components/iron-location/iron-location.html',
     '/bower_components/iron-location/iron-query-params.html',
     '/bower_components/app-route/app-route-converter-behavior.html',
     '/bower_components/iron-selector/iron-selectable.html',
     '/bower_components/iron-selector/iron-multi-selectable.html',
     '/src/shop-button.html',
     '/src/shop-image.html',
     '/bower_components/polymer/polymer-mini.html',
     '/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html',
     '/bower_components/iron-selector/iron-selection.html',
     '/bower_components/polymer/polymer-micro.html',
     '/images/mens_outerwear.jpg',
     '/images/ladies_outerwear.jpg',
     '/images/mens_tshirts.jpg',
     '/images/ladies_tshirts.jpg',
     '/src/lazy-resources.html',
     '/bower_components/app-layout/app-drawer/app-drawer.html',
     '/bower_components/paper-icon-button/paper-icon-button.html',
     '/src/shop-analytics.html',
     '/src/shop-cart-data.html',
     '/src/shop-cart-modal.html',
     '/src/shop-icons.html',
     '/src/shop-snackbar.html',
     '/src/shop-tabs.html',
     '/src/shop-tab.html',
     '/src/shop-network-warning.html',
     '/src/shop-cart-item.html',
     '/bower_components/iron-form/iron-form.html',
     '/bower_components/iron-icon/iron-icon.html',
     '/bower_components/paper-spinner/paper-spinner-lite.html',
     '/bower_components/paper-behaviors/paper-inky-focus-behavior.html',
     '/bower_components/paper-styles/default-theme.html',
     '/bower_components/iron-localstorage/iron-localstorage.html',
     '/bower_components/iron-overlay-behavior/iron-overlay-behavior.html',
     '/bower_components/iron-iconset-svg/iron-iconset-svg.html',
     '/src/shop-tabs-overlay.html',
     '/src/shop-ripple-container.html',
     '/src/shop-select.html',
     '/bower_components/iron-ajax/iron-ajax.html',
     '/bower_components/iron-meta/iron-meta.html',
     '/bower_components/paper-styles/color.html',
     '/bower_components/paper-spinner/paper-spinner-behavior.html',
     '/bower_components/paper-spinner/paper-spinner-styles.html',
     '/bower_components/iron-behaviors/iron-button-state.html',
     '/bower_components/paper-behaviors/paper-ripple-behavior.html',
     '/bower_components/iron-fit-behavior/iron-fit-behavior.html',
     '/bower_components/iron-overlay-behavior/iron-overlay-manager.html',
     '/bower_components/iron-ajax/iron-request.html',
     '/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html',
     '/bower_components/iron-behaviors/iron-control-state.html',
     '/bower_components/paper-ripple/paper-ripple.html',
     '/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html',
     '/bower_components/promise-polyfill/promise-polyfill-lite.html',
     '/bower_components/promise-polyfill/Promise.js',
     [size]: 71,
     fresh: true } }
```

The `fresh` property tells you if the file `/bower_components/polymer/polymer.html` was requested by the browser (the assumption is this means the page is being loaded the first time).

#Todo

* Make the output time dependent
* Make the timed output comparable (to find common themes)
