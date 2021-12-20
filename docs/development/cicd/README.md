# CI/CD

<small>[MathType Web Integrations](../../../README.md) → [Documentation](../../README.md) → [Development guide](../README.md) → CI/CD</small>

This project uses [Cypress](https://www.cypress.io/) and [GitHub actions](https://github.com/features/actions) for Continuous Integration testing.

## Table of contents

- [Strategy](#strategy)
- [Project secrets](#project-secrets)

## Strategy

The current strategy is to run the tests weekly, with published changes, and send the data to [Cypress Dashboard][Cypress Dashboard].

The tests can also run with a manual trigger by the user with the following parameters:
* Send data to the dashboard?
    * 'Yes'
    * 'No'

## Project secrets

| Name | Description | How to regenerate it |
|---|---|---|
| CYPRESS_PROJECT_ID | Identifier of the Cypress Dashboard payed account. It will help to send data to the Dashboard with the record key | Retrieve it from the Cypress Dashboard Wiris account on the mt-html-integrations settings project |
| CYPRESS_RECORD_KEY | Cypress Dashboard record key, alongside with the ID, it allows us to record test data on the Dashboard | Retrieve it from the Cypress Dashboard Wiris account on the mt-html-integrations settings project |

[Cypress Dashboard]: (https://cypress.io/dashboard/?utm_adgroup=128583767463&utm_keyword=dashboard%20cypress&utm_source=google&utm_medium=cpc&utm_campaign=15310628554&utm_term=dashboard%20cypress&hsa_acc=8898574980&hsa_cam=15310628554&hsa_grp=128583767463&hsa_ad=562833928061&hsa_src=g&hsa_tgt=kwd-1416168166782&hsa_kw=dashboard%20cypress&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQiA8ICOBhDmARIsAEGI6o2ahqiXKRiml_LkTytDKvtOT-0mM2T3phdDJB_7K3ufe6tNkINIFoIaApWTEALw_wcB)
