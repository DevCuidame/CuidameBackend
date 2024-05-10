
async function encryptData(req, res) {
  try {
    const reference = req.body.reference;
    const amount = req.body.amount;
    const currency = req.body.currency;
    const expirationDate = req.body.expirationDate;
    const secretIntegrity = process.env.TEST_INTEGRITY;

    var data = reference + amount + currency + expirationDate + secretIntegrity;
    console.log("🚀 ~ encryptData ~ data:", data)

    const encondedText = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return res.status(200).json(hashHex);
  } catch (error) {
    console.log("🚀 ~ encryptData ~ error:", error)
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la encriptación de la data.",
      error: error,
    });
  }
}

module.exports = {
  encryptData,
};
