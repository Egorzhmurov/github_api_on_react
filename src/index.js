import React from 'react';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './css/styles.less';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef(null);

  async function searchUsers(event) {
    event.preventDefault();
    const searchTerm = query.trim();

    if (!searchTerm) {
      setUsers([]);
      setError('Enter a username or name to search.');
      return;
    }

    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;
    setIsLoading(true);
    setError('');
    setUsers([]);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(searchTerm)}&per_page=12`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          throw new Error('GitHub API rate limit reached. Please try again later.');
        }

        throw new Error(`GitHub API returned an error (${response.status}). Please try again later.`);
      }

      const data = await response.json();
      setUsers(data.items);

      if (data.items.length === 0) {
        setError('No users found for your search.');
      }
    } catch (searchError) {
      if (searchError.name !== 'AbortError') {
        setError(searchError.message || 'Search failed. Please check your internet connection.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  return (
    <main className="app">
      <section className="search-panel" aria-labelledby="page-title">
        <p className="eyebrow">GitHub user finder</p>
        <h1 id="page-title">Find a profile</h1>
        <p className="description">Search GitHub users by name or username.</p>

        <form className="search-form" onSubmit={searchUsers}>
          <label className="visually-hidden" htmlFor="user-search">
            Name or username
          </label>
          <input
            id="user-search"
            type="search"
            placeholder="e.g. octocat"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {isLoading && (
          <p className="status" role="status">
            Searching GitHub profiles...
          </p>
        )}

        {error && (
          <p className="status status-error" role="status">
            {error}
          </p>
        )}

        {users.length > 0 && (
          <section className="results" aria-label="Search results">
            <h2>Results <span>({users.length})</span></h2>
            <ul className="user-list">
              {users.map((user) => (
                <li className="user-card" key={user.id}>
                  <img src={user.avatar_url} alt="" className="avatar" />
                  <div className="user-info">
                    <h3>{user.login}</h3>
                    <p>{user.type}</p>
                  </div>
                  <a href={user.html_url} target="_blank" rel="noreferrer">
                    Profile <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

createRoot(rootElement).render(<App />);
