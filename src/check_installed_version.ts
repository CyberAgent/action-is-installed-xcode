import { debug, warning } from "npm:@actions/core@1.10.1";
import { getInstalledXcodeVersions } from "./os.ts";
import { XcodeVersionsInGitHubHosted } from "./xcode.ts";

export async function CheckInstalledVersions(
  githubInstalled: XcodeVersionsInGitHubHosted,
): Promise<void> {
  // 2. Check installed Xcode is required version
  const diff: string[] = await getDiffInstalledVersion(
    githubInstalled,
  );
  if (diff.length > 0) {
    warning("Installed Xcode is not required version");
    const installed: string[] | undefined = await getInstalledXcodeVersions();
    if (installed === undefined) {
      throw new Error("Cannot get installed Xcode versions");
    }
    warning(`Installed Xcode: ${installed.join(", ")}`);
    warning(
      `Required Xcode: ${
        githubInstalled.versions.map((v) => v.link).join(
          ", ",
        )
      }`,
    );
    warning(`Diff: ${diff.join(", ")}`);
    throw new Error(
      `Installed Xcode is not the required version. Installed: ${
        installed.join(", ")
      }, Required: ${
        githubInstalled.versions.map((v) => v.link).join(
          ", ",
        )
      }`,
    );
  }
}

async function getDiffInstalledVersion(
  githubHostedInstalledVersion: XcodeVersionsInGitHubHosted,
): Promise<string[]> {
  if (
    !githubHostedInstalledVersion.versions ||
    !Array.isArray(githubHostedInstalledVersion.versions)
  ) {
    throw new Error(
      "No versions found in GitHub hosted installed versions",
    );
  }
  const requiredVersion: string[] = githubHostedInstalledVersion.versions.map(
    (v) => v.link,
  );
  requiredVersion.sort();
  const normalizedRequiredVersion: string[] = normalizeVersion(
    requiredVersion,
  );

  debug(`Required version: ${normalizedRequiredVersion.join(", ")}`);

  const installed: string[] | undefined = await getInstalledXcodeVersions();
  if (installed === undefined) {
    throw new Error("Cannot get installed Xcode versions");
  }
  installed.sort();

  debug(`Installed version: ${installed.join(", ")}`);

  // Compare installed and required version
  const diff: string[] = normalizedRequiredVersion.filter((v) =>
    !installed.includes(v)
  );

  debug(
    `normalizedRequiredVersion.filter((v) => !installed.includes(v)): ${
      diff.join(", ")
    }`,
  );

  return diff;
}

function normalizeVersion(input: string[]): string[] {
  const trimed: string[] = input.map((v) => v.trim());

  // if not contained period, return add ".0"
  const normalized: string[] = trimed.map((v) => {
    if (v.indexOf(".") === -1) {
      return `${v}.0`;
    }
    return v;
  });

  return normalized;
}
