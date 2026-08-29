---
paths:
  - 'resources/js/components/AuthLayout/**'
---

# Auth Layout

## Go to my email opens mapped webmail
Do not use mailto for “Go to my email”. Pass the submitted address via open(modal, { email }) on the auth modal context. CheckEmailModal and ThankYouModal link to a new-tab webmail inbox for known domains (Gmail, Outlook, Yahoo, iCloud, Proton) via inboxUrlForEmail. Unknown domains keep the button but do not navigate.
