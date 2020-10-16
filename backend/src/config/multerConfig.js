import multer from 'multer'
import crypto from 'crypto'
import { resolve, extname } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err)

        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    },
  }),
  // Como esses arquivos serão filtrados, quais formatos são aceitos/esperados?
  fileFilter: (req, file, cb) => {
    // Procurando o formato do arquivo em um array com formatos aceitos
    // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
      formatoAceito => formatoAceito == file.mimetype
    )

    // O formato do arquivo bateu com algum aceito?
    if (isAccepted) {
      // Executamos o callback com o segundo argumento true (validação aceita)
      return cb(null, true)
    }

    // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
    return cb(null, false)
  },
}
