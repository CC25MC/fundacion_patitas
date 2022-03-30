const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')

class Vacuna extends Model {}
Vacuna.init(
  {
    nombre: { type: DataTypes.STRING, allowNull: true },
    lote: { type: DataTypes.REAL, allowNull: true },
    fecha: { type: DataTypes.DATE, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Vacuna'
  }
)

module.exports = Vacuna
