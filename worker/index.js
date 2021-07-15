import { Router } from 'itty-router'
import { json } from 'itty-router-extras'
import { v4 as uuidv4, validate } from 'uuid'

const router = Router()

const allowed = /^[0-9a-f _,]*$/g

router.get('/', () => {
  return json('Hello World!', { status: 200 })
})

router.get('/:uuid', async request => {
  if (validate(request.params.uuid)) {
    const result = await SYNC.get(request.params.uuid)
    return json({ dumpertPlusPlusViewedItems: result }, { status: 200 })
  } else {
    return json('Bad request', { status: 400 })
  }
})

router.put('/:uuid', async request => {
  const body = await request.json()
  const safe = await allowed.test(body.dumpertPlusPlusViewedItems)

  if (validate(request.params.uuid) && safe) {
    await SYNC.put(request.params.uuid, body.dumpertPlusPlusViewedItems)
    return json('Created', { status: 201 })
  } else {
    return json('Bad request', { status: 400 })
  }
})

router.post('/', async request => {
  const body = await request.json()
  const uuid = await uuidv4()
  const safe = await allowed.test(body.dumpertPlusPlusViewedItems)

  if (safe) {
    await SYNC.put(uuid, body.dumpertPlusPlusViewedItems)
    return json({ uuid: uuid }, { status: 201 })
  } else {
    return json('Bad request', { status: 400 })
  }
})

router.all('*', () => {
  return json('Not found', { status: 404 })
})

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
