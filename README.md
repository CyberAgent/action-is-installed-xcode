# CyberAgent/action-is-installed-xcode

|      OS      |                                                                                                               Status                                                                                                               |
| :----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| macos-latest | [![Test - macOS-latest](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-latest.yaml/badge.svg)](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-latest.yaml) |
|   macos-14   |       [![Test - macOS-14](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-14.yaml/badge.svg)](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-14.yaml)       |
|   macos-15   |       [![Test - macOS-15](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-15.yaml/badge.svg)](https://github.com/CyberAgent/action-is-installed-xcode/actions/workflows/ci-macos-15.yaml)       |

CyberAgent/action-is-installed-xcode checks to see if the same Xcode version as GitHub-hosted is installed.

## Usage

```yaml
- uses: CyberAgent/action-is-installed-xcode@v0
  with:
    success-on-miss: false  # Optional
```

Please see [actions.yml](https://github.com/CyberAgent/action-is-installed-xcode/blob/main/action.yml) about input parameters.

## Motivation

The GitHub-hosted runner installs Xcode under the conditions specified in [actions/runner-images](https://github.com/actions/runner-images/blob/59a0b3727b675f4d29713127bca7726492d7a085/README.md#L121).

This action checks whether the self-hosted runner is in the same state as the GitHub-hosted runner when providing the macOS runner.

## Development

### Build

```bash
deno fmt
deno task bundle
```

## Acknowledgement

This repository generated from [Kesin11/deno-action-template](https://github.com/Kesin11/deno-action-template). Thank you for great work!
