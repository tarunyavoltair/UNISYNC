import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { post } from "../services/api";

function EventQRScanner() {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (error) {
        console.error("Failed to stop scanner:", error);
      }

      scannerRef.current = null;
    }

    setScanning(false);
  };

  const handleScan = async (decodedText) => {
    try {
      const data = JSON.parse(decodedText);

      if (data.type !== "event-check-in" || !data.eventId) {
        setMessage("Invalid event QR code.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        setMessage("Please login again.");
        return;
      }

      await stopScanner();

      const response = await post(
        `/events/${data.eventId}/check-in`,
        {
          studentId: user.id,
        }
      );

      setMessage(
        `${response.message} You earned ${response.xpAwarded} XP.`
      );
    } catch (error) {
      console.error("QR scan error:", error);

      if (error instanceof SyntaxError) {
        setMessage("Invalid QR code format.");
      } else {
        setMessage(
          error.message || "Failed to check in using QR code."
        );
      }
    }
  };

  const startScanner = async () => {
    try {
      setMessage("");

      const scanner = new Html5Qrcode("event-qr-reader");

      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        handleScan,
        () => {
          // Ignore frames where no QR code is detected.
        }
      );

      setScanning(true);
    } catch (error) {
      console.error("Failed to start QR scanner:", error);
      setMessage(
        "Unable to access the camera. Please allow camera permission."
      );
      scannerRef.current = null;
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current = null;
          });
      }
    };
  }, []);

  return (
    <section className="event-qr-scanner">
      <h2>📷 Scan Event QR</h2>

      <p>
        Scan an event QR code to check in and earn your event XP.
      </p>

      <button
        type="button"
        onClick={startScanner}
        disabled={scanning}
      >
        {scanning ? "Scanner Active" : "Start Scanner"}
      </button>

      {scanning && (
        <button
          type="button"
          onClick={stopScanner}
          style={{ marginLeft: "10px" }}
        >
          Stop Scanner
        </button>
      )}

      <div
        id="event-qr-reader"
        style={{
          width: "100%",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      ></div>

      {message && (
        <p style={{ marginTop: "15px" }}>
          {message}
        </p>
      )}
    </section>
  );
}

export default EventQRScanner;