const pool = require("../db/db");
 
const getTransactions = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM transactions"
  );

  res.json(result.rows);
};

const createTransaction = async (req, res) => {

  const { title, amount, type } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  const result = await pool.query(
    `INSERT INTO transactions (title, amount, type)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, amount, type]
  );

  res.status(201).json({
    message: "Transaction added",
    transaction: result.rows[0]
  });
};

const updateTransaction = async (req, res) => {

  const id = Number(req.params.id);

  const { title, amount, type } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  const result = await pool.query(
    `UPDATE transactions
     SET title = $1,
         amount = $2,
         type = $3
     WHERE id = $4
     RETURNING *`,
    [title, amount, type, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "Transaction not found"
    });
  }

  res.json({
    message: "Transaction updated",
    transaction: result.rows[0]
  });
};

const deleteTransaction = async (req, res) => {
  const id = Number(req.params.id);

const result = await pool.query(
  `DELETE FROM transactions
WHERE id = $1
RETURNING *`,
[id]
)

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Transaction not found"
  });
}

  res.json({
    message: "Transaction deleted"
  });
}


module.exports ={
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};