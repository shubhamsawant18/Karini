const bcrypt = require("bcrypt");

// Enter the plain password you used while registering
const plainPassword = "sandeep";

// Copy-paste the hashed password from MongoDB
const hashedPassword = "$2b$10$qc7LZiI2I/z91YyzEZWpIuZ7ddHRCqCCoIdL15rPyuTrMqX2uDiEW";

bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
    if (err) console.error("❌ Error:", err);
    else console.log("✅ Password Match:", result);
});
