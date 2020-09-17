import File from '../models/File'

class FileController {
  async index (req, res) {
    const files = await File.findAll()//({
      // order: ['name'],
      // attributes: ['id', 'name'],
    // })

    // const filesFormated = files.map(file => ({
    //   ...file,
    // }))

    return res.json(files)
  }
  async store (req, res) {
    const { originalname: name, filename: path } = req.file

    const file = await File.create({
      name,
      path,
    })
    return res.json(file)
  }
}
export default new FileController()
