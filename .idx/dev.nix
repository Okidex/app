# To learn more about how to use Nix to configure your environment
# visit: developers.google.com
{ pkgs, ... }: {
  # Updated for 2026 stability
  channel = "stable-25.11";

  packages = [
    pkgs.nodejs_24      # Updated to Node 24 (2026 LTS)
    pkgs.firebase-tools
    pkgs.gh
  ];

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
    FIREBASE_PROJECT_ID = "studio-8509111427-a45a7";
    FIREBASE_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@studio-8509111427-a45a7.iam.gserviceaccount.com";
    FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDnrv/2Nep3Cg3k\nLmk4dbML2282FBAFSdyqK1tsAtmJ6bZ775Ly1q+jI/1LoNPW2lzpLxm/cRWjkyGT\nuyCKPmJkWIxivg41qx7nFU/83k7oCqqz5VTppURlC0g9i59DNBBOHOO5J/UUnzLn\nnkQlVJ0nNCSNfEPUZdGseSE1jmN8aVB3F1Ib3xIhSSDqb19HNCHKIIBJjHKSBjIE\nAT6XWo1tT00cYatdJ8J/XkZDQOcYU4L5XQtcevDWHfGrEoOvJClwsU/BB7mhLF+Q\nXHwTF9fpTxWdkDqcqHI2n/CRJOj13zLwzbUuQ5rjZiXRkJzLZCpDDIb5zbYm9PtT\nmSARNi0xAgMBAAECggEACJol+yz4LTZuirtpqRjPJpx9lAYhjGW4O4n/s2pla/ZF\nUhOUit9LXwj8/I3ukaCS0K5g1AuphlTWG0FoWVOsxO2n/DpS5h2Z+JHhMfoJ11oe\niY6FNSXfjMojAvR8O8M7DABs+Nzlv8/TpLeKz5FFQr1wEkAD93bWlrMaZ133ngjL\np+M+L2uNtNBab6T2jILkYTK6aUJzlJ3VV9oTPCaoKO9qfhkIZFl+6A6+Uu3X4fTY\nrYN5hAXhDYNjInZNY11taX3Rx5qJqC23hKlWcnGeSMqy0LtUzCa8kIL6Jqvp2/Rg\nLEnt4YR86GQVKx5kCLNMKWEZEOyfxVz18Gue/wSewQKBgQD1/ear+npf5R/CIEwh\nfkuXwqjslKl5ssSRpCBUuT5hxpoS/dS5ddK4+Mjem03NHviYAxw/+VTz4wYnZHpm\nC1osLTwWmCvjvgI4jn3grVV0/bBWgOP8yPDNy5Wzwpo9X5PeVK+VHQAZmjOTmRIF\nA4ShOKfliJDx70hUae2RkogA8QKBgQDxHBLE7PSqGHARp2JWmLJ5fTbt5xJEHtEP\nU/qnVxoomorB7sjBfqnkYCyQ6WPeoDb0vAt3BMNWAvPYuy7CwbuqTby40N9wDRbr\nGTbYEmwjopNn5YyJ1yjGjRv8tRMveic0enDdiV0u6K9R6Wz5d+vA9ypl6AWLozQv\naSyHWIzwQQKBgCafkQJbt68q2IuwaoOvwsq3Q7KxvNJg4UBE1ta2pzbO6g4lUKs1\n9roYReG93L9iJ4Imqt7YlSAd+y9gNV+kVKovCAo8JlgB03Nx3A3U6WAPHQrX/fQI\n0NZfKsgou/L6+Mql3VO6U/OxJHv+QrgKz15I+QOvJ6L1ARRP9X8v1K7hAoGAdKvy\nBSropdqXeGN3+ZGAY7uMtghn1WDYJ0Oq+gjzFozZ8kg7Cy7gxSsoxaK6egMrNLg+\nEATVBSz+lHTXhtS6nAlr9j7UsGMVIQSdfmdDvuavz8nLfPQJvjKQRXPV6daBXCqX\nrQwIdGeSVt/OpNU71q+D67Yf4NdDrGGHc6MM6EECgYAz8M7SQ5q3S/5ikXnR4jkC\nIdeG2I026vWGMF65NkQfd2xbHUCJAcMtiMr4oaMuL11rwRrAm1ad9LWngbZOk+xo\nYyl9++iyKrl5exzKo56cYAU/DvMgNmCiq+VdqtvfRygjbL2qgDSPSDKW6BiiFAIL\nyHK7r9Sx4T1gg7AGvZ1txg==\n-----END PRIVATE KEY-----\n";
  };

  idx = {
    extensions = [
      "bradlc.vscode-tailwindcss"
      "esbenp.prettier-vscode"
      "christian-kohler.npm-intellisense"
      "dbaeumer.vscode-eslint"
    ];

    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {
        # Fixed: Escaped \$ to ensure variables are read from the environment at runtime
        sync-env = ''
          echo "NEXT_PUBLIC_FIREBASE_API_KEY=\$NEXT_PUBLIC_FIREBASE_API_KEY" > .env.local
          echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=\$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=\$NEXT_PUBLIC_FIREBASE_PROJECT_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=\$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=\$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_APP_ID=\$NEXT_PUBLIC_FIREBASE_APP_ID" >> .env.local
          echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=\$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID" >> .env.local
          echo "GEMINI_API_KEY=\$GEMINI_API_KEY" >> .env.local
          echo "FIREBASE_PROJECT_ID=\$FIREBASE_PROJECT_ID" >> .env.local
          echo "FIREBASE_CLIENT_EMAIL=\$FIREBASE_CLIENT_EMAIL" >> .env.local
          echo "FIREBASE_PRIVATE_KEY=\"\$FIREBASE_PRIVATE_KEY\"" >> .env.local
        '';
      };
    };

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
