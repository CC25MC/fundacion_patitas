const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')
const Vacuna = require('../models/vacuna')
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
Vacuna.hasOne(Solicitud)
Trabajador.hasOne(Solicitud)
Visita.hasOne(Solicitud)
Aspirante.hasOne(Solicitud)
Solicitud.belongsTo(Vacuna)
Solicitud.belongsTo(Trabajador)
Solicitud.belongsTo(Visita)
Solicitud.belongsTo(Aspirante)

module.exports = Solicitud
