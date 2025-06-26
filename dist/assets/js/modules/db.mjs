

function initDB() {
  // if(!localStorage.getItem('database'))
  localStorage.setItem('database', JSON.stringify({
    documents: [
      {
        title: 'Latest update on the project X-1234 we are doing for our customer XYZ Inc.',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ownerGroup: {
          id  : 'urn:qworum:group:156ac3be-5779-49d0-86bd-53df7cf953fb',
          name: 'Nexus Tech Inc.'
        },
        events: [
          {
            eventType: 'created',
            user: {
              id  : 'urn:qworum:user:e3bd5c0a-7a65-4e45-ade9-b61db1db9f49',
              name: "Kyle O'Brian",
            },
            timestamp: '2025-05-28T08:45:04.877Z',
          }
        ]
      },
      {
        title: 'Preparing for the upcoming inauguration of our hotel at Santorini',
        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ownerGroup: {
          id  : 'urn:qworum:group:0db38b52-50e7-4716-9106-eeb6d0fdcb5c',
          name: 'Hospitality Luxe Inc.'
        },
        events: [
          {
            eventType: 'created',
            user: {
              id  : 'urn:qworum:user:499f830e-55a0-49d2-bd72-7f4e1d319ee7',
              name: "Joan Kelly",
            },
            timestamp: '2025-05-28T08:45:04.877Z',
          }
        ]
      },
    ]
  }));
}

initDB();

export default localStorage;
