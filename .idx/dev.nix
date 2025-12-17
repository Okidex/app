# To learn more about how to use Nix to configure your environment
# visit: developers.google.com
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # Updated for late 2025 stability

  # Use packages from the nixpkgs channel defined above
  packages = [
    pkgs.nodejs_22
    pkgs.firebase-tools
    pkgs.gh # GitHub CLI for managing your PRs/merges
  ];

  # Sets environment variables in the workspace
  env = {
    # Ensures Node 22 is used across the workspace
    NODE_VERSION = "22";
  };

  idx = {
    # Search for the extensions you want on open-vsx.org
    extensions = [
      "bradlc.vscode-tailwindcss"
      "esbenp.prettier-vscode"
      "christian-kohler.npm-intellisense"
      "dbaeumer.vscode-eslint"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        npm-install = "npm install";
      };
      # Runs when a workspace is (re)started
      onStart = {
        # Syncs dependencies in case you pulled a new commit like cba8597
        npm-install = "npm install";
      };
    };

    # Preview configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
