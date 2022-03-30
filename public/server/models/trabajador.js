const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
class Trabajador extends Model {}

Trabajador.init(
  {
    nombre: { type: DataTypes.STRING, allowNull: true },
    apellido: { type: DataTypes.STRING, allowNull: true },
    sexo: { type: DataTypes.STRING, allowNull: true },
    ocupacion: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Trabajador'
  }
)

module.exports = Trabajador
