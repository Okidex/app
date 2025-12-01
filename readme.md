# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deployment Troubleshooting

If your GitHub Actions deployment fails with a `PERMISSION_DENIED` error related to `cloudfunctions.functions.list`, `cloudfunctions.functions.create`, or `serviceusage.services.enable`, you need to grant the correct IAM permissions to your Firebase service account.

1.  **Navigate to the IAM page** in your Google Cloud Console for the project `studio-8509111427-a45a7`:
    [https://console.cloud.google.com/iam-admin/iam?project=studio-8509111427-a45a7](https://console.cloud.google.com/iam-admin/iam?project=studio-8509111427-a45a7)

2.  **Find the service account** principal named:
    `firebase-adminsdk-fbsvc@studio-8509111427-a45a7.iam.gserviceaccount.com`

3.  Click the **pencil icon** (Edit principal) for that service account.

4.  Click **"Add another role"**.

5.  In the "Select a role" filter, type and select **"Cloud Functions Admin"**.

6.  Click **"Add another role"** again.

7.  In the "Select a role" filter, type and select **"Service Usage Admin"**.

8.  Click **"Save"**.

After saving, trigger the deployment again by pushing a new commit. This can be an empty commit if you have no other code changes:
`git commit --allow-empty -m "trigger: Re-run deployment"`
`git push origin main`

