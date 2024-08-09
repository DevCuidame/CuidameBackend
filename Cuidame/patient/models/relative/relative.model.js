class RelativeModel {
  constructor(
    id, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, created_at, updated_at, photourl, imagebs64
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoid = tipoid;
    this.numeroid = numeroid;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.ciudad = ciudad;
    this.genero = genero;
    this.departamento = departamento;
    this.direccion = direccion;
    this.rh = rh;
    this.eps = eps;
    this.prepagada = prepagada;
    this.arl = arl;
    this.seguro_funerario = seguro_funerario;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.photourl = photourl;
    this.imagebs64 = imagebs64;
  }
}

module.exports = RelativeModel;
