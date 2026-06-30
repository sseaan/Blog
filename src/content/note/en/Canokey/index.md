---
title: Getting Started with Canokey Canary
timestamp: 2026-6-30 20:00:00+00:00
series: "Tinkering"
tags: [Security, Canokey]
description: A hands-on guide to the Canokey Canary, a Chinese-made hardware security key
---

## Preface

The Canokey Canary is a Chinese-made hardware security key that supports FIDO2, OpenPGP, PIV, OTP, and NDEF.

I bought this key a few months ago, but with the college entrance exam (Gaokao) looming, I had no time to write up this experience (and I only just got OpenPGP Git signing working).

## Purchase

Simply buy it from the official Taobao store, *Canokeys*. The price is roughly under ¥200 (firmware version 3.0.3 stable).

[purchase page](purchase.png)

## Initialization

First, initialize the key and change the default PINs. Here's a reference table of what you need to change:

| PIN Name          | Default  | Description                                                                                                                  |
| :---------------- | :------: | :--------------------------------------------------------------------------------------------------------------------------- |
| Admin PIN         |  123456  | Used for managing different apps on the CanoKey, such as resetting applets or modifying NDEF configuration.                   |
| FIDO2 PIN         | No default | Some FIDO2 applications that enforce PIN usage will prompt for this. There is no preset FIDO2 PIN — you'll be prompted to set it the first time you use a FIDO2 app that requires one. |
| OpenPGP PIN       |  123456  | Used for routine OpenPGP operations, such as OpenPGP signing.                                                                 |
| OpenPGP Admin PIN | 12345678 | Used for administrative operations in the OpenPGP applet, e.g. generating OpenPGP key pairs on the CanoKey or modifying key attributes. |
| PIV PIN           |  123456  | Used for routine PIV operations, such as PIV authentication or signing via PKCS#11.                                           |
| PIV PUK           | 12345678 | Used to unlock the PIV PIN after it has been blocked.                                                                         |

