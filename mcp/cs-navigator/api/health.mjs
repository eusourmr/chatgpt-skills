export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify({
    service: 'cs-navigator-live-registry',
    version: '0.16.0',
    status: 'ok',
    mode: 'read-only',
    registry: 'github-main-policy-filtered'
  }));
}
