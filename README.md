# CSS to JavaScript `style`

[![](logo.png)](https://css2js.netlify.com)

## About

I created [this tool](https://css2js.netlify.com) for projects, where I'd constantly write CSS and then convert it into object literals for `glamor`, inline styles or other css-in-js libraries.

[![Example GIF](https://media.giphy.com/media/3o7bugiUO5P1YZ7TlS/giphy.gif)](https://css2js.netlify.com)

It takes following things into account:

* Unitless values (`opacity`, `line-height`, `font-weight`, …)
* Vendor prefixed values
* Escaping different quotes in a single value (e.g. in `font-family`)
* Not-enclosed CSS declarations (*i.e. without selector*) for fast copy & paste
 
## [**Online version**](https://css2js.netlify.com)

Simply copy & paste the styles you want to convert.
 
**Example input**

```
width: 600px;
min-height: 100vh;
font-weight: 800;
color: #bada55;
opacity: .5;
-webkit-font-smoothing: antialiased;
font-family: "Roboto", 'Open Sans';
```

*(For convenience this works without selectors)*

**Example output**

```javascript
{
  width: 600,
  minHeight: '100vh',
  fontWeight: 800,
  color: '#bada55',
  opacity: .5,
  WebkitFontSmoothing: 'antialiased',
  fontFamily: '"Roboto", \'Open Sans\''
}
```

^ *This is with disabled `px` output (helpful for React projects)*

→ [**Check it out by yourself**](https://css2js.netlify.com)
