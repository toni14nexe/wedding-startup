export default defineEventHandler(() => {
  return {
    ok: true,
    message: 'pong',
    timestamp: Date.now(),
  }
})
