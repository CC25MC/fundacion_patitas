import { request } from "./base";
import {  Vacuna, Trabajador, Animal, Visita, Aspirante, Solicitud } from "./services";

request.vacuna = Vacuna;
request.trabajador = Trabajador;
request.animal = Animal;
request.visita = Visita;
request.aspirante = Aspirante;
request.solicitud = Solicitud;
export default request;