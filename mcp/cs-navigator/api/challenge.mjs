export default async function handler(req, res) {
  const token = process.env.OPENAI_APPS_CHALLENGE;
  if (!token) {
    res.statusCode = 404;
    res.end('challenge not configured');
    return;
  }
  res.statusCode = 200;
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end(token);
}
