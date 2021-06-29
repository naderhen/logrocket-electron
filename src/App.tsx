import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';

// @ts-ignore
window.LogRocket = LogRocket;


const params = new URLSearchParams(window.location.search)
const userId = params.get("userId");
const tabName = params.get('tabName');



interface DebugInfo {
    userId: string;
    tabName: string;
    logrocketProject: string;
    recordingId?: string;
    tabId?: string;
    sessionURL?: string;
}


const debugInfo: DebugInfo = {
    userId,
    tabName,
    logrocketProject: process.env.LOGROCKET_PROJECT    
}

console.log(`User ID: ${userId}`);
console.log(`Tab Name: ${tabName}`)

console.log('👋 This message is being logged by "renderer.js", included via webpack');

LogRocket.init(process.env.LOGROCKET_PROJECT);
LogRocket.identify(userId);

LogRocket.getSessionURL(url => {
    // @ts-ignore
    debugInfo.tabId = LogRocket._logger.tabID;
    debugInfo.sessionURL = url;
    // @ts-ignore
    debugInfo.recordingId = LogRocket._logger.recordingID;
    renderApp();
})

const App: React.FC<{}> = () => {
    return <div>

        <h1>⚡ LogRocket Electron</h1>

        <p><strong>User ID: </strong>{debugInfo.userId}</p>
        <p><strong>Tab Name: </strong>{debugInfo.tabName}</p>
        <p><strong>Recording ID: </strong>{debugInfo.recordingId}</p>
        <p><strong>Tab ID: </strong>{debugInfo.tabId}</p>
        <p><strong>Session URL: </strong><a href={debugInfo.sessionURL} target="_blank">{debugInfo.sessionURL}</a></p>

    </div>
}




const renderApp = () => {
    console.log("RENDERING APP")
    ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
}

renderApp();