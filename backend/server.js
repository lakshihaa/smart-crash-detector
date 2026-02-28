require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/simulate-crash', async (req, res) => {
  const { ownerName, phoneNumber, carModel, vehicleNumber } = req.body;

  if (!ownerName || !phoneNumber || !carModel || !vehicleNumber) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const message = `Crash Alert: Airbag deployed in ${carModel} - ${vehicleNumber}. Please check immediately.`;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber  // ← directly to the user's number from the form
    });

    res.json({ success: true, message: `SMS alert sent to ${phoneNumber} for ${ownerName}'s vehicle.` });
  } catch (error) {
    console.error('Twilio error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send SMS. Check Twilio credentials.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
