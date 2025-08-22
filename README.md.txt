# Okidex Application (built in Firebase Studio)

This is a Next.js application built using Firebase Studio.

## Moving to GitHub

To move this project from Firebase Studio to your own GitHub repository, follow these steps:

1.  **Download the Code:**
    *   In the Firebase Studio interface, find the option to download your project files as a ZIP archive. This is typically located in the file explorer menu.
    *   Download the ZIP file and extract it to a folder on your local computer.

2.  **Create a New GitHub Repository:**
    *   Go to [GitHub](https://github.com) and create a new, empty repository.
    *   Do **not** initialize it with a README, .gitignore, or license file, as these already exist in your project.
    *   Copy the repository's URL (e.g., `https://github.com/your-username/your-repo-name.git`).

3.  **Initialize Git and Push Your Code:**
    *   Open a terminal or command prompt on your computer.
    *   Navigate into the project folder you unzipped in step 1.
    *   Run the following commands one by one, replacing `<YOUR_REPO_URL>` with the URL you copied:

    ```bash
    # Initialize a new Git repository
    git init -b main

    # Add all your files to be tracked
    git add .

    # Create your first commit
    git commit -m "Initial commit from Firebase Studio"

    # Add your GitHub repository as the remote origin
    git remote add origin <YOUR_REPO_URL>

    # Push your code to GitHub
    git push -u origin main
    ```

After completing these steps, your application code will be in your GitHub repository, ready for you to continue development from your local machine.