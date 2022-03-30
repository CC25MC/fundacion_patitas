const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
const Animales = require('../models/animales')
const Trabajador = require('../models/trabajador')
const Visita = require('../models/visita')
const Aspirante = require('../models/aspirante')
class Solicitud extends Model {}

Solicitud.init(
  {
    tiempo: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Solicitud'
  }
)
Animales.hasOne(Solicitud)
Trabajador.hasOne(Solicitud)
Visita.hasOne(Solicitud)
Aspirante.hasOne(Solicitud)
Solicitud.belongsTo(Animales)
Solicitud.belongsTo(Trabajador)
Solicitud.belongsTo(Visita)
Solicitud.belongsTo(Aspirante)

module.exports = Solicitud
