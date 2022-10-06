export const renewSession = () => fetch('/auth?/renew', { method: 'POST', body: new FormData() })
