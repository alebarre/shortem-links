# URL Shortener Web Application

A simple client-side URL shortener that creates shortened versions of valid URLs.

## Features

- Validates URLs to ensure they follow proper format
- Generates shortened URLs using a hash algorithm
- Displays both original and shortened URLs
- Copy shortened URL to clipboard functionality
- Responsive error handling with user-friendly messages

## How It Works

1. **URL Validation**: Checks if the input is a valid URL using regex pattern matching
2. **URL Shortening**: 
   - Creates a hash of the original URL
   - Converts the hash to a base36 encoded string
   - Generates a shortened URL in the format `https://[hash]`
3. **Display Results**: Shows both original and shortened URLs with clickable links
4. **Copy Functionality**: Allows users to copy the shortened URL to clipboard

## Code Structure

- **DOM Event Handling**: Waits for page load and form submission
- **Validation Function**: `isValidUrl()` checks URL format
- **Shortening Function**: `shortenUrl()` creates the shortened version
- **Clipboard Function**: `copyToClipboard()` handles copying to clipboard

## Limitations

⚠️ **Note**: This is a client-side only implementation:
- Shortened URLs are not persisted and will only work in the current session
- No actual URL redirection is set up
- The shortening algorithm creates hashes that may collide for different URLs

## Usage Example

```javascript
// Example usage from the code:
const originalUrl = "https://example.com/very/long/url";
const shortenedUrl = shortenUrl(originalUrl);
// Returns something like: "https://1a2b3c4d"
