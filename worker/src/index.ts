import { run } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(run(event.request))
})
