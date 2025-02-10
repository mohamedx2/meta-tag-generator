# Auto Meta Tag Generator

## Installation

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd meta
npm install
```

2. Install required packages:
```bash
npm install openai react @types/react
```

3. Configure OpenAI API key:
- Copy `.env.example` to `.env`
- Add your OpenAI API key to `.env`:
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Project

1. Start the development server:
```bash
npm start
```

2. Visit `http://localhost:3000` in your browser

## Usage

1. Import the `useMetaTags` hook in your component:
```typescript
import { useMetaTags } from '../hooks/useMetaTags';
```

2. Use the hook in your component with the desired configuration:
```typescript
useMetaTags({
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: ['keyword1', 'keyword2'],
  ogImage: 'https://your-image-url.com',
  canonical: 'https://your-canonical-url.com',
  robots: 'index,follow'
});
```

## Features

- Automatic meta tag generation
- SEO-friendly
- Open Graph support
- Canonical URL support
- Robots meta tag support
- Automatic cleanup on component unmount

## Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| title | string | Page title |
| description | string | Meta description |
| keywords | string[] | Keywords for SEO |
| ogImage | string | Open Graph image URL |
| canonical | string | Canonical URL |
| robots | string | Robots meta tag content |
