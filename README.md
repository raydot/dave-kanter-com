# DaveKanter.com

This is a portfolio website for [DaveKanter.com](http://www.davekanter.com).

It's built in [Gatsby](https://gatsby.js) V2 using [gatsby-starter-dimension](https://github.com/codebushi/gatsby-starter-dimension) as a template.

The front-end world changes fast! You will need to `nvm use 12` to run this repo.

## Lessons (Un)Learned Building this Site

It's not the most uncommon thing for people who work in web development to put their own development needs last. I started this portfolio site in September 2019 because I wanted to represent myself with a React / Netlify presence online. I chose to use [Gatsby](https://www.gatsbyjs.com/) because I had used it in another project and it looked promising, and picked a an [HTML5 UP](https://html5up.net/) Gatsby template that looked like it could be easily modified to come up with a decent design.

I put the site together slowly over the process of a few months, taking time to add custom photos, but got really stuck on the Portfolio section. It required me to take a deeper dive into Gatsby's `gatsby-image` than I was able to commit to at the time, and so I put up a "Portfolio Coming Soon Page" instead. Sure! I'll get right back to it!

Two-and-a-half years have passed and I'm just now getting back to it. Over the last two-and-a-half years I've learned a **LOT** more React and Javascript, and Gatsby, Node, React have each jumped 2-3 major semantic versions in both scale and scope.

What this has meant is I've had to _unlearn_ a ton of best practices to go back to a point where I can develop with this out-of-date environment.

## Punch List (left to do)

- More stylized treatment of Portfolio
- Last `<hr>` in Portfolio needs to be removed through CSS psuedo-selector (or something)
- Haven't checked the bundle size or done any kind of optimization other than what ships with Gatsby 2
- Unit tests
- Check A11y
- Contact form not working
- Display "Lead" info in Portfolio

--

\*\* Random Notes:

[Querying multiple images with Gatsby Image](https://stackoverflow.com/questions/56437205/how-do-i-query-multiple-images-with-gatsby-image)

Usage:

`<Image fileName="yourImage.jpg" style={{ width: '100%' }} alt="" />`
