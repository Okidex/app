# To learn more about how to use Nix to configure your environment
# visit: developers.google.com
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11";

  # Use packages from the nixpkgs channel defined above
  packages = [
    pkgs.nodejs_24 # Updated to Node 24 for 2025 stability
    pkgs.firebase-tools
    pkgs.gh
  ];

  # Sets environment variables in the workspace and terminal
  env = {
    NODE_VERSION = "24";
    NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyCN6uhJT_aUSTj5psl9Ru5viR50M7oyNY8";
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "studio-8509111427-a45a7.firebaseapp.com";
    NEXT_PUBLIC_FIREBASE_PROJECT_ID = "studio-8509111427-a45a7";
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "studio-8509111427-a45a7.firebasestorage.app";
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "866288675038";
    NEXT_PUBLIC_FIREBASE_APP_ID = "1:866288675038:web:faff2fb1b41f0e10f47a4f";
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "G-X0QN9FM1BN";
    GEMINI_API_KEY = "AIzaSyAjCDoDVGkooArsyAw_LLifuxrbx1fL-Cs";
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
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {
        # 2025 Smart Script: Automatically sync Nix env to .env.local for Next.js preview
        sync-env = ''
          echo "NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY" > .env.local
          echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" >> .env.local
          echo "GEMINI_API_KEY=$GEMINI_API_KEY" >> .env.local
        '';
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
