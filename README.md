![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

# GitHub Action: Allow only staging/develop to merge into default/main/master branch

This Github Action fails when a PR from a non-staging branch into main is attempted.
This ensures that all branches excepted the staging branch are directly merged into the default/main branch.

This action takes 2 inputs:

- **stagingName:** The name of the branch you use for development/staging
- **mainName:** The name of your default/main/master branch

To use in your repo, create a file in `/.github/workflows/warnForPRIntoMain.yml` like so:

```yml
name: "Prevent merge from non-staging to main"
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  warn_main_merge:
    runs-on: "ubuntu-latest"
    name: "Validate PR Source and Target Branches"
    steps:
      - name: "Checking source and target branch in PR"
        uses: "technologiestiftung/warn-for-main-merge-action@<SET_LATEST_VERSION_HERE>"
        with:
          stagingName: "develop" # CONFIGURE TO YOUR NEEDS -> Default is "staging"
          mainName: "master" # CONFIGURE TO YOUR NEEDS -> Default is "main"
```

In this case, the action will run as a check for your PRs, thus invalidating PRs that have `master` as a target and something else than `develop` as source. Any other source/target combination will succeed.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/vogelino"><img src="https://avatars.githubusercontent.com/u/2759340?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lucas Vogel</b></sub></a><br /><a href="https://github.com/technologiestiftung/warn-for-main-merge-action/commits?author=vogelino" title="Code">💻</a> <a href="https://github.com/technologiestiftung/warn-for-main-merge-action/commits?author=vogelino" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

<table>
  <tr>
    <td>
      <a src="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a src="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by: <a src="https://www.berlin.de/rbmskzl/en/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senatskanzelei-en.svg" />
      </a>
    </td>
  </tr>
</table>
