<!--
   Copyright 2024 Console Connect

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

<!--
    TODO: Add security e-mail address
    TODO: Add contact information for general support questions
    TODO: Formatting?
-->

# Contributing to cc-api-sandbox

## Welcome!

Thanks for looking at contributing to the Console Connect API Sandbox.  We really appreciate anything that you as a member of the open-source community have to offer, from bug reports to bug fixes, documentation improvements to feature requests.

**Please be aware that this is a draft version of this document, and you should expect it to change with time as we refine our community guidelines.**

## Our Values

As you look to contribute here, please bear in mind our values, the 5 S's, and hold us accountable to them as well.

- Supportive: Be understanding and encouraging of your teammates regardless of their identity. Give others the benefit of the doubt, solve the problem and build the relationship. Be kind, considerate, polite, and helpful.

- Sincere: Be honest with yourself, your colleagues, and your customers. Provide feedback when things are bad and when they're good, raise issues with the people who are able to help with them. Be open, respectful, and compassionate.

- Studious: Be serious and accountable for your work. Invest in understanding the problem. Communicate your intent, and execute deliberately. Commit to the result you want, and own the outcome.

- Striving: Always work to improve. Recognize when there is room for improvement, and develop the skills to better the situation. Look for the positive outcome, and work together towards it with the right attitude.

- Stateless: Be adaptable. Be open minded, and willing to try new things. Be willing to iterate, and comfortable with getting started when things are still ambiguous. Be informed and passionate, but flexible - strong opinions, weakly held.


## Reporting an Issue

There are a few types of issues you can file here:

- bug: Something doesn't work the way it should? That's probably a bug. Please include a careful, step-by-step guide to reproducing the bug, if possible. If reproducing the bug is hard to do without access to your environment, leave a note to that effect and we'll try to reach out for a private and secure conversation. If you have a security-sensitive ticket that you don't want to file publicly, please email ***insert security email address here*** instead of opening a ticket.

- enhancement: Also known as Feature Requests, Enhancement tickets are for when you have something in mind that the Console Connect API Sandbox does not do but that you would like it to. Before filling out a feature request, we recommend you check our roadmap for features already planned.  If you don’t see it on there, go ahead and fill in a request.  Depending on your project and timelines, this may also be a great opportunity to try your hand at contributing to this project.

- question: we generally recommend that you use the Questions channel for general questions.  However, if you’re working on contributing code and have a question related to a ticket you picked up or a feature you’re developing, you can open a question ticket here for guidance and support.

- feedback: Not quite a feature request or a bug, but not really a question either? Feel free to leave general feedback here. We don't guarantee we'll act on all feedback, but we'll certainly read it.


## Writing Code

If you've got a pet peeve you want fixed, or a great idea for something to improve, here's your best bet for fixing it! We recommend you file a ticket according to reporting an issue above so there's a record of exactly what you're looking to fix, but once that's done we follow a fairly standard fork -> merge request model for community contributions.

## Where to find bugs to pick up (“good first ticket” label, or similar)

If you just want to get your feet wet, check out our good-first-ticket label - these are issues that we think make a good entrypoint into the project.

## The process

Once you're ready to start, here are the steps to follow:

1. Fork the repo into your own namespace.

2. Make a branch for your work. We recommend using the Github "Open Pull Request" button 

3. Fill out the pull request template according to the steps in it - we're not ultra strict here, but it helps make our review process smoother.

4. Once you're ready for review, remove the 


### What to expect from our code reviews

We try to review in accordance with our values. In this context, that should mean that we are polite and respectful, but strict about the details. Our CI pipeline should catch most style issues, so we're not gonna nitpick on those, but expect us to keep an eye on correctness and test coverage, and probably to mention a couple personal taste things that don't necessarily warrant action. If we leave a comment and immediately resolve it, that comment is personal taste, or a soft suggestion, or otherwise not blocking for merge. Comments that are not resolved are blocked from merging - only an MR with no open comments can be merged. If we call something out to be fixed, please leave a reply on that comment ("Fixed" is fine for simple stuff, for more complex stuff please explain what you did to address the comment) and let the person who left the comment resolve it.

## Expectations for testing

Testing deserves a special callout. In general, we don't want merge requests to decrease coverage, and we do want all added or changed features to be tested. The ideal is that we be able to compare tests before and after - for a bug fix, this means "there is a test before your change that fails because of the bug, and that test passes after your fix". For new functionality, this mostly means "none of our existing tests are broken by the new feature, which is itself tested."  This can mean that when adding in a new feature, you will likely also need to create a test or set of tests associated with that new functionality/feature.

## What if I just have a question?

Great! We'll do our best to answer, you can reach us by ***input link or email address or other method for open source community to use for asking questions***.

## Thanks!

Thanks for reading the guidelines, and thanks for looking at contributing to the Console Connect API Sandbox. We look forward to working with you and seeing your contribution!
