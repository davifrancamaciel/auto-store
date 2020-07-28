import fs from 'fs'
import { resolve, extname } from 'path'

export default function removeFile (fileName) {
  const path = resolve(__dirname, '..', '..', '..', 'temp', 'uploads', fileName)
  fs.unlink(path, err => {
    if (err) {
      console.error(err)
      return
    }

    //file removed
  })
}
