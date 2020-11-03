import {Router} from 'express'
import {created, ok, serverError} from '../utils/server.reponse'
import Link from '../models/Link.model'
import auth from '../middleware/auth.middleware'
import link from '../middleware/link.middleware'
import shortid from 'shortid'
import {BASE_URL} from '../utils/config';

/* Instance of router */
const router = new Router()

/* Generate new link */
router.post('/generate', link, async (req, res) => {
    try {
        const {from} = req.body
        const code = shortid.generate()
        const exists = await Link.findOne({from})
        if (exists) return ok(res, {link: exists})

        const to = BASE_URL + '/t/' + code
        const link = new Link({from, to, code, owner: req.user.userID})
        await link.save()
        created(res, {link})
        } catch (e) {
        serverError(res, e)
        }
    }
)

/* Get all links */
router.get('/', auth, async (req, res) => {
        try {
            const links = await Link.find({owner: req.user.userID})
            ok(res, links)
        } catch (e) {
            serverError(res, e)
        }
    }
)

/* Get link by id */
router.get('/:id', async (req, res) => {
        try {
            const link = await Link.findById(req.params.id)
            ok(res, link)
        } catch (e) {
            serverError(res, e)
        }
    }
)

/* Get link by id */
router.delete('/:id', async (req, res) => {
        try {
            await Link.remove({_id: req.params.id})
            ok(res, 'Link was successfully deleted')
        } catch (e) {
            serverError(res, e)
        }
    }
)

export default router
