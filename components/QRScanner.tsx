// QRScanner.tsx
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Heading, Text, Button, useClipboard } from "@chakra-ui/react";

function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false); // New state for showing/hiding warning
  const { hasCopied, onCopy } = useClipboard(scanResult || "");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      true
    );

    let isScanning = true;

    scanner.render(success, error);

    function success(result: string) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false;
        setShowWarning(true); // Show warning when result is available
      }
    }

    function error(err: any) {
      console.warn(err);
    }

    // Cleanup function
    return () => {
      // Stop scanning
      const videoElement = document.getElementById(
        "reader"
      ) as HTMLVideoElement;
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoElement.srcObject = null;
      }
    };
  }, []);

  return (
    <Box textAlign="center" p={4}>
      <Heading mb={4}>Scan QR Now!</Heading>
      {scanResult ? (
        <Box>
          <Text>
            UID: <a href={scanResult}>{scanResult}</a>
          </Text>
          {showWarning && (
            <Text color="red" fontWeight="bold" mt={2}>
              Warning: <br></br>Make sure you are sending it to the right
              person. <br></br>Review their UID first before copying.
            </Text>
          )}
          <Button mt={2} onClick={onCopy}>
            {hasCopied ? "Copied!" : "Copy UID"}
          </Button>
        </Box>
      ) : (
        <Box>
          <Box id="reader"></Box>
        </Box>
      )}
    </Box>
  );
}

export default QRScanner;
