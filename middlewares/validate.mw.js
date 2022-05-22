const Yup = require('yup')
const { db } = require(__dirname + '/../db/db.js')

const validationSchema = Yup.object({
  firstName: Yup.string().min(3),
  lastName: Yup.string().min(3),
  displayName: Yup.string().min(3),
  email: Yup.string().required(),
  password: Yup.string()
    .min(3)
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required(),
  chackPromo: Yup.boolean()
})

async function emailDbUnique (email) {
  return !!JSON.parse(await db()).find(el => el.email === email)
}

module.exports.validateBody = async (req, res, next) => {
  try {
    const { body } = req

    if (await emailDbUnique(body.email)) {
      req.error = {
        error: {
          email: 'email used'
        }
      }
    } else {
      req.body = await validationSchema.validate(body)
    }
  } catch (error) {
    req.error = error
  }
  next()
}

module.exports.validateLogin = async (req, res, next) => {
  try {
    const { query } = req

    req.body = await validationSchema.validate(query)
  } catch (error) {
    req.error = error
  }
  next()
}
