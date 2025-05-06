📦 Node.js File Management API

A Node.js + TypeScript backend for file and folder management with Cloudinary file uploads, MongoDB for storage, JWT authentication, and global rate limiting.

🚀 Getting Started

📚 Prerequisites
Node.js v18+
npm or yarn
MongoDB instance (local or cloud)
Cloudinary account for file storage
📦 Installation
git clone repourl
cd your-repo
npm install
⚙️ Environment Variables
Create a .env file in your project root and add the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=5000
🛠️ Running the App
Development Mode (with watch + rebuild)

npm run dev
Production Build & Run

npm run build
npm start
📖 Features

📁 Upload files to Cloudinary (max 8MB)
📂 Manage folders and file hierarchies
🔒 JWT authentication
🛡️ Global rate limiting
🌐 MongoDB integration
📦 TypeScript-based clean structure
📑 Available Scripts

npm run dev — build & run with file watching
npm run build — compile TypeScript to JavaScript
npm start — run the compiled production server
📃 License

MIT

✨ Author

Tobechukss