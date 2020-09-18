import Sequelize, { Model } from 'sequelize'

class File extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        size: Sequelize.NUMBER,
        vehicle_id: Sequelize.NUMBER,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `${process.env.APP_URL}/files/${this.path}`
          },
        },
      },
      { sequelize }
    )

    return this
  }
  static associate (models) {
    this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' })
  }
}

export default File
