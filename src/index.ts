import * as functions from "firebase-functions";

const admin = require("firebase-admin");

admin.initializeApp({
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWmb7htZdpFSIe\nLOGWhgbruNSVjx60m/tKKchStJc2H/qDWzQDBRrqtnipCDUxNkNHbL2w0cWohlbU\nYZV5zGu8HMNb82CLuaNkRxNxxL0gIgA8wMJvccEfpHQNAumkM3BxtMupwzbwvZo/\nsLNazkrImjV73Ked7RII1a8tuz7ogZu3gmpDMkrvZVj5IxYpPRtgZw7x0hYsaq21\nLpm50AxEEHaiB7wvBCFuMnaubsQx80RPwB4Us7MKNzdwXebmzO2/k2XxuVVIwHYb\nqXYpStmRFhfTMrVCsNWYB63+YptNPPU6aaV5yGVhz4n90nJX4vJoheDWMG5zZiT2\n/bm3Gv+VAgMBAAECggEAAN8wnwCJIef5xneessEtFMqgGFUrUPzVHsoFKFU4jzcN\nbk9QchTlv9ZXT+bcF/jpby7BkHEi+ZrCHZZ4JGHiTwjKiHI+94MAHT77OP4JD43Q\nVIOJ1a3h61fLcNJZNK8uAfJpP8JqQG3z8Gf+T7GXGJDmYnXtr+GLJjhag0oCVWo8\nocUcCjJkN8VFVkWS+tOhBsG/DKsttJXniemVGivJKccpqvmxanmXt+8Jdi0M9E3a\n0/5YovP4iS0OJLm3Zdn7xhE2MXaE79EbdtJVjQM4l8hmOzCjd3yLL8TSZJ1lSRwB\n8esJUn1OYdgLjhSbyrIkimMkMIURbEXSGzoBJwm7yQKBgQDOlltFs94iAQ5wLomz\no6OzDvFUzHKKs9+zZyiX/bvKD46QVoTr0HYkyqNPV5EFSnTyNcE/n9W/4/rn/udT\ndPtXzmR7kmnXy5dIWHPw3riHPgQRFssZ/tWh+Uh5xr35SGSfUbnGVLYnCsUsBtDH\n3Ez8XYZZSL6Vtj2hQbU5r4VfuwKBgQC6nzzxz8gVhaaH5yc7AHs/lsFVLFdCqLjG\n87IGz7CmLyZLrMxAp8WXtn7QkzturZn+c/6CRMC8UFzMzYDNENw2QWQq0tKHeQzR\n+pwkED/gqZUU6iPd6H05lnL0CE8cra9uelMOjRiMmX7xsRypNl23N78coiwJOrvb\n7DJgNMng7wKBgGfulu6jRg7fby8bCqX4nqO30cvyq3GCevmb3X1R5scKOpP9IxQs\nJTPvSmfhSxFZWyp7xsRGmlfWz2UmBaUkBksvh7fvehZZ07tO3M2Cj11i4tLiH73t\nSfcaHc8+IFcoh47ro8XW2mkb7wRuTV0vRP/14WBLy64wKCNXll/2IOh/AoGADVi8\nFBMnHRrs2QVYEekr51VRyFSefP7yEBB3p/MMkCYJGBpolSsqf3omwaX19yllPQRw\nrEJcgltA98iusHvHM/4jOsjPE689knrY1d9vohKevdss637oDclLuVYqykNFq6IF\n9KF0owGLSZ/AC/3+X88V1OdoPNS9gLH4vFaqJXMCgYEArtqffwvowegTSsbs7WJ8\nZy3DujNgdzQ2eue7kD5KB3biDZa9ycLfvP2/uth/6M+lf4GLXUZ6F15H004eQrB2\nU/OBERsgtVKBoZ9Hc0u5mkHv4ABCm9PuWT/zuN3bEAnlDD+xaeLqQEpQZvCzUSW9\nDmdEbeBk1eG7zhm/kCPx1no=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-mstxk@smerafaces.iam.gserviceaccount.com",
  databaseURL: "https://smerafaces.firebaseio.com",
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
