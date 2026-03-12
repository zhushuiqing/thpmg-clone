# Deployment Guide

This document provides comprehensive instructions for deploying the thpmg-clone application.

## Table of Contents
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Vercel Deployment

The application is configured for deployment on Vercel, which is the recommended deployment platform for Next.js applications.

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps
1. **Create a new project on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add the required environment variables from `.env.example`:
     - `NEXT_PUBLIC_API_URL`: Your API base URL
     - `NEXT_PUBLIC_SITE_URL`: Your site URL (e.g., https://your-site.vercel.app)

3. **Deploy**
   - Vercel will automatically deploy on push to the main branch
   - Preview deployments are created for pull requests

### Configuration Files
- `vercel.json`: Contains Vercel-specific configuration
- `.github/workflows/deploy.yml`: GitHub Actions workflow for CI/CD

## Docker Deployment

For self-hosted deployments, you can use Docker.

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps
1. **Build and run with Docker Compose**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Edit .env.local with your actual values
   nano .env.local

   # Build and start the application
   docker-compose up --build -d
   ```

2. **Access the application**
   - The application will be available at `http://localhost:3000`

### Docker Configuration
- `Dockerfile`: Multi-stage build configuration optimized for production
- `docker-compose.yml`: Service definition for local development and deployment

## Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for API endpoints | `https://api.example.com` |
| `NEXT_PUBLIC_SITE_URL` | Public URL of your site | `https://thpmg-clone.vercel.app` |

**Note**: All `NEXT_PUBLIC_*` variables are exposed to the browser and should not contain sensitive information.

### Local Development
For local development, create a `.env.local` file:
```bash
cp .env.example .env.local
# Edit .env.local with your development values
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
- **Issue**: Build fails during deployment
- **Solution**:
  - Check that all required environment variables are set
  - Verify that the Node.js version matches (Node 20+ required)
  - Ensure all dependencies are properly installed

#### 2. Environment Variables Not Loading
- **Issue**: Environment variables are not available in the application
- **Solution**:
  - Ensure variables are prefixed with `NEXT_PUBLIC_` if they need to be available in the browser
  - For Vercel: Verify variables are set in the Vercel project settings
  - For Docker: Ensure variables are properly set in `.env.local` or passed to the container

#### 3. Docker Build Issues
- **Issue**: Docker build fails or takes too long
- **Solution**:
  - Ensure you have sufficient disk space
  - Check Docker daemon is running
  - Try building with `--no-cache` flag: `docker-compose build --no-cache`

#### 4. GitHub Actions Failures
- **Issue**: CI/CD pipeline fails
- **Solution**:
  - Check that Vercel secrets are properly configured in GitHub repository settings:
    - `VERCEL_TOKEN`
    - `VERCEL_PROJECT_ID`
    - `VERCEL_ORG_ID`
  - Verify that the workflow file syntax is correct

### Debugging Tips
- Check Vercel logs for deployment errors
- Use `docker logs <container-name>` to view Docker container logs
- Run `npm run build` locally to test the build process before deployment

## Additional Resources
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)