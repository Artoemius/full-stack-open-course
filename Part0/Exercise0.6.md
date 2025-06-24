```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser adds the new note to the list, rerenders the note list and then sends tne new note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status Code: 201 / created
    deactivate server

```
