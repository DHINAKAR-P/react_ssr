import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import App from '../src/components/App';
import { fetchDataForRender } from './fetchDataForRender';
import { indexHtml } from './indexHtml';
import stats from '../build/react-loadable.json';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { ServerDataProvider } from '../src/state/serverDataContext';

const ServerApp = ({ context, data, location }) => {
  return (
    <ServerDataProvider value={data}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </ServerDataProvider>
  );
};

export const renderServerSideApp = (req, res) => {
  

  Loadable.preloadAll()
    .then(() => fetchDataForRender(ServerApp, req))
    .then(data => renderApp(ServerApp, data, req, res));
};

function renderApp(ServerApp, data, req, res) {
  const sheets = new ServerStyleSheets();
  const context = {};
  const modules = [];

  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <ServerApp location={req.url} data={data} context={context} />
      </Loadable.Capture>
    ),
  );

   // Grab the CSS from our sheets.
  const css = sheets.toString();

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = indexHtml({
      helmet: Helmet.renderStatic(),
      serverData: data,
      bundles: getBundles(stats, modules),
      markup, 
      css
    });

    res.status(200).send(fullMarkup);
  }
}
