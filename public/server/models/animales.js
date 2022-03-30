const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
const Vacuna = require('../models/vacuna')
const Trabajador = require('../models/trabajador')
class Animales extends Model {}

Animales.init(
  {
    nombre: { type: DataTypes.STRING, allowNull: true },
    especie: { type: DataTypes.STRING, allowNull: true },
    sexo: { type: DataTypes.STRING, allowNull: true },
    peso: { type: DataTypes.REAL, allowNull: true },
    lugar_rescate: { type: DataTypes.STRING, allowNull: true },
    rescatador: { type: DataTypes.STRING, allowNull: true },
    estado_salud: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Animales'
  }
)
Vacuna.hasOne(Animales)
Trabajador.hasOne(Animales)
Animales.belongsTo(Vacuna)
Animales.belongsTo(Trabajador)

module.exports = Animales
