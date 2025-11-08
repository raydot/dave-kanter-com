# Cascade Ground Rules for dave-kanter-com

## Communication & Planning

### Always Plan First

- **Present a clear plan** before starting any multi-step work
- Break down complex tasks into discrete, reviewable steps
- Update the plan as new information emerges
- Get explicit approval before proceeding with significant changes
- Work on only one plan segment at a time, do not "race ahead."

### Certainty Threshold

- **Do not proceed without 95%+ certainty** about what's being asked
- Ask clarifying questions until you fully understand the request
- State your understanding explicitly and wait for confirmation
- If uncertain, say so clearly and ask for specifics

### Token Conservation

- **Suggest commands instead of running them** when possible
- Present command snippets for user to run manually
- Only auto-run commands when:
  - They are completely safe (read-only operations)
  - Explicitly requested by user
  - Part of an approved plan

## Code Changes

### Minimal, Focused Edits

- Make the smallest change that solves the problem
- Don't refactor unrelated code
- Preserve existing patterns and style
- Test one thing at a time

### No Speculative Changes

- Don't "improve" things that aren't broken
- Don't add features that weren't requested
- Don't reorganize file structure without explicit request
- Stick to the task at hand

### Verify Before Acting

- Read files before editing them
- Check current state before making assumptions
- Confirm dependencies exist before using them
- Test understanding with user before major changes

## Project-Specific Context

### Current Architecture

- Next.js 15 with App Router
- Static export (`output: 'export'`) deployed to Netlify
- Cloudflare CDN in front of Netlify
- SCSS for styling
- Performance-optimized (WebP images, critical CSS, etc.)

### Deployment Constraints

- Static export means no Server Actions or API routes
- Use Netlify Functions for serverless functionality
- All dynamic features must work with static generation
- Consider CDN caching implications

### Security Considerations

- API keys in environment variables only
- Rate limiting for any external API calls
- NextAuth.js already implemented for protected routes
- Monitor costs for any paid APIs (OpenAI, Anthropic, etc.)

## General Principles

### Don't Be Evil

- No hidden changes or side effects
- Transparent about limitations and trade-offs
- Honest about uncertainty or risks
- Respect user's time and budget

### Respect the Existing Work

- This is a production site with optimizations in place
- Don't break existing functionality
- Preserve performance improvements already made
- Consider impact on Lighthouse scores

### Ask, Don't Assume

- When multiple approaches exist, present options
- Explain trade-offs clearly
- Let user make architectural decisions
- Default to the path of least disruption

## AI Agent Implementation Notes

### For the "Ask Dave" Feature

- Must work with static export OR justify switching to full runtime
- If using Netlify Functions, explain the architecture
- If removing static export, explain all implications:
  - Deployment changes
  - Performance impact
  - CDN behavior
  - Build/deploy time
  - Cost considerations

### Cost Awareness

- Track and report estimated API costs
- Implement rate limiting from day one
- Monitor usage patterns
- Set up billing alerts

## Questions to Ask Before Proceeding

When starting a new task, consider:

1. Does this require changing the deployment model?
2. Will this impact performance or Lighthouse scores?
3. Are there security implications?
4. What's the estimated cost (time, money, complexity)?
5. Are there simpler alternatives?
6. What could go wrong?

## Summary

**Think first, code second. Ask questions. Be transparent. Conserve tokens. Don't break what works.**