On desktop (Windows, Mac, Linux), use the [Web Console](https://console.canokeys.org) for setup — primarily to change the Admin PIN.

On Android, use [Canokey Console](https://play.google.com/store/apps/details?id=org.canokeys.console). Plug in the key and open the app — you'll get an interface nearly identical to the web console (so you can also use it as an OTP viewer).

On iOS, due to Apple's API restrictions, you can only connect and debug via NFC (I don't own an iPhone so I'm not sure about the exact UI).

## WebAuthn (PassKey)

The Canokey Canary supports the FIDO2/WebAuthn protocol and can be used as a PassKey.

Check out [this site](https://2fa.directory/int/) to find websites that support hardware security keys — look under the *Hardware* column.

In my actual experience, I've stored PassKeys for the following websites, which generally fall into two categories: MFA or passwordless login.

|             | MFA                       | No Password     |
| ----------- | ------------------------- | --------------- |
| Self-Hosted |                           | Ech0, Bitwarden |
| Cloud       | Aliyun, Tencent           | Aliyun, Tencent |
| Application | Telegram, Notion, Feishu  |                 |
| Account     | Google                    | Microsoft       |
| Coding      | GitHub, Vercel            | GitHub, Vercel  |

On Windows 11, when you click "Add a passkey" on a website, a window will pop up giving you the option to save the PassKey on an iPhone/iPad/Android device, on a hardware security key, or on the computer itself (secured with a PIN). Choose the hardware security key, enter your Admin PIN, and touch the Canokey — the PassKey will then be stored on it.

Later, when logging in, select the hardware security key option, enter your Admin PIN, touch the Canokey, and you're in.

## OpenPGP

The Canokey Canary works as a GnuPG smart card and can store authentication, signing, and encryption keys. This enables things like signing Git commits and encrypting emails. I've only used the Git signing feature so far — haven't tried the rest yet.

First, on Windows, installing [Gpg4win](https://gpg4win.org/get-gpg4win.html) is the easiest way to get GnuPG up and running. It's a full GnuPG toolchain for Windows that includes Kleopatra, a graphical management interface. When downloading, simply choose $0 to proceed.

After installation, open Kleopatra. Click "Smart Cards" in the menu bar to see your Canokey Canary. From there, you can set both the PIN and Admin PIN.

For the following steps, however, I recommend using PowerShell and running commands directly from the terminal.

### Generating the Primary Key

```powershell
gpg --expert --full-gen-key
```

At this step, you'll see a dozen or so options corresponding to different cryptographic algorithms. I recommend using ECC.

```powershell
(11) ECC (set your own capabilities)
Your selection? 11
```

Next, you'll be asked to choose the capabilities for the primary key. Select only the Certify capability here — everything else should be handled by subkeys.

```powershell
(S) Toggle the sign capability
Your selection? s
```

You'll then be prompted again. Enter `q` to save and move on. When asked to choose an elliptic curve, pick Curve 25519.

```powershell
(1) Curve 25519 *default*
Your selection? 1
```

Next is the expiration period. To be safe, I recommend 10 years or less — you don't want a lost key to remain valid indefinitely.

```powershell
Key is valid for? (0) 10y
Key does not expire at all
Is this correct? (y/N) y
```

Now enter your personal details. Since we're using this for Git signing, it's best to use the email address tied to your GitHub account. (Leave Comment blank and just hit Enter.)

```powershell
Real name: Sean
Email address: sseaan@example.com
Comment:
You selected this USER-ID:
 "Sean <sseaan@example.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
```

A dialog will then pop up asking for a passphrase — make absolutely sure you keep it safe!!!

### Generating Subkeys

Run `gpg --fingerprint --keyid-format long -K`. It should show a single primary key with only the Certify capability. The fingerprint is `787E848E1A98D086`.

```
[keyboxd]
------------------------------------------------
sec ed25519/787E848E1A98D086 2022-01-01 [C]
 Key fingerprint = 6869 7537 A54B 1F0B FC05 E1D9 787E 848E 1A98 D086
uid [ultimate] Sean <sseaan@example.com>
```

Use the following three commands to generate three subkeys (E, A, S), using the primary key's fingerprint:

```powershell
gpg --quick-add-key <fingerprint> cv25519 encr
gpg --quick-add-key <fingerprint> ed25519 auth
gpg --quick-add-key <fingerprint> ed25519 sign
```

Run `gpg --fingerprint --keyid-format long -K` again:

```powershell
[keyboxd]
------------------------------------------------
sec ed25519/787E848E1A98D086 2022-01-01 [C]
 Key fingerprint = 6869 7537 A54B 1F0B FC05 E1D9 787E 848E 1A98 D086
uid [ultimate] Sean <sseaan@example.com>
ssb ed25519/055917609C9C0D7B 2022-01-01 [S] [expires: 2024-01-01]
 Key fingerprint = E99F 3D15 7ACF 7E24 3DC8 FFE7 0559 1760 9C9C 0D7B
ssb ed25519/05F4A6C335157258 2022-01-01 [A] [expires: 2024-01-01]
 Key fingerprint = C4B9 7EEC 4060 F856 7A4D 2956 05F4 A6C3 3515 7258
ssb cv25519/C5B8214C3AD21C6C 2022-01-01 [E] [expires: 2024-01-01]
 Key fingerprint = E39E E067 3233 BD73 7ED1 15F1 C5B8 214C 3AD2 1C6C
```

We've now generated three subkeys (`ssb`) with three distinct capabilities: Encryption (E), Authentication (A), and Signing (S), corresponding to the three slots in the OpenPGP Applet. Due to how ECC is implemented, the encryption key uses a different algorithm than the others.

- The **encryption key** is used for encrypting files and messages.
- The **signing key** is used to sign your own messages, proving that the message genuinely comes from **you**.
- The **authentication key** is primarily used for SSH login.

### Backup

```powershell
gpg -ao public-key.pub --export 787E848E1A98D086
```

Then export each private subkey individually. Make absolutely sure to back these up — **especially the primary key and the revocation certificate**. I recommend multi-medium, off-site backups. Also don't forget to back up the auto-generated revocation certificate: `%APPDATA%\gnupg\openpgp-revocs.d\68697537A54B1F0BFC05E1D9787E848E1A98D086.rev`.

Note the `!` after the key ID — it means *only export this specific private key*. Without it, all private keys will be exported by default. Pay close attention to which subkey corresponds to which name and don't mess up the order.

```powershell
gpg -ao sign-key.asc --export-secret-key 055917609C9C0D7B!
gpg -ao auth-key.asc --export-secret-key 05F4A6C335157258!
gpg -ao encr-key.asc --export-secret-key C5B8214C3AD21C6C!
```

A recommended backup strategy:

> - Keep only one copy of the primary key, ideally stored on a fully-encrypted USB drive kept in an absolutely safe place.
> - Subkeys can be copied multiple times and imported into various devices via USB drive — one key per purpose. For daily use, a smart card (e.g. YubiKey) is recommended, which also saves you from typing the passphrase every time.
> - Store one copy of the revocation certificate alongside the primary key, and keep another separate copy (so that even if you lose the key, you can at least revoke it).

### Importing to Canokey

Now, import each subkey into its corresponding slot. Note: this step is **irreversible**. Once a private key is imported into the smart card and saved, the **local copy of the private key will be deleted** and cannot be recovered. Make sure you have a proper, complete backup before proceeding.

If you own multiple Canokeys and want to import the subkeys into all of them, make sure **not to save** on the last step — just force quit, swap in another Canokey or smart card, and repeat the process.

```
gpg --edit-key 787E848E1A98D086
gpg (GnuPG) 2.3.4; Copyright (C) 2021 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec ed25519/787E848E1A98D086
 created: 2022-01-01 expires: never usage: C
 trust: ultimate validity: ultimate
ssb ed25519/055917609C9C0D7B
 created: 2022-01-01 expires: 2024-01-01 usage: S
ssb ed25519/05F4A6C335157258
 created: 2022-01-01 expires: 2024-01-01 usage: A
ssb cv25519/C5B8214C3AD21C6C
 created: 2022-01-01 expires: 2024-01-01 usage: E
[ultimate] (1). Sean <sseaan@example.com>

gpg> key 1 # First, select the first subkey

gpg> keytocard
Please select where to store the key:
(1) Signature key
(3) Authentication key
Your selection? 1 # Choose the corresponding slot

# First enter the OpenPGP passphrase, then the OpenPGP Applet Admin PIN
# Then deselect key 1, and repeat for key 2 and key 3

gpg> key 1
gpg> key 2
gpg> keytocard
Please select where to store the key:
(3) Authentication key
Your selection? 3
gpg> key 2
gpg> key 3
gpg> keytocard
Please select where to store the key:
(2) Encryption key
Your selection? 2

gpg> save # Save changes
```

At this point, check the Canokey status again to confirm the import was successful:

```
gpg --card-status
```

You'll see that the subkey identifiers now display `ssb>`, indicating that only a pointer to the smart card (`card-no: F1D0 xxxxxxxx`) remains locally — the actual private key is gone. You can now delete the primary key as well. **Double-check that you have securely backed up the primary key first.**

```
gpg --delete-secret-keys 787E848E1A98D086
```

For extra safety, you can even delete the entire GnuPG working directory: `%APPDATA%\gnupg` on Windows or `~/.gnupg` on Linux/macOS.

### Using Canokey

Now switch back to your everyday environment. First, import the public key:

```
gpg --import public-key.pub
```

Then point the subkeys to the Canokey:

```
gpg --edit-card
gpg/card> fetch
```

Now list the local private keys. You should see they all point to the Canokey:

```
gpg --fingerprint --keyid-format long -K
[keyboxd]
------------------------------------------------
sec# ed25519/787E848E1A98D086 2022-01-01 [C]
 Key fingerprint = 6869 7537 A54B 1F0B FC05 E1D9 787E 848E 1A98 D086
uid [ultimate] Sean <sseaan@example.com>
ssb> ed25519/055917609C9C0D7B 2022-01-01 [S] [expires: 2024-01-01]
 Key fingerprint = E99F 3D15 7ACF 7E24 3DC8 FFE7 0559 1760 9C9C 0D7B
 Card serial no. = F1D0 xxxxxxxx
ssb> ed25519/05F4A6C335157258 2022-01-01 [A] [expires: 2024-01-01]
 Key fingerprint = C4B9 7EEC 4060 F856 7A4D 2956 05F4 A6C3 3515 7258
 Card serial no. = F1D0 xxxxxxxx
ssb> cv25519/C5B8214C3AD21C6C 2022-01-01 [E] [expires: 2024-01-01]
 Key fingerprint = E39E E067 3233 BD73 7ED1 15F1 C5B8 214C 3AD2 1C6C
 Card serial no. = F1D0 xxxxxxxx
```

### Git Commit Signing

First, make sure your local Git configuration and the email address on GitHub are included in the UID. Then configure Git to use the signing (S) subkey.

```
git config --global user.signingkey 055917609C9C0D7B
```

After that, add the `-S` flag when running `git commit` to sign with GPG. You can also enable automatic GPG signing in your config. I don't recommend enabling this globally, though — some scripts use `git am` and similar commands that invoke `commit`, and having it globally enabled can cause issues.

```
git config commit.gpgsign true
```

When pushing to GitHub, head over to [GitHub SSH and GPG keys](https://github.com/settings/keys) and add your public key. Once added, others can fetch your public key directly from GitHub: `https://github.com/<yourid>.gpg`.

### Setting a Public Key URL

Due to storage constraints, an OpenPGP smart card can't hold the full public key, but it can store a URL pointing to it. When used on another machine, GPG can fetch the public key from that URL and then work with the smart card seamlessly.

In the previous section, we uploaded the public key to GitHub and got a URL like `https://github.com/<yourid>.gpg`.

Run `gpg --edit-card` to enter smart card editing mode, then type `admin` to enable admin commands.

(Alternatively, you can use Kleopatra to set the public key URL directly.)

Type `url` to set the public key address. You'll be prompted for the Admin PIN.

To use the smart card on another machine, simply insert the key, run `gpg --edit-card`, and type `fetch` to retrieve the public key. GPG will automatically download and import it, then point the private key references to the smart card.

### Common Issues

#### Key Not Found

You might encounter this error when committing:

```powershell
gpg: skipped "************": No secret key
gpg: signing failed: No secret key
error: gpg failed to sign the data
fatal: failed to write commit object
```

This likely means Git can't locate the correct `gpg.exe`. You can manually specify the path with:

```git config --global gpg.program "X:\{SOMEPATH}\GnuPG\bin\gpg.exe"```

After I ran into this issue and applied the fix above, commits went through normally and showed as "Verified" after pushing.

#### Don't Generate Keys Directly on the Smart Card

OpenPGP smart cards can generate keys on-device, but keys generated this way cannot be extracted for backup. For this reason, it's strongly recommended to generate keys on your computer, back them up, and only then transfer them to the smart card.

Transferring a key to the smart card will delete the locally stored copy. Keys on the smart card cannot be extracted — make sure you've backed up before proceeding.

Also, ensure the smart card supports the algorithm used by the key you intend to transfer.

## OTP

I don't recommend using the Canokey for storing OTP. It's cumbersome to add entries and even more of a hassle to view them. A self-hosted solution like Vaultwarden is far more convenient.

In the web console, you can add entries by tapping the "+" button via screenshot, QR code scan, or manual entry. It doesn't support Steam and only works with TOTP/HOTP.

## NDEF (NFC Tag)

- **Mode**: Read/write by default (can be changed in the console)
- **Content**: Defaults to a URL — `https://canokeys.org`
- **Max length**: 1022 bytes

You can use any NFC tag editing software (e.g. NFC Tools) to modify its contents.

Note: NDEF data is stored in plaintext, without any encryption. Don't store sensitive information here.

## Afterword

I haven't yet tried other use cases — like signing emails with OpenPGP keys or SSH authentication — mainly because I don't really need them right now.

That said, the methods covered above already address the most common use cases for a hardware security key. I hope this getting-started guide is helpful to anyone reading it.
