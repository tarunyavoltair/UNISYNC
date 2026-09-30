import React from "react";
import jsPDF from "jspdf";

function CertificateDownload({ certificate }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    const eventName =
      certificate.event?.eventName || "Campus Event";

    const issuedDate = certificate.issuedAt
      ? new Date(certificate.issuedAt).toLocaleDateString()
      : "";

    const student = JSON.parse(localStorage.getItem("user"));

    doc.setFontSize(26);
    doc.text("UNISYNC", 105, 35, { align: "center" });

    doc.setFontSize(20);
    doc.text("Certificate of Participation", 105, 55, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("This certificate is proudly presented to", 105, 80, {
      align: "center",
    });

    doc.setFontSize(22);
    doc.text(student?.name || "Student", 105, 100, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("for successfully participating in", 105, 120, {
      align: "center",
    });

    doc.setFontSize(18);
    doc.text(eventName, 105, 140, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Certificate ID: ${certificate.certificateId}`, 105, 165, {
      align: "center",
    });

    doc.text(`Issued on: ${issuedDate}`, 105, 180, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("UNISYNC Smart Campus Portal", 105, 210, {
      align: "center",
    });

    doc.save(`${certificate.certificateId}.pdf`);
  };

  return (
    <button type="button" onClick={handleDownload}>
      📥 Download Certificate
    </button>
  );
}

export default CertificateDownload;