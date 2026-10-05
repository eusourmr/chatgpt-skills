# ChatGPT ZIP Upload / Export Path

The preferred CS Connect distribution paths are:

1. **public OpenAI Plugin Directory**, when the plugin is publicly published;
2. **GitHub-managed plugin marketplace** for compatible managed workspaces;
3. **ZIP upload/export** as a compatibility, qualification, or controlled-workspace path.

See [Getting Started](GETTING_STARTED.md) for the canonical user guide.

## Current qualified plugin

**CS Connect 0.9.0 R2** is the qualified production package.

Exact ZIP SHA-256:

```text
3379f932301b707fcf935f8f4f6f45bdea10d3e7277daced2849f93c3f824cce
```

Public-directory availability is separate: the package must still pass OpenAI review and be explicitly published before users can find it in public search.

## CLI export path

The CLI can prepare deterministic ChatGPT-oriented ZIP exports:

```bash
npx chatgpt-skills install --skill cs-navigator --tool chatgpt-web --yes
```

For another bundled skill:

```bash
npx chatgpt-skills install --skill regenerative-language-bridge --tool chatgpt-web --yes
```

CS records readable exported files and the package hash so `chatgpt-skills doctor` can detect local corruption.

## Manually uploaded workspace plugin

Where ChatGPT exposes plugin ZIP upload:

1. go to the workspace plugin administration surface;
2. upload the complete plugin ZIP;
3. test the exact uploaded version;
4. for a later manually uploaded version, use the product's **Upload new version** action when available.

A manually uploaded workspace plugin does not update merely because GitHub changed.

## Public Plugin Directory is different

For a public CS Connect plugin, bundled skill/metadata changes require a **new ZIP package version** in the existing public plugin, applicable checks/review, and publication of the approved update.

GitHub repository changes alone do not update the public directory package.

See [Plugin Maintenance](PLUGIN_MAINTENANCE.md).

## Qualification artifacts

Qualification identities such as `cs-navigator-v075-qa` are test-only identities. They exist to avoid stale package/cache reuse during native qualification.

Do not present a qualification artifact as the production CS Connect plugin.

## Integrity boundary

Deterministic ZIP/hash verification proves artifact integrity for the bytes that were built. It does **not** prove:

- public OpenAI approval;
- availability on every plan/region/workspace;
- successful installation;
- native ChatGPT behavior;
- universal safety.

Those claims require their own evidence.

Independent community project. Not affiliated with or endorsed by OpenAI.
