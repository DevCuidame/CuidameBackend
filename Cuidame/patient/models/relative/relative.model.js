class RelativeModel {
    constructor(
      id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
      departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
      image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
    ) {
      this.id = id;
      this.code = code;
      this.nombre = nombre;
      this.apellido = apellido;
      this.tipoid = tipoid;
      this.numeroid = numeroid;
      this.telefono = telefono;
      this.fecha_nacimiento = fecha_nacimiento;
      this.genero = genero;
      this.ciudad = ciudad;
      this.departamento = departamento;
      this.direccion = direccion;
      this.rh = rh;
      this.eps = eps;
      this.prepagada = prepagada;
      this.arl = arl;
      this.seguro_funerario = seguro_funerario;
      this.a_cargo_id = a_cargo_id;
      this.image = image;
      this.enterprise = enterprise;
      this.nit = nit;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.photourl = photourl;
      this.pub_name = pub_name;
      this.file_bs64 = file_bs64;
    }
  }
  
  module.exports = RelativeModel;
  