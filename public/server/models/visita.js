const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
const Trabajador = require('../models/trabajador')

class Visita extends Model {}
Visita.init(
  {
    descripcion: { type: DataTypes.STRING, allowNull: true },
    fecha: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Visita'
  }
)
Trabajador.hasOne(Visita)
Visita.belongsTo(Trabajador)
module.exports = Visita
