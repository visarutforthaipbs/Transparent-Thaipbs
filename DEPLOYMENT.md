# Deploying to Render

This guide will help you deploy the Thai PBS Budget Transparency application to Render.

## Prerequisites

1. A [Render account](https://render.com/)
2. A GitHub repository containing your project
3. Your MongoDB Atlas connection string

## Method 1: Manual Deployment

1. **Push your code to GitHub**

   Make sure your project is pushed to a GitHub repository.

2. **Create a new Web Service on Render**

   - Log in to your [Render Dashboard](https://dashboard.render.com/)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository

3. **Configure the Web Service**

   - **Name**: Choose a name for your service (e.g., thaipbs-budget-transparency)
   - **Environment**: Select "Node"
   - **Region**: Choose the region closest to your users
   - **Branch**: Select the branch you want to deploy (usually main or master)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose the appropriate plan (Free plan is available)

4. **Add Environment Variables**

   - Scroll down to the "Environment" section
   - Add the following environment variable:
     - Key: `MONGODB_URI`
     - Value: `mongodb+srv://visarutsankham:35mydVrXrfLSXeKP@thaipbs-budget-ideas-66.u4ryaqn.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-budget-ideas-66`

5. **Deploy**

   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Once the deployment is complete, you can access your application at the URL provided by Render

## Method 2: Using Render Blueprint

If you have included the render.yaml file in your project, you can use Render Blueprints for easier deployment:

1. **Push your code to GitHub**

   Make sure your project with the render.yaml file is pushed to a GitHub repository.

2. **Deploy using Blueprint**

   - Log in to your [Render Dashboard](https://dashboard.render.com/)
   - Click "New" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the render.yaml file and create the services defined in it

3. **Add Secret Environment Variables**

   - After the services are created, navigate to the Web Service
   - Go to the "Environment" tab
   - Add the following secret environment variable:
     - Key: `MONGODB_URI`
     - Value: `mongodb+srv://visarutsankham:35mydVrXrfLSXeKP@thaipbs-budget-ideas-66.u4ryaqn.mongodb.net/?retryWrites=true&w=majority&appName=thaipbs-budget-ideas-66`

## Continuous Deployment

Render will automatically redeploy your application when you push changes to the selected branch of your GitHub repository.

## Monitoring and Logs

- You can monitor your application's performance in the Render Dashboard
- Access logs from the "Logs" tab in your Web Service
- Set up alerts and notifications in the "Alerts" tab

## Troubleshooting

If you encounter any issues with your deployment:

1. Check the build logs for errors
2. Verify that your environment variables are set correctly
3. Make sure your MongoDB Atlas IP whitelist allows connections from anywhere (or add Render's IP ranges)
4. Check that your package.json includes all necessary dependencies

## Security Notes

- Your MongoDB connection string contains sensitive information
- Consider using a dedicated database user with limited permissions
- Set up IP whitelisting in MongoDB Atlas for additional security
