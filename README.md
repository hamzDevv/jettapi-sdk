# JettApi SDK 🪐
Simple and dynamic API wrapper for Jett API.

## Features

- Dynamic endpoint access (no need manual route writing)
- Automatic file upload support (Buffer, Stream, FormData)
- API key authentication
- Built-in axios client
- Clean and minimal usage

---

## Installation
```bash
npm install jettapi-sdk
```

## Usage
Import:

```javascript
import JettApi from "jettapi-sdk"
```

Initialize:

```javascript
const client = new JettApi("YOUR_API_KEY");
```

## Basic Request
```javascript
const result = await client.ai.lax({ q: "hi" })

console.log(result)
```

## Category & Endpoint System
Format:

```javascript
client.{category}.{endpoint}(params)
```

Example:

```javascript
client.ai.lax({ q: "hi" })
client.downloader.tiktok({ url: "https://tiktok.com/..." })
```

This will request:

```javascript
/api/ai/lax?q="hi"
/api/downloader/tiktok?url="https://tiktok.com/..."
```

## File Upload Example
SDK automatically detects file input:

```javascript
import fs from "fs";

const res = await client.ai.dream({
  image: fs.createReadStream("./image.jpg"),
  promt: "test"
});
```

## Error Handling
All errors return:

```javascript
{
  status: false,
  error: "error message"
}
```

## Configuration
```javascript
const client = new JettApi("API_KEY", {
  baseUrl: "https://jettapi.vercel.app"
});
```

## How It Works
- Uses dynamic Proxy to generate API routes
- Converts method calls into HTTP requests
- Supports GET & POST automatically
- Handles file upload transparently


---
MIT License — Develop by Hamz 🌟
