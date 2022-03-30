const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
class Aspirante extends Model {}

Aspirante.init(
  {
    nombre: { type: DataTypes.STRING, allowNull: true },
    apellido: { type: DataTypes.STRING, allowNull: true },
    sexo: { type: DataTypes.STRING, allowNull: true },
    domicilio: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Aspirante'
  }
)


module.exports = Aspirante
