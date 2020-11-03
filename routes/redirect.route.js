import {Router} from 'express'
import Link from '../models/Link.model'
import {notFound, serverError} from "../utils/server.reponse";

/* Instance of router */
const router = new Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})

        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        notFound(res, 'Link not found')
    } catch (e) {
        serverError(res, e)
    }
})

export default router
