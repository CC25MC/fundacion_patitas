const { Router } = require('express');

const {
    list,
    create,
    update,
    getOne,
    deleteOne,
} = require('../controllers/aspirante');

const router = Router();

router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.post(    '/'     , create);
router.put(     '/:id'  , update);
router.delete(  '/:id'  , deleteOne);


module.exports = router;