import SQl from "mssql";

const DbSettings = {
  user: "sa",
  password: "Escuela2022Ss",
  server: "localhost",
  database: "Rent_Car",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await SQl.connect(DbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

export { SQl };
