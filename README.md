# Online Chat Frontend

Frontend application for the Online Chat project.

## Overview

This frontend provides the user interface for:

- browsing chat rooms
- opening and closing chats
- sending and receiving messages in real time
- displaying persisted chat history
- optionally showing sentiment analysis results

## Tech Stack

- React
- TypeScript
- Vite
- SignalR JavaScript client
- Fetch / REST API integration
- CSS / UI styling used in the project

## Features

- real-time communication with the backend using SignalR
- loading chat history from the backend API
- message sending from the UI
- support for multiple chats or chat rooms
- optional sentiment-based message highlighting

## Prerequisites

Before running the frontend, make sure you have:

- Node.js installed
- npm or another package manager
- running backend API
- backend SignalR hub accessible

## Installation

Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a local environment file if needed, for example:

```env
VITE_API_BASE_URL=http://<your domain>/api
VITE_SIGNALR_URL=http://<your domain>/chat
```

For deployed environments, replace these with the Azure App Service backend URL.

Example:

```env
VITE_API_BASE_URL=https://your-backend-name.azurewebsites.net
VITE_SIGNALR_URL=https://your-backend-name.azurewebsites.net/chat
```

## Running Locally

Start the development server:

```bash
npm run dev
```
