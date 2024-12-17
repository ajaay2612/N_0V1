import './createPost.js';
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'N_0V1',
  height: 'tall',
  render: (context) => {

    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'Unknown';
    });
    const [userId] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.id ?? 'Unknown';
    });


    // Create a reactive state for web view visibility
    const [webviewVisible, setWebviewVisible] = useState(true);

    const onMessage = async (msg) => {
      switch (msg.type) {
        case 'initialData':
          const gameDataIni = await context.redis.get(`gameData_${userId}`);
          const parsedGameData = gameDataIni ? JSON.parse(gameDataIni) : null;

          context.ui.webView.postMessage('myWebView', {
            type: 'initialData',
            data: {
              gameData: parsedGameData,
              username: username,
            },
          });

          break;

        case 'saveGameData':

          const gameData = msg.data.gameData;
          await context.redis.set(`gameData_${userId}`, JSON.stringify(gameData));

          break;

        default:
          throw new Error(`Unknown message type: ${msg}`);
      }
    };


    // Render the custom post type
    return (
      <vstack grow padding="small">
        <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '0%'}>
          <vstack  height={webviewVisible ? '100%' : '0%'}>
            <webview
              id="myWebView"
              url="index.html"
              onMessage={(msg) => onMessage(msg)}
              grow
              height={webviewVisible ? '100%' : '0%'}
            />
          </vstack>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
