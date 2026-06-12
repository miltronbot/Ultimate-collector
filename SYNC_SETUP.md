# One-Time Sync Setup (2 minutes)

Everything is automated except one thing only the account owner can do: create an access
token. After this single setup, every change pushed to this branch auto-publishes to
[`savannah-homeschool-dashboard`](https://github.com/miltronbot/savannah-homeschool-dashboard)
as a clean standalone snapshot — no terminal, no commands, ever.

## Steps

1. **Create the token** → <https://github.com/settings/personal-access-tokens/new>
   - Token name: `savannah-sync`
   - Repository access: **Only select repositories** → `savannah-homeschool-dashboard`
   - Permissions: **Contents → Read and write**
   - Click **Generate token** and copy it

2. **Add it as a secret in this repo (Ultimate-collector)**
   → <https://github.com/miltronbot/Ultimate-collector/settings/secrets/actions/new>
   - Name: `SYNC_TOKEN`
   - Secret: paste the token
   - Click **Add secret**

3. **Run the sync** → <https://github.com/miltronbot/Ultimate-collector/actions>
   - Open **"Sync school app to standalone repo"** → **Run workflow**
   - (Or just wait — it also runs automatically on the next code push.)

That's it. The workflow builds the app to verify it, then force-pushes a clean
single-commit snapshot (no Ultimate-collector history) to the standalone repo's `main`.
