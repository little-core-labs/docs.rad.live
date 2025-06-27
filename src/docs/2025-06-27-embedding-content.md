---
title: Embedding Content
nav-order: 3
---
# How to Embed Rad TV Videos on Your Website or Blog

Welcome! This guide will show you how to easily embed videos from our platform directly onto your own website, blog, or any other web page. All you need to do is copy and paste a small snippet of code.

## What is Embedding?

Embedding allows you to display one of our videos on your website. The video is still hosted by us, but it appears seamlessly as part of your page content, just like a YouTube video. Visitors can watch it without ever leaving your site.

## How to Get Your Embed Code

The process is simple: find the video you want to share, get its unique **Content ID**, and place it into our standard embed code.

### Step 1: Find the Content ID

Every video on our platform has a unique Content ID. You can find this ID on the video's page on our platform. It might look something like `blockbuster-movie-123` or `weekly-recap-s2e4`.

For this example, let's pretend our Content ID is `sample-video`.

### Step 2: Copy the Embed Code Snippet

Here is the standard code snippet you will use. It's designed to be responsive, meaning it will automatically resize to fit the screen, whether on a desktop computer or a mobile phone.

Copy the code below:

```
<!-- Responsive Video Player Container -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe
    src="//embed.rad.live?id=YOUR_CONTENT_ID_HERE&type=feature|episode|stream"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Video Player"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

```

### Step 3: Replace the Placeholders

Now, you just need to make two small changes to the code you copied:

1.  **Replace** `your-player-domain.com`: Change this placeholder to our official player domain, which is `[Your-Actual-Player-Domain.com]`. _(Note to Admin: Please replace this bracketed text with your real CloudFront player domain before publishing)._
    
2.  **Replace** `YOUR_CONTENT_ID_HERE`: Change this placeholder to the actual **Content ID** you found in Step 1.
    

Using our example Content ID (`sample-video`), the final `src` attribute would look like this:

`src="https://[Your-Actual-Player-Domain.com]/player.html?videoId=sample-video"`

### Step 4: Paste the Code into Your Website

You're all set! Take your final, edited code snippet and paste it into the HTML of your website, blog post, or page where you want the video to appear. When you publish your page, the video player will be displayed.

## Example of a Finished Embed Code

Here is what the complete, ready-to-paste code looks like after replacing the placeholders with our examples.

```
<!-- Responsive Video Player Container -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe
    src="https://[Your-Actual-Player-Domain.com]/player.html?videoId=sample-video"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Video Player"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

```

## Questions?

If you have any trouble finding a Content ID or if your embedded video isn't working, please don't hesitate to contact our support team. We're happy to help!