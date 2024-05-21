async function encryptData(req, res) {
  try {
    const { reference, amount, currency, expirationDate } = req.body;
    const secretIntegrity = process.env.TEST_INTEGRITY;

    const data = reference + amount + currency + expirationDate + secretIntegrity;
    const encondedText = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return res.status(200).json({ integrity: hashHex });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Hubo un error con la encriptación de la información.",
      error: error.message,
    });
  }
}

module.exports = {
  encryptData,
};
