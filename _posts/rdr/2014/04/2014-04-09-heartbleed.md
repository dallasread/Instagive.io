---
layout:     post
title:      Heartbleed, a Worldwide Vulnerability
date:       2014-04-09 09:00:00
tags:       Security
author:     rdr
location:   Cole Harbour, NS
img:        /assets/imgs/posts/2014/04/heartbleed.png
---

Over the past couple days, you've probably heard about [Heartbleed](http://heartbleed.com){:target="_blank"} - a security vulnerability that has left OpenSSL exposed (about 66% of the internet).

#### The hole in the internet

[This mass test](https://github.com/musalbas/heartbleed-masstest/blob/master/top1000.txt){:target="_blank"} shows how many of the top 1,000 websites on the internet were affected. Perhaps most alarming is that half of the top 1,000 sites don't even have SSL installed!

#### Is my Instagive.io data safe?

Yes. At Instagive.io, even though we're a young company, we take your security very seriously. Our hardware did have a vulnerable version of OpenSSL installed, but no security breaches were uncovered. Within hours of hearing of the vulnerability, we had updated our equipment and keys to nullify any risk of future attacks.

<!-- more -->

#### What should you do about it?

Unfortunately, this issue has to be dealt with by server maintainers. As far as Instagive.io goes, we've done our due diligence.

In general, the surest way to protect yourself is to change your passwords immediately and regularly (for all websites).