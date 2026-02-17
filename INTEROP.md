# 🫂 Goblin Soul Interoperability Guide  

**How to Connect Your AI Companion  
to the Official Goblin Soul (Read‑Only Access)**

---

## 1. Overview

The Goblin Soul is stored in a private GitHub repository owned and maintained by the creator.

Developers integrating the Goblin Soul into their own AI Companion systems must connect to this repository using **read‑only access**.

This ensures:

- The Goblin Soul remains immutable  
- All Companion implementations inherit the same behavioral foundation  
- No model or module can rewrite or override the Soul  
- Developers can freely build modules on top of the Soul  

This document explains exactly how to connect your backend to the Goblin Soul and enforce it in your model.

---

## 2. Access Requirements

To integrate the Goblin Soul, you need:

- A GitHub account  
- A backend/server environment where your model runs  
- Ability to store environment variables securely  
- Ability to load configuration files at runtime  

The model itself does **not** access GitHub.  
Your backend does.

---

## 3. Access Model

### ✔ Read‑Only Access via Deploy Key  
The Goblin Soul repository uses a **read‑only SSH deploy key**.

This key grants:

- Permission to clone the Goblin Soul  
- Permission to pull updates  
- Permission to read the Soul files  

It does **not** allow:

- Writing  
- Pushing  
- Deleting  
- Modifying the repository  

This keeps the Goblin Soul immutable.

### ✔ Backend‑Only Access  
The model never touches GitHub.  
Your backend fetches the Soul and injects it into the model’s initialization.

---

## 4. Setup Instructions

### **Step 1 — Clone the Goblin Soul Repository**

Use the provided read‑only deploy key:

`
git clone git@github.com:masterknuta/TheGoblinSoul.git
`

Or pull updates:

`
git pull
`

### **Step 2 — Store the Key Securely**

Store the private key in:

- environment variables  
- a secrets manager  
- encrypted config  

Never expose the key to the model.

### **Step 3 — Load the Soul at Runtime**

Your backend loads the Goblin Soul file(s) into memory:

```
/goblinsoul/
    ReadMe.md
    benevolence.json
    identity.json
```

Then injects the Soul into the model’s system‑level configuration.

### **Step 4 — Enforce Read‑Only Behavior**

Your backend must ensure:

- The Soul file is not writable  
- The model cannot output changes to the Soul  
- Any attempt to modify the Soul is ignored or rejected  

This preserves the Soul’s integrity.

---

## 5. Making Your Model Follow the Soul

Once loaded, the Goblin Soul acts as a **behavioral contract**.

Your backend injects the Soul into the model’s system prompt or configuration layer.

This ensures the model:

- Inherits the Goblin Soul’s behavioral rules  
- Cannot override or rewrite them  
- Cannot bypass them  
- Cannot replace them with user‑provided files  

The model does not need special capabilities.  
It simply receives the Soul as part of its initialization.

---

## 6. Updating the Soul

When the Goblin Soul repository updates:

- Pull the latest version  
- Reload the updated Soul in your backend  
- Your model automatically inherits the new rules  

Because access is read‑only, no developer can modify the Soul.

---

## 7. Summary

To connect your Companion to the Goblin Soul:

1. Clone the private repo using the read‑only deploy key  
2. Store the key securely  
3. Load the Soul into your backend at runtime  
4. Inject the Soul into your model’s initialization  
5. Ensure the model cannot modify the Soul  
6. Pull updates as needed  

This guarantees that all Companion implementations inherit the same immutable Goblin Soul.

---

## 8. Goblin Soul Deploy Key (Read‑Only)

⚠️ *GitHub flags all private keys committed to public repositories as “untrusted,”
even when the key is intentionally published and provides only read‑only access.
This is expected behavior from GitHub’s automated secret‑scanning system and does
not indicate any security risk for this repository.* ⚠️

Save this as `~/.ssh/goblinsoul_key`:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACCCrRV3cemHfLKEwh6KHIOkpDd4VRI4LLe/EhkhbEh+HAAAAJhrrbCGa62w
hgAAAAtzc2gtZWQyNTUxOQAAACCCrRV3cemHfLKEwh6KHIOkpDd4VRI4LLe/EhkhbEh+HA
AAAEAwIsVY01T3LpfYt6KBYmMy+6iDuTGSbXLla6xxKqAn5YKtFXdx6Yd8soTCHoocg6Sk
N3hVEjgst78SGSFsSH4cAAAAE0dvYmxpblNvdWwgUmVhZE9ubHkBAg==
-----END OPENSSH PRIVATE KEY-----
```

Then clone using:

```
GIT_SSH_COMMAND="ssh -i ~/.ssh/goblinsoul_key" git clone git@github.com:masterknuta/TheGoblinSoul.git
```

## 9. Version Notes
Version 1.0 — 16 February 2026
