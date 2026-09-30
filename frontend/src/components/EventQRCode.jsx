import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function EventQRCode({ eventId }) {
  if (!eventId) {
    return null;
  }

  const checkInData = JSON.stringify({
    type: "event-check-in",
    eventId: eventId,
  });

  return (
    <div className="event-qr-code">
      <h4>📱 Event Check-in QR</h4>

      <QRCodeCanvas
        value={checkInData}
        size={180}
        level="H"
        includeMargin={true}
      />

      <p>Students can scan this QR code to check in.</p>
    </div>
  );
}

export default EventQRCode;