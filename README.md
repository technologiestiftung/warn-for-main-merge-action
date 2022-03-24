![](https://img.shields.io/badge/Build%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiesitftung%20Berlin-blue)

# GitHub Action: Allow only staging/develop to merge into default/main/master branch
This Github Action fails when a PR from a non-staging branch into main is attempted.
This ensures that all branches excepted the staging branch are directly merged into the default/main branch.

This action takes 2 inputs:
- **stagingName:** The name of the branch you use for development/staging
- **mainName:** The name of your default/main/master branch

To use in your repo, create a file in `/.github/workflows/warnForPRIntoMain.yml` like so:

```yml
name: 'Prevent merge from non-staging to main'
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  warn_main_merge:
    runs-on: 'ubuntu-latest'
    name: 'Validate PR Source and Target Branches'
    steps:
      - name: 'Checking source and target branch in PR'
        uses: 'technologiestiftung/warn-for-main-merge-action@<SET_LATEST_VERSION_HERE>'
        with:
          stagingName: 'develop' # CONFIGURE TO YOUR NEEDS -> Default is "staging"
          mainName: 'master' # CONFIGURE TO YOUR NEEDS -> Default is "main"

```

In this case, the action will run as a check for your PRs, thus invalidating PRs that have `master` as a target and something else than `develop` as source. Any other source/target combination will succeed.
