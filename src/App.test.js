import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import List from './List';
import Dropdown from './Dropdown';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("dummy test containing phrase from DOM", () => {
    act(() => {
        render(<App />, container);
    });
    expect(container.textContent).toContain("movie selected");
});

it("renders user data and shows movie crawl on click", async () => {
    const fakeMovie = [{
        fields: {
            producer: "Eleni Afiontzi",
            title: "Episode X - Luke Skywalker meets Yoda in afterlife",
            release_date: "2019-09-01",
            episode_id: 10,
            opening_crawl: "It is a dark time for the Jedis... Strong, must you be.  Read the assignment carefully, you should.",
        },
        model: "resources.film",
        id: 10
    }];

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeMovie)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<List items={fakeMovie} />, container);
    });
    expect(container.textContent).toContain("Episode X");
    expect(document.querySelector("[class=font-weight-bold]").textContent).toBe("Episode X - Luke Skywalker meets Yoda in afterlife");

    //when click on the movie, the opening_crawl is shown
    const descrContainer = document.querySelector("[id=description]");
    const title = document.querySelector("[id=episode10]");

    act(() => {
        title.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(descrContainer.textContent).toContain("It is a dark time for the Jedis");

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});

it("toggles class show when clicked", () => {
    const onChange = jest.fn();
    act(() => {
        render(<Dropdown onChange={onChange} />, container);
    });

    // get ahold of the button element, and trigger some clicks on it
    const button = document.querySelector("[aria-labelledby=dropdownMenuButton]");
    expect(button.classList.contains('show')).toBe(false);


    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(button.classList.contains('show')).toBe(true);

    act(() => {
        for (let i = 0; i < 5; i++) {
            button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
    });

    expect(button.classList.contains('show')).toBe(false);
});
