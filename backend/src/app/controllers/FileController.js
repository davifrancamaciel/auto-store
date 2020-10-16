import File from '../models/File'
import removeFile from '../utils/removeFile'
// import filehelper from '../utils/file-helper'

class FileController {
  async index (req, res) {
    const { id } = req.params

    const files = await File.findAll({
      where: { vehicle_id: id },
      order: [['createdAt', 'desc']],
    })

    return res.json(files)
  }
  async store (req, res) {
    const { originalname: name, filename: path, size } = req.file

    try {
      const file = await File.create({
        name,
        path: newPath,
        size,
        vehicle_id: Number(req.body.vehicle_id),
      })
      return res.json(file)

      // filehelper.compressImage(req.file, 100)

      // .then(newPath => {
      // // Vamos continuar normalmente, exibindo o novo caminho
      // const file = await File.create({
      //   name,
      //   path: newPath,
      //   size,
      //   vehicle_id: Number(req.body.vehicle_id),
      // })
      // return res.json(file)
      //  })
      // .catch(err => console.log(err) );
    } catch (err) {
      return res.json({ error: 'Houve erro no upload!', err })
    }
  }

  async delete (req, res) {
    const { userProvider } = req

    if (!userProvider) {
      return res
        .status(401)
        .json({ error: 'Usuário não tem permissão para deletar imagens' })
    }

    const { id } = req.params

    const file = await File.findByPk(id)
    if (file) {
      removeFile(file.path)
    }

    const files = await File.destroy({
      where: { id },
    })

    return res.json(files)
  }
}
export default new FileController()
