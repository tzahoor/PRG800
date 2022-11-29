const { SaveBasicAnswer, SaveDataSecurityAnswer, SaveDDOSAnswer, getBasicQScore,getSecurityQScore, getDDOSScore, SecondLastgetBasicQScore, SecondLastgetSecurityQScore, SecondLastDDOS } = require('../Controller/AnswerController')
const { registerUser, loginUser } = require('../Controller/userController')
const {protect} = require('../Middleware/authMiddleware')

const router = require('express').Router()


router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/postBasicAnswer',protect,SaveBasicAnswer)
router.post('/postDataSecurityAnswer',protect,SaveDataSecurityAnswer)
router.post('/postDDOSAnswer',protect,SaveDDOSAnswer)
router.get('/getBasicQuestionScore',protect,getBasicQScore)
router.get('/getSecurityQuestionScore',protect,getSecurityQScore)
router.get('/getDDOSScore',protect,getDDOSScore)
router.get('/SecondLastBasic',protect,SecondLastgetBasicQScore)
router.get('/SecondLastSecurity',protect,SecondLastgetSecurityQScore)
router.get('/SecondLastDDOS',protect,SecondLastDDOS)

module.exports = router