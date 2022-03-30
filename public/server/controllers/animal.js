const Animales = require('../models/animales')

const list = async (req, res) => {
  const response = await Animales.findAll({
    include: ['Vacuna', 'Trabajador']
  })
    .then(function (data) {
      const res = { success: true, data: data }
      return res
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res
    })
  res.json(response)
}

const create = async (req, res) => {
  try {
    const response = await Animales.create({
      nombre: req.body.nombre,
      especie: req.body.especie,
      sexo: req.body.sexo,
      peso: req.body.peso,
      lugar_rescate: req.body.lugar_rescate,
      rescatador: req.body.rescatador,
      estado_salud: req.body.estado_salud,
      VacunaId: req.body.VacunaId,
      TrabajadorId: req.body.TrabajadorId
    })
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: 'creado exitosamente'
        }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Animales.update(
      {
        nombre: req.body.nombre,
        especie: req.body.especie,
        sexo: req.body.sexo,
        peso: req.body.peso,
        lugar_rescate: req.body.lugar_rescate,
        rescatador: req.body.rescatador,
        estado_salud: req.body.estado_salud,
        VacunaId: req.body.VacunaId,
        TrabajadorId: req.body.TrabajadorId
      },
      {
        where: { id: id }
      }
    )
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: 'actualizado exitosamente'
        }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const getOne = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Animales.findAll({
      where: { id: id }
    })
      .then(function (data) {
        const res = { success: true, data: data }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Animales.destroy({
      where: { id: id }
    })
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: 'borrado exitosamente'
        }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  list,
  create,
  update,
  getOne,
  deleteOne
}
