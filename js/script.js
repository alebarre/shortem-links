// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get form element
  const urlForm = document.getElementById("link-form");

  // Add submit event listener
  urlForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const originalUrl = document.getElementById("link-input").value;
    const resultDiv = document.getElementById("shorted-link");
    const errMsg = document.getElementById("err-msg");

    // Reset result display
    resultDiv.style.display = "none";
    resultDiv.className = "";

    try {
      // Validate URL
      if (!isValidUrl(originalUrl)) {
        throw new Error("Please enter a valid URL (e.g., https://example.com)");
      }

      // Create a shortened URL
      const shortenedUrl = shortenUrl(originalUrl);

      // Display the result
      resultDiv.innerHTML = `
              <p>Original URL: <a href="${originalUrl}" target="_blank">${originalUrl}</a></p>
              <p>Shortened URL: <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a></p>
          `;
      resultDiv.classList.add("success");
      resultDiv.style.display = "block";
    } catch (error) {
      resultDiv.textContent = error.message;
      resultDiv.classList.add("error");
      resultDiv.style.display = "block";
    }
  });
});

// Validate a URL
function isValidUrl(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}

// URL shortening function (client-side only)
function shortenUrl(originalUrl) {
  // Create a simple hash of the URL
  let hash = 0;
  for (let i = 0; i < originalUrl.length; i++) {
    const char = originalUrl.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use absolute value and base36 encoding for shorter representation
  const shortCode = Math.abs(hash).toString(36).substr(0, 8);

  // Create a shortened URL using the current domain
  return `https://${shortCode}`;
}

// Copy to clipboard function (made global for HTML onclick)
window.copyToClipboard = function (text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Short URL copied to clipboard!");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};
