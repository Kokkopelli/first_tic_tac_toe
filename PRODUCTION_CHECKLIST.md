# Production Deployment Checklist

## Pre-Deployment Verification
- [ ] Node.js 18+ installed on target server
- [ ] npm/yarn available
- [ ] Required ports available (default: 5000)
- [ ] Sufficient disk space (1GB minimum)
- [ ] Network connectivity verified

## Deployment Steps
- [ ] Upload source code to server
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run build` to create production build
- [ ] Set environment variables (NODE_ENV=production, PORT=5000)
- [ ] Run `npm start` to start production server
- [ ] Verify application responds at http://[server-ip]:5000

## Security Configuration
- [ ] Configure firewall to allow traffic on application port
- [ ] Consider setting up reverse proxy for HTTPS
- [ ] Set up process manager (PM2 recommended)
- [ ] Configure log rotation if needed

## Testing
- [ ] Access application URL
- [ ] Test game functionality (human vs human mode)
- [ ] Test AI opponent functionality
- [ ] Verify game reset works correctly
- [ ] Test on different browsers/devices

## Monitoring
- [ ] Set up process monitoring (PM2 or systemd)
- [ ] Configure log collection
- [ ] Set up basic health checks
- [ ] Document access URLs and credentials

## Rollback Plan
- [ ] Keep previous version available
- [ ] Document rollback procedure
- [ ] Test rollback process in staging environment

## Post-Deployment
- [ ] Verify all functionality works as expected
- [ ] Document any configuration changes
- [ ] Share access information with stakeholders
- [ ] Set up monitoring alerts if needed