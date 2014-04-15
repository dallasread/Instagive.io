---
layout:     post
title:      How Secure Is Instagive.io?
date:       2014-04-15 09:00:00
tags:       Security
author:     rdr
location:   Cole Harbour, NS
img:        /assets/imgs/posts/2014/04/secure.jpg
---

Because of the countless combinations of software and hardware, securing _anything_ on the internet takes many forms. Instagive.io prides itself on keeping up to the latest security standards and we're always looking to fortify our front line. We like to think of our systems as the Fort Knox of your data.

Because the security of our clients and their data is our top priority, our security measures take many different forms. Here are the measures we can publicly announce:

<!-- more -->

#### Physical Security
We don't own a cold, dark room in which we keep piles of computers in an ambience of their own flashing lights. Our applications and databases are stored in premier data facilities. Each site is staffed 24/7/365 with onsite security and cameras and to protect against unauthorized entry. Each site has security cameras that monitor both the facility premises as well as each area of the datacenter internally. Biometric readers provide two factor authentication to gain access to any building. The facilities are unmarked, so they don't receive any unwanted attention.

#### Application Security
We investigate all reported security issues rapidly. If you believe that you've discovered a security bug in Instagive.io's system, please get in touch at dallas@instagive.io. We'll respond and address the situation quickly. Please don't publicly disclose the issue until it has been addressed.

To reward those who help us keep our users safe, we offer a reward program for responsibly disclosed vulnerabilities. We want to hear about anything that could compromise the confidentiality of our users' data. A minimum reward of $250 CAD may be provided for the disclosure of qualifying bugs.

#### Employee Access
None of our staff have any access to our backend technologies and equipment except our engineering team who are screened strictly.

#### Credit Card Security - PCI Compliance
Our payment processor, Stripe, is certified to PCI Service Provider Level 1. This is the most stringent level of certification available. All card numbers are encrypted on disk with AES-256. Decryption keys are stored on separate machines. Stripe's infrastructure for storing, decrypting, and transmitting card numbers runs in separate hosting infrastructure, and doesn't share any credentials with Stripe's primary services.

#### Communications - SSL, SSH, HTTPS
All transactional services of Instagive.io require HTTPS. We continually monitor and audit our security certificates, our certificate authorities, and the ciphers we support. We use HSTS to ensure that browsers only interact with Instagive.io over HTTPS.

#### Snapshot and Backup Security
Instagive.io backups are stored on an internal, non-publicly visible network.

#### Regularly-updated infrastructure
We continually update our software infrastructure with the latest security patches. In the case of [Heartbleed](/2014/04/heartbleed), we had patched our effected software within hours.