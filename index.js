const express = require("express");
const app = express();
const port = 3000;
const sistem_booking_hotelRouter = require("./routes/sistem_booking_hotel"); // Ubah rute sesuai dengan nama file rute Anda


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Rute untuk menampilkan pesan "ok"
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// Gunakan rute untuk layanan sistem_booking_hotel
app.use("/sistem-booking-hotel", sistem_booking_hotelRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Mulai aplikasi pada port yang ditentukan
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
