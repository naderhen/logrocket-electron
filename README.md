# Quick Start

This project relies on the `LOGROCKET_PROJECT` environment variable to work. You should add it to your bash/zshrc profile or `export LOGROCKET_PROJECT="some/project"`. 




## Running the app in locally in dev mode

```
cd this/project/dir
yarn install
yarn start
```


## Building the app
```
yarn make
App will be located at `out/logrocket-electron-darwin-x64/logrocket-electron.app`
```


### Notes
Every time you start the app, it will generate a random "User ID" and supply that to each window. Each window calls `LogRocket.identify` with that ID immediately after calling `LogRocket.init(process.env.LOGROCKET_PROJECT);`



### Issues:

When running the app locally in dev mode, Logrocket correctly identifies multiple windows as belonging to a single session. ![local](/screenshots/local-same-session.png).

In this screenshot, you can see that the Recording ID is identical between both windows, and they both point to the same Session URL. As expected, each window has a separate internal Tab ID. This example session can be found at: 
https://app.logrocket.com/e1d3ts/cad-staging/s/4-6950243e-c1ac-4326-b389-c2759969f35e/0/872f4598-e23c-46b7-b3ee-cf34259202d2?t=1624975580674

This is important because it allows us to inspect a single session and follow the user as they go from window to window. Notice the green lines in the Inspector Timeline and the "Tab #" Button on the right-hand side. Clicking this Tab allows you to either lock onto a single window, or follow the user as they switch windows.

![local-inspector](/screenshots/local-same-session-inspector.png)


<br />
<br />
<br />
<br />

However, when the app is packaged up LogRocket behaves differently. In the compiled app, each window starts its own session:

![built-to-sessions](/screenshots/built-two-sessions.png)

Notice that the User ID is the same but the Recording ID is different in each window. The Session URLs respectively: 

https://app.logrocket.com/e1d3ts/cad-staging/s/4-6c9df277-9ef5-4d9a-9efd-a4e43478e593/0/0e13f7cb-30e0-4425-bb41-7bd6657b72a8?t=1624975713084

and

https://app.logrocket.com/e1d3ts/cad-staging/s/4-f23ba5fc-1766-4343-9570-81bb54e69ac2/0/de605065-aece-49e3-8fdd-5bc0a4ab786e?t=1624975713101

Because of this, LogRocket registers these as separate sessions and they are no longer tied together in the Session List of Inspector UI:

![built-to-sessions-list](/screenshots/built-two-sessions-list.png)