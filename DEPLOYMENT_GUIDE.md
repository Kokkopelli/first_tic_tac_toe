# Tic-Tac-Toe Deployment Guide

## Project Overview
This is a complete full-stack tic-tac-toe game with AI opponent capabilities, built with React frontend and Express backend.

## System Requirements
- Node.js 18+ 
- npm or yarn
- 512MB RAM minimum
- 1GB disk space

## Quick Deployment (Production Ready)

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Application
```bash
npm run build
```

### 3. Start Production Server
```bash
NODE_ENV=production PORT=5000 npm start
```

### 4. Verify Deployment
Application will be available at: `http://[server-ip]:5000`

## Environment Configuration

### Required Environment Variables
```bash
NODE_ENV=production
PORT=5000
```

### Optional Environment Variables
```bash
# If adding database functionality later
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## Security Considerations

### Firewall Configuration
- Open port 5000 (or configured PORT) for HTTP traffic
- Consider using reverse proxy (nginx/apache) for HTTPS

### Process Management
Use PM2 for production process management:
```bash
npm install -g pm2
pm2 start dist/index.js --name "tic-tac-toe"
pm2 startup
pm2 save
```

## File Structure
```
├── dist/                 # Built production files
├── client/               # React frontend source
├── server/               # Express backend source
├── shared/               # Shared TypeScript types
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Build configuration
└── tailwind.config.ts    # Styling configuration
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT environment variable
2. **Build fails**: Ensure Node.js 18+ is installed
3. **App not accessible**: Check firewall settings for configured port

### Log Files
- Application logs: Use `pm2 logs` if using PM2
- System logs: Check `/var/log/` on Linux systems

## Performance Optimization
- Application serves both frontend and backend on single port
- Built files are optimized and minified
- Static assets are cached appropriately

## Support
The application is self-contained with no external dependencies beyond Node.js runtime.