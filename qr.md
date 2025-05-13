---
layout: default
title: QR Code for this Site
---

### QR Kode til denne siden.

<div id="qrcode" style="margin: 20px;"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script>
// Get the current URL of the site
const siteUrl = window.location.href;

// Generate QR code
new QRCode(document.getElementById("qrcode"), {
    text: siteUrl,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});
</script>