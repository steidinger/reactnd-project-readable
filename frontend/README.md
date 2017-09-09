This folder contains the frontend code for the Udacity project *Readable*. It was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app). For general installation instructions please refer to the parent folder's [readme](../readme.md).

## Folder Structure

```
frontend/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
    views/
    state/
    App.css
    App.js
    App.test.js
    index.css
    index.js
```


* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.
* `src/views` contains the top level components which are equivalent to pages in a traditional web app.
* `src/componets` contains the lower level components.
* `src/state` contains the state management code.


## Starting the App

In the project directory, you can run:

### `npm start`

This will run the frontend app. The app assumes you have the api server running on localhost:5001. Please consult the parent folder's [readme](../readme.md) on how to use either the provided or your own api server.

