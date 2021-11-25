import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import 'regenerator-runtime/runtime';

import configureStore from './store/configureStore';
import App from '../src/app';
import { getMoviesAsync, getMovieByIdAsync } from './store/actions/moviesActions';
import { formParamsObj } from './utils/utils';

function renderHtml(html, preloadedState) {
    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        
            <title>React Movies Store</title>

            <link href="/css/main.css" rel="stylesheet" type="text/css"> 
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
          </script>
            <script src="/js/main.js"></script>
        </body>
        </html>
    `;
}

function serverRenderer() {
    const store = configureStore();

    return async (req, res) => {
        const renderRoot = () => (
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );

        switch(true) {
            case req.path === '/':
            case req.path === '/search':
                const params1 = Object.keys(req.query).length ?
                    formParamsObj(null, req.query.genre, {str: req.query.sortBy}) :
                    {};

                await store.dispatch(getMoviesAsync(params1));

                break;

            case req.path.includes('/search/'):
                const search = req.path.split('/')[2];
                const { genre, sortBy } = req.query;

                const params2 = formParamsObj(search, genre, {str: sortBy});

                await store.dispatch(getMoviesAsync(params2));

                break;

            case req.path.includes('/movie/'):
                const id = req.path.split('/')[2];

                await store.dispatch(getMovieByIdAsync(id));

                break;
        }

        const htmlString = renderToString(renderRoot());
        const preloadedState = store.getState();

        res.send(renderHtml(htmlString, preloadedState));
    };
}

export {
    serverRenderer
};
