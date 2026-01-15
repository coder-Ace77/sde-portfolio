# Typescript Testing With Jest

---

```bash
npm install jest @types/jest ts-jest

```

Then make jest.config.js

```javascript
module.exports = {
    present: 'ts-jest',
    testMatch: ['**/*.test.ts'],
};

```

Then we define the testing

Small exmaple

```typescript

describe('name',()=>{
    test('name',()=>{
        const actual = toCentimeter(6,3);
        expect(actual).toEqual(expected);
    })
})

```

Some differnece while testing may occur while mocking

```typescript
const mockFn = vi.fn<() => void>();

// vi as replacement of jest and so on
const mockFetch = vi.fn<() => Promise<Response>>();

```

We also have types for what kind of element we are expecting

```typescript
const button: HTMLButtonElement = screen.getByRole('button');
expect(button).toBeDisabled();

```

example of mocking and spying

```ts

const mockTodo = {
    userId: 1,
    id: 5,
    title: "Test title",
    completed: true,
};

describe('Home screen tests',()=>{
    test('Render test',()=>{
        render(<Home></Home>);
        const element = screen.getByText(/title/i);
        expect(element).toBeInTheDocument();
    })

    test('Renders after button click',()=>{
        const fetchMock = vi.fn(); // mocking an inner function of module
        vi.spyOn(useHandleFetchModule,'useHandleFetch').mockReturnValue([
        mockTodo,
        fetchMock
        ]); // spying on module
        render(<Home/>);
        const button = screen.getByRole('button',{name:/click me/i}); // doing click and then fetchMock is called by
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(fetchMock).toHaveBeenCalledWith('/todos/1');
        expect(screen.getByText(/User name/i)).toBeInTheDocument();
        expect(screen.getByText(/1/)).toBeInTheDocument();
        expect(screen.getByText(/Test title/i)).toBeInTheDocument();
        expect(screen.getByText(/Yes/)).toBeInTheDocument();
    })
})

```

### Testing request calls:

In React, API testing typically involves **testing components or hooks** that make API calls (e.g., via `fetch`, `axios`, or custom hooks).
> You’re **not testing the API server** itself — you’re testing how your React app **behaves when it makes an API request**.

Instead, you **mock** them using Jest's mocking tools, such as `jest.mock()` or `jest.spyOn()`.

The lifecycle of a Jest test is structured using special hooks like `beforeAll`, `beforeEach`, `afterEach`, and `afterAll`. These hooks help manage setup and teardown tasks. For example, in `beforeEach`, you might render the component and set up a fresh mock, while `afterEach` can clean up the DOM or reset mocks to avoid cross-test contamination.

During the test itself (inside `test` or `it` blocks), you typically render the component using a utility like React Testing Library’s `render()` function, and then assert that certain UI elements appear based on mocked API responses. If the API returns data, you check that the data is rendered. If it fails, you check that an error message appears. Since these interactions are asynchronous, you often need to use `await` with `waitFor()` to ensure the UI has updated before running assertions.

example say we are testing:

```js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/users')
        .then(res => {
            setUsers(res.data);
            setError('');
        })
        .catch(() => setError('Failed to load users'))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
    <ul>
    {users.map(user => (
        <li key={user.id}>{user.name}</li>
        ))}
    </ul>
    );
};

```

How to do tests:

```js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './UserList';
import axios from 'axios';

jest.mock('axios'); // 🧠 Intercepts all axios calls for mocking

describe('UserList API behavior', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // 🔁 Clean mocks before each test
    });

    test('renders loading state initially', () => {
        axios.get.mockResolvedValue({ data: [] }); // fake response
        render(<UserList />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument(); // ✅ check loading
    });

    test('renders user list after successful API call', async () => {
        const mockUsers = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        ];

        axios.get.mockResolvedValue({ data: mockUsers }); // 🧪 Mock success

        render(<UserList />);

        // 🔄 Wait for the async data to be rendered
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        });
    });

    test('shows error message when API fails', async () => {
        axios.get.mockRejectedValue(new Error('API failed')); // ❌ Mock failure

        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
        });
    });
});

```

`mockResolvedValue(value)` is a Jest method that **mocks a function to return a resolved Promise** with the given `value`.

It's most often used with asynchronous functions (like API calls) that return Promises — e.g., `axios.get()`, `fetch()`, or custom async functions. Also since promise is reolved we can simply await and wait for some time.

MOcking fetch: Fetch is available as global variable. So we need to mock it as

```ts
import { render, screen, waitFor } from '@testing-library/react';
import { FetchUser } from './FetchUser';

describe('FetchUser component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ name: 'Alice' }),
        })
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders fetched user', async () => {
        render(<FetchUser />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Alice/)).toBeInTheDocument();
        });
    });
});

```
