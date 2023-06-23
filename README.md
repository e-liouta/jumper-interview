# jumper-interview

Please take some time ahead of our interview to familiarize yourself with this repository and make sure to have the latest version up and running before our call. As part of our interview we will ask you to complete a small task in this repository, just to get a feel for how you work and problem solve _(this will require you to share your screen)_.

We understand that live coding can be very daunting and this is not meant to test ability to memorize the whole repository or all of `Java Script`. We encourage you to use any tools you like to complete the task, be it `Stack Overflow` or `Copilot`.

## Table of contents

- [Overview](#overview)
- [Setup](#setup)

## Overview

This repository is a monorepo tooled with [Turborepo](https://turbo.build) to handle builds across [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). This project consists of two parts:

### app/web

The web workspace is a simple static [SvelteKit](https://kit.svelte.dev) app.

### packages/ui-web

The ui-web workspace is a web component library built using [Lit](https://lit.dev).

### Packages

## Setup

### Requirements

All run, test and build related functions in this repository use [Node.js 18](https://nodejs.org/en/) and [npm](https://www.npmjs.com) so make sure you have the latest version of both set up on your machine.

Make sure you have the [pre-commit](https://pre-commit.com) framework installed on your machine and have it set up for this project by running the following command in the repositories root directory:

```bash
pre-commit install
```

### Dependencies

After setting up all requirements run the following command in the root directory to install the required dependencies:

```bash
npm install
```

## Develop

This repository uses [Turborepo](https://turborepo.org/docs) as a [Node.js](https://nodejs.org/en/) development framework through which you can run, test and build all of its components.

You can start a local development server for all or one of the front-end workspaces by running the following commands in the projects root directory:

```bash
npm start
npm start -- --filter=web
npm start -- --filter=ui-web
```

## Build

To build the project run the following command in the repositories root directory:

```bash
npm run build
```
