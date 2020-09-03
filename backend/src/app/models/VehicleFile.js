import Sequelize, { Model } from 'sequelize'

class VehicleFile extends Model {
    static init (sequelize) {
        super.init(
            {
                position: Sequelize.INTEGER,
            },
            { sequelize }
        )

        return this
    }
    static associate(models) {
      this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
    }
    static associate (models) {
      this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' })
  }
}

export default VehicleFile
