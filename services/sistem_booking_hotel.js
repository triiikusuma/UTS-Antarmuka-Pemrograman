const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT pesanan_id, kamar_id, pelanggan_id, tanggal_checkin, tanggal_checkout, jumlah_orang, total_harga 
    FROM pemesanan LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(pemesanan){
    const result = await db.query(
      `INSERT INTO pemesanan 
      (pesanan_id, kamar_id, pelanggan_id, tanggal_checkin, tanggal_checkout, jumlah_orang, total_harga) 
      VALUES 
      ('${pemesanan.pesanan_id}', '${pemesanan.kamar_id}', '${pemesanan.pelanggan_id}', '${pemesanan.tanggal_checkin}', '${pemesanan.tanggal_checkout}', '${pemesanan.jumlah_orang}', '${pemesanan.total_harga}')`
    );

    let message = 'Error in creating pemesanan';

    if (result.affectedRows) {
      message = 'Pemesanan created successfully';
    }

    return {message};
}

async function update(id, pemesanan){
  const result = await db.query(
      `UPDATE pemesanan 
      SET kamar_id='${pemesanan.kamar_id}', pelanggan_id='${pemesanan.pelanggan_id}', tanggal_checkin='${pemesanan.tanggal_checkin}', 
      tanggal_checkout='${pemesanan.tanggal_checkout}', jumlah_orang='${pemesanan.jumlah_orang}', total_harga='${pemesanan.total_harga}' 
      WHERE pesanan_id=${id}`
    );

    let message = 'Error in updating pemesanan';

    if (result.affectedRows) {
      message = 'Pemesanan updated successfully';
    }

    return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM pemesanan WHERE pesanan_id=${id}`
  );

  let message = 'Error in deleting pemesanan';

  if (result.affectedRows) {
    message = 'Pemesanan deleted successfully';
  }

  return {message};
}

async function search(id){
    const rows = await db.callSpSearchPemesananById(id); // Menggunakan prosedur tersimpan yang sesuai dengan database Anda
    const data = helper.emptyOrRows(rows);
    return { data };
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  search
}
