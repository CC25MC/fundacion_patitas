const Trabajador = require('../models/trabajador')

const list = async (req, res) => {
  const response = await Trabajador.findAll()
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
    const response = await Trabajador.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      sexo: req.body.sexo,
      ocupacion: req.body.ocupacion
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

    const response = await Trabajador.update(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        sexo: req.body.sexo,
        ocupacion: req.body.ocupacion
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

    const response = await Trabajador.findAll({
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

    const response = await Trabajador.destroy({
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
