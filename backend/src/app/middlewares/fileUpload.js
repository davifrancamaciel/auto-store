import multer from 'multer'
import fs from 'fs'
import multerConfig from '../../config/multerConfig'

const upload = multer(multerConfig)

export default async (req, res, next) => {
  const image = req.body.image || null

  try {
    if (image) {
      console.log('tem')



      var imageBuffer = new Buffer.from(image, 'base64')
      const data = new FormData()
      data.append('file', imageBuffer)
      console.log(imageBuffer)
      upload.single('file')
      // fs.writeFile('/tmp/uploads/myfile.png', imageBuffer, function (err) {
      //   if (err) {
      //     console.log(err,'erro')
      //     return next(err)
      //   }

      //   console.log('Successfully saved')
      // })
    } else {
      console.log('não tem')
    }

    return next()
  } catch (error) {
    console.log(error,'error')
    return next()
  }
}
