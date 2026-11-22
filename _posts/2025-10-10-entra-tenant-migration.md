---
layout: post
title: "Migrating Two Tenants Into One"
date: 2025-10-10
description: "Oops, created two tenants and split responsability, now to fix this and migrate the second tenant into the first and then delete the second tenant."
tags: [Azure, Microsoft, Entra, Migration]
categories: [it]
--- 

Oops — we ended up with two Microsoft Entra tenants and responsibilities split between them. This post walks through fixing that: migrating the second tenant into the first, then deleting the second tenant.

---

## Powershell setup

Microsoft has deprecated AzureAD_Connect to interact with Azure. It has been replaced with Microsoft Graph.

The following are steps to get powershell setup with the requirements to use Microsoft Graph to login and ready for the migration. 

```powershell
# Allow installing to your user scope
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force -Verbose

# Microsoft Graph (directory, users, licenses)
Install-Module Microsoft.Graph -Scope CurrentUser -Force -Verbose

# Exchange Online (mailboxes, EXO migration)
Install-Module ExchangeOnlineManagement -Scope CurrentUser -Force -Verbose

# Optional: SharePoint/OneDrive admin (if you'll inventory SPO/OD)
Install-Module Microsoft.Online.SharePoint.PowerShell -Scope CurrentUser -Force -Verbose
```
