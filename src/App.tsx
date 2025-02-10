import React from 'react';
import { ExampleUsage } from './components/ExampleUsage';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Meta Tag Generator</h1>
        <p>Extract and preview meta tags from your content</p>
      </header>
      <main>
        <ExampleUsage />
      </main>
    </div>
  );
}

export default App;
