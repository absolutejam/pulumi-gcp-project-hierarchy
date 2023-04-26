# JamCorp Project Hierarchy Management

This is used as to provision a test hierarchy for demos and should not be
used in production.


## ⚠️ State & secrets storage

This uses the `password` secrets provider and stores state locally within
the repo, within `./state`.

**This is purely for testing purposes and is not recommended for production!**
 
 
## Setup

```bash
export PULUMI_CONFIG_PASSPHRASE=<passphrase>
pulumi login ${PWD}/state
```


## Creating a new stack

```bash
pulumi stack init <name> --secrets-provider=passphrase

pulumi config set-all \
    --plaintext 'gcp:project'='jam-iam' \
    --plaintext 'gcp:region'='europe-west2' \
    --plaintext 'gcp:zone'='europe-west2-a' \
    --secret    'gcp:credentials'="$(cat path-to-service-account-key.json)"
```
