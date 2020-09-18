import File from '../models/File'
import removeFile from '../utils/removeFile'

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

    const file = await File.create({
      name,
      path,
      size,
      vehicle_id: Number(req.body.vehicle_id),
    })

    return res.json(file)
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
