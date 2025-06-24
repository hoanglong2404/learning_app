require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Serve static files from frontend build (for production)
if (NODE_ENV === 'production') {
  // Serve static files from dist directory
  app.use(express.static(path.join(__dirname, '../dist')));
  
  console.log('🏗️ Serving static files from dist directory');
} else {
  console.log('🔧 Development mode - Frontend served separately by Vite');
}

// API Routes
// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "English Friends Backend Server is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: "1.0.0"
  });
});

// Get signed URL for private agents
app.get("/api/get-signed-url", async (req, res) => {
  try {
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!agentId || !apiKey) {
      return res.status(400).json({ 
        error: "Missing ELEVENLABS_AGENT_ID or ELEVENLABS_API_KEY in environment variables",
        hint: "Please check your .env file configuration"
      });
    }
    
    console.log(`🔐 Generating signed URL for agent: ${agentId}`);
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ ElevenLabs API Error:", response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Signed URL generated successfully");
    
    res.json({ signedUrl: data.signed_url });
  } catch (error) {
    console.error("❌ Error generating signed URL:", error.message);
    res.status(500).json({ 
      error: "Failed to generate signed URL",
      details: error.message,
      hint: "Please check your ElevenLabs API key and Agent ID"
    });
  }
});

// Get app configuration
app.get("/api/config", (req, res) => {
  res.json({
    environment: NODE_ENV,
    hasApiKey: !!process.env.ELEVENLABS_API_KEY,
    hasAgentId: !!process.env.ELEVENLABS_AGENT_ID,
    timestamp: new Date().toISOString()
  });
});

// Serve frontend for all non-API routes (SPA support)
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ 
        error: "API endpoint not found",
        path: req.path 
      });
    }
    
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  // Development mode - redirect to Vite dev server
  app.get('/', (req, res) => {
    res.json({
      message: "Backend API is running in development mode",
      frontend: "Please access http://localhost:5173 for the frontend",
      api: `http://localhost:${PORT}/api/health`
    });
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);
  res.status(500).json({ 
    error: "Internal server error",
    message: error.message,
    environment: NODE_ENV
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: "API endpoint not found",
    path: req.path,
    availableEndpoints: [
      '/api/health',
      '/api/get-signed-url',
      '/api/config'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 English Friends Server Started!`);
  console.log(`📍 Environment: ${NODE_ENV}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  
  if (NODE_ENV === 'production') {
    console.log(`🎯 App URL: http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  } else {
    console.log(`🎯 Frontend: http://localhost:5173`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  }
  
  console.log(`🔐 API Endpoint: http://localhost:${PORT}/api/get-signed-url`);
  
  // Environment checks
  if (!process.env.ELEVENLABS_API_KEY) {
    console.warn("⚠️  Warning: ELEVENLABS_API_KEY not found in environment");
  }
  if (!process.env.ELEVENLABS_AGENT_ID) {
    console.warn("⚠️  Warning: ELEVENLABS_AGENT_ID not found in environment");
  }
  
  console.log(`\n✨ English Friends is ready to help kids learn English! ✨\n`);
}); 