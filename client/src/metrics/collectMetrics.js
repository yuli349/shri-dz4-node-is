import Counter from './send.js';
import getFCP from 'first-contentful-paint';
require('time-to-interactive');

let counter = new Counter();

counter.init(
  '0299cd28-bb32-45cd-a4eb-9470f93400d2',
  String(Math.random()).substr(2, 12),
  window.location.pathname
);

const performance = window.performance.timing;

function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.search(/Firefox/) > 0) return 'Firefox';
  if (userAgent.search(/Opera/) > 0) return 'Opera';
  if (userAgent.search(/Safari/) > 0) return 'Safari';
  if (userAgent.search(/MSIE/) > 0) return 'Internet Explorer';
  if (userAgent.search(/Chrome/) > 0) return 'Google Chrome';
}

counter.setAdditionalParams({
  env: 'production',
  platform:
    /iPhone|iPad|iPod|BlackBerry|Android|webOS|Opera Mini/i.test(
      navigator.userAgent
    ) ? 'touch' : 'desktop',
  browser: getBrowser(),
  page: window.location.pathname.split('/')[1] === 'build'
      ? '/build/:buildId' : window.location.pathname,
});

counter.send('TTFB', performance.responseEnd - performance.requestStart);

getFCP((fcpValue) => {counter.send('FCP', fcpValue)});

try {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      counter.send('FID', entry?.processingStart - entry.startTime);
    }
  });
  observer.observe({type: 'first-input', buffered: true});
} catch (e) {}

window.getReferentialTTI().then((data) => {
  counter.send('TTI', data);
});
